import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Default portfolio holdings
const DEFAULT_HOLDINGS = [
  { symbol: 'SPMO', costBasis: 97.40, shares: 14301 },
  { symbol: 'ASML', costBasis: 660.32, shares: 1042 },
  { symbol: 'MNST', costBasis: 50.01, shares: 8234 },
  { symbol: 'MSCI', costBasis: 342.94, shares: 2016 },
  { symbol: 'COST', costBasis: 655.21, shares: 798 },
  { symbol: 'AVGO', costBasis: 138.00, shares: 6088 },
  { symbol: 'MA', costBasis: 418.76, shares: 1389 },
  { symbol: 'FICO', costBasis: 1850.00, shares: 778 },
  { symbol: 'SPGI', costBasis: 427.93, shares: 1554 },
  { symbol: 'IDXX', costBasis: 378.01, shares: 1570 },
  { symbol: 'ISRG', costBasis: 322.50, shares: 2769 },
  { symbol: 'V', costBasis: 276.65, shares: 2338 },
  { symbol: 'CAT', costBasis: 287.70, shares: 1356 },
  { symbol: 'ORLY', costBasis: 103.00, shares: 3566 },
  { symbol: 'HEI', costBasis: 172.00, shares: 1804 },
  { symbol: 'CPRT', costBasis: 52.00, shares: 21136 },
  { symbol: 'WM', costBasis: 177.77, shares: 3082 },
  { symbol: 'TSLA', costBasis: 270.00, shares: 5022 },
  { symbol: 'AAPL', costBasis: 181.40, shares: 2865 },
  { symbol: 'LRCX', costBasis: 73.24, shares: 18667 },
  { symbol: 'TSM', costBasis: 99.61, shares: 5850 },
];

interface Holding {
  symbol: string;
  costBasis: number;
  shares: number;
}

export default function PersistentValue() {
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(
    new Date().toLocaleTimeString()
  );

  const handleRefresh = async () => {
    setLoading(true);
    toast.info("Refreshing portfolio data...");
    
    try {
      // TODO: Fetch real-time data from Yahoo Finance API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setLastUpdated(new Date().toLocaleTimeString());
      toast.success("Portfolio data refreshed!");
    } catch (error) {
      toast.error("Failed to refresh data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Persistent Value Portfolio"
        description="Value-focused investment strategy with long-term growth potential"
        icon={<TrendingUp className="w-6 h-6 text-primary" />}
        onRefresh={handleRefresh}
        refreshing={loading}
        lastUpdated={lastUpdated}
      />

      <div className="container py-8 space-y-6">
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-muted-foreground mt-1">
                Loading...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Daily Change
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0.00</div>
              <p className="text-xs text-green-600 mt-1">
                +0.00%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                YTD Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+0.00%</div>
              <p className="text-xs text-muted-foreground mt-1">
                vs SPY: +0.00%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Holdings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{holdings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Positions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th className="text-right">Shares</th>
                    <th className="text-right">Cost Basis</th>
                    <th className="text-right">Current Price</th>
                    <th className="text-right">Market Value</th>
                    <th className="text-right">Gain/Loss</th>
                    <th className="text-right">Return %</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => {
                    const totalCost = holding.costBasis * holding.shares;
                    return (
                      <tr key={holding.symbol}>
                        <td className="font-medium">{holding.symbol}</td>
                        <td className="text-right">{holding.shares.toLocaleString()}</td>
                        <td className="text-right">${holding.costBasis.toFixed(2)}</td>
                        <td className="text-right text-muted-foreground">Loading...</td>
                        <td className="text-right">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className="text-right text-muted-foreground">-</td>
                        <td className="text-right text-muted-foreground">-</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder for Charts */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              Charts will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
