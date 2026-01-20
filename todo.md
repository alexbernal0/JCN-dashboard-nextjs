# JCN Dashboard Migration TODO

## Project Overview
Migrating JCN Financial Dashboard from Streamlit to Next.js + React + TypeScript for deployment on Vercel with MotherDuck database integration.

---

## Phase 1: Persistent Value Page Migration (CURRENT)

### Infrastructure Setup
- [x] Initialize Next.js project with TypeScript + Tailwind CSS
- [x] Set up MotherDuck database connection via Python API routes
- [x] Convert Python API routes to TypeScript for Vercel compatibility
- [x] Create MotherDuck REST API helper
- [x] Create fundamentals tRPC router
- [x] Configure environment variables (MotherDuck token validated)
- [ ] Create error logging and monitoring system
- [ ] Set up Vercel deployment configuration

### UI/UX Design
- [x] Design modern theme (inspired by TradingTerminal.com + Google Material Design)
- [x] Create responsive layout with navigation
- [x] Add JCN logo and branding
- [x] Install Plotly.js for charts
- [x] Implement loading states and error boundaries

### Persistent Value Page Features
- [ ] Portfolio holdings table with editable rows
  - Symbol, Cost Basis, Shares columns
  - Add/remove rows functionality
  - Real-time data fetching from Yahoo Finance
- [ ] Portfolio metrics display
  - Total Value, Daily Change, YTD Performance
  - Benchmark comparison (SPY)
  - Portfolio allocation charts (4 pie charts: Company, Category, Sector, Industry)
- [ ] Fundamentals scorecard (MotherDuck data)
  - Individual stock metrics
  - Portfolio aggregated metrics (Max, Median, Avg, Min)
- [ ] Performance charts
  - Historical portfolio value
  - Sector allocation over time
- [ ] News aggregation (optional - Finnhub API)
- [ ] AI-generated portfolio summary (optional - Grok API)

---

## Phase 2: Stock Analysis Page Migration (PENDING)

### Features to Migrate
- [ ] Stock search and selection
- [ ] Financial overview grid (4 charts)
- [ ] Per Share Data table
- [ ] Quality Metrics table
- [ ] Income Statement (expandable)
- [ ] Balance Sheet (expandable)
- [ ] Cash Flows (expandable)
- [ ] Growth Rates table
- [ ] Valuation Ratios (with percentiles & tooltips)
- [ ] Composite Scores Radar Chart (4-year history)

---

## Phase 3: Risk Management Page Migration (PENDING)

### Features to Migrate
- [ ] BPSP Indicator Analysis
  - S&P 500 candlestick chart
  - Buying Power vs Selling Pressure lines
  - Current signal and metrics
- [ ] BPSP Timing Strategy Backtest
  - Equity curves (strategy vs SPX)
  - Drawdown comparison
  - Market exposure visualization
  - Performance metrics
- [ ] BPSP Model User Guide (expandable sections)

---

## Phase 4: Additional Pages Migration (PENDING)

- [ ] Home/Dashboard page
- [ ] Portfolio Tracker page
- [ ] Watchlist page
- [ ] Settings page
- [ ] User profile page

---

## Technical Debt & Improvements

- [ ] Implement caching strategy for API calls
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)
- [ ] Optimize bundle size
- [ ] Add analytics tracking
- [ ] Implement dark mode toggle
- [ ] Add mobile responsiveness
- [ ] Create comprehensive documentation

---

## Deployment Checklist

- [ ] Configure Vercel project
- [ ] Set up environment variables in Vercel
- [ ] Test production build locally
- [ ] Deploy to Vercel
- [ ] Verify all features work in production
- [ ] Set up custom domain (if needed)
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring and alerts

---

## Notes

- **Data Sources**: Yahoo Finance (portfolio prices), MotherDuck (fundamentals, BPSP data)
- **API Keys Needed**: MotherDuck token, Finnhub API (optional), Grok API (optional)
- **Design Inspiration**: TradingTerminal.com, Google Material Design
- **Migration Strategy**: One page at a time, test thoroughly before moving to next
