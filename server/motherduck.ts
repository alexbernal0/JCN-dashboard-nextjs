/**
 * MotherDuck REST API Helper
 * 
 * This module provides functions to query MotherDuck database via HTTP API
 * instead of using native DuckDB library (which doesn't work in Vercel serverless)
 */

import { ENV } from './_core/env';

interface MotherDuckQueryResult {
  data: any[];
  schema: any[];
  rowCount: number;
}

/**
 * Execute a SQL query against MotherDuck database
 * @param query SQL query string
 * @returns Query results as array of objects
 */
export async function queryMotherDuck(query: string): Promise<any[]> {
  const token = ENV.motherDuckToken;
  
  if (!token) {
    throw new Error('MotherDuck token not configured');
  }

  try {
    // MotherDuck REST API endpoint
    const response = await fetch('https://api.motherduck.com/v1/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        database: 'my_db',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MotherDuck API error: ${response.status} - ${errorText}`);
    }

    const result: MotherDuckQueryResult = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('MotherDuck query error:', error);
    throw error;
  }
}

/**
 * Get fundamentals data for given tickers
 */
export async function getFundamentals(tickers: string[]) {
  const validTickers = tickers.filter(t => t && t.trim()).map(t => t.trim().toUpperCase());
  
  if (validTickers.length === 0) {
    return [];
  }

  const symbolsStr = validTickers.map(t => `'${t}'`).join(', ');
  
  const query = `
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
    WHERE gf.symbol IN (${symbolsStr})
  `;

  return queryMotherDuck(query);
}

/**
 * Get BPSP (Buying Power / Selling Pressure) data
 */
export async function getBPSPData() {
  const query = `
    SELECT *
    FROM my_db.main.NDR_BP_SP_history
    WHERE date >= CURRENT_DATE - INTERVAL '5 years'
    ORDER BY date ASC
  `;

  return queryMotherDuck(query);
}
