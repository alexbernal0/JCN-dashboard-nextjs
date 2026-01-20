"""
Vercel Python Serverless Function for MotherDuck Fundamentals Data
"""
import os
import json
from http.server import BaseHTTPRequestHandler
import duckdb
import pandas as pd


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests for fundamentals data"""
        try:
            # Read request body
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body.decode('utf-8'))
            
            tickers = data.get('tickers', [])
            
            if not tickers:
                self.send_error(400, "No tickers provided")
                return
            
            # Get MotherDuck token from environment
            motherduck_token = os.environ.get('MOTHERDUCK_TOKEN')
            if not motherduck_token:
                self.send_error(500, "MotherDuck token not configured")
                return
            
            # Connect to MotherDuck
            conn = duckdb.connect(f'md:?motherduck_token={motherduck_token}')
            
            # Prepare tickers for SQL query
            valid_tickers = [t.strip().upper() for t in tickers if t and t.strip()]
            symbols_str = "', '".join(valid_tickers)
            
            # Query fundamentals data with OBQ scores
            query = f"""
            WITH latest_obq AS (
                SELECT *
                FROM my_db.main.OBQ_Scores
                QUALIFY ROW_NUMBER() OVER (PARTITION BY symbol ORDER BY calculation_date DESC) = 1
            )
            SELECT 
                gf.*,
                obq.obq_growth_score,
                obq.OBQ_Quality_Rank,
                obq.obq_momentum_score,
                obq.obq_finstr_score,
                obq.obq_value_score,
                -- Compute OBQ GM
                CASE 
                    WHEN obq.obq_growth_score IS NOT NULL AND obq.obq_momentum_score IS NOT NULL
                    THEN (obq.obq_growth_score + obq.obq_momentum_score) / 2.0
                    ELSE NULL
                END as computed_obq_gm,
                -- Compute OBQ GQM
                CASE 
                    WHEN obq.obq_growth_score IS NOT NULL AND obq.OBQ_Quality_Rank IS NOT NULL AND obq.obq_momentum_score IS NOT NULL
                    THEN (obq.obq_growth_score + obq.OBQ_Quality_Rank + obq.obq_momentum_score) / 3.0
                    ELSE NULL
                END as computed_obq_gqm,
                -- Compute OBQ GQV
                CASE 
                    WHEN obq.obq_value_score IS NOT NULL AND obq.obq_growth_score IS NOT NULL AND obq.OBQ_Quality_Rank IS NOT NULL
                    THEN (obq.obq_growth_score + obq.OBQ_Quality_Rank + obq.obq_value_score) / 3.0
                    ELSE NULL
                END as computed_obq_gqv,
                -- Compute OBQ VQF
                CASE 
                    WHEN obq.obq_value_score IS NOT NULL AND obq.OBQ_Quality_Rank IS NOT NULL AND obq.obq_finstr_score IS NOT NULL
                    THEN (obq.obq_value_score + obq.OBQ_Quality_Rank + obq.obq_finstr_score) / 3.0
                    ELSE NULL
                END as computed_obq_vqf,
                -- Compute OBQ Composite
                CASE 
                    WHEN obq.obq_value_score IS NOT NULL AND obq.obq_growth_score IS NOT NULL 
                         AND obq.obq_momentum_score IS NOT NULL AND obq.OBQ_Quality_Rank IS NOT NULL 
                         AND obq.obq_finstr_score IS NOT NULL
                    THEN (obq.obq_growth_score + obq.obq_momentum_score + obq.OBQ_Quality_Rank + 
                          (0.5 * obq.obq_value_score) + (0.5 * obq.obq_finstr_score)) / 5.0
                    ELSE NULL
                END as computed_obq_composite
            FROM my_db.main.GuruFocus_Fundamentals gf
            LEFT JOIN latest_obq obq ON gf.symbol = obq.symbol
            WHERE gf.symbol IN ('{symbols_str}')
            """
            
            # Execute query and convert to DataFrame
            df = conn.execute(query).fetchdf()
            conn.close()
            
            # Convert DataFrame to JSON-serializable format
            result = df.to_dict('records')
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Internal server error: {str(e)}")
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
