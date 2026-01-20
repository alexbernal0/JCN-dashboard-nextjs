"""
Vercel Python Serverless Function for BPSP (Buying Power/Selling Pressure) Data
"""
import os
import json
from http.server import BaseHTTPRequestHandler
import duckdb
import pandas as pd


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests for BPSP data"""
        try:
            # Get MotherDuck token from environment
            motherduck_token = os.environ.get('MOTHERDUCK_TOKEN')
            if not motherduck_token:
                self.send_error(500, "MotherDuck token not configured")
                return
            
            # Connect to MotherDuck
            conn = duckdb.connect(f'md:?motherduck_token={motherduck_token}')
            
            # Query BPSP data (last 5 years)
            query = """
            SELECT *
            FROM my_db.main.NDR_BP_SP_history
            WHERE date >= CURRENT_DATE - INTERVAL '5 years'
            ORDER BY date ASC
            """
            
            # Execute query and convert to DataFrame
            df = conn.execute(query).fetchdf()
            conn.close()
            
            # Convert DataFrame to JSON-serializable format
            # Convert date columns to ISO format strings
            if 'date' in df.columns:
                df['date'] = df['date'].astype(str)
            
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
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
