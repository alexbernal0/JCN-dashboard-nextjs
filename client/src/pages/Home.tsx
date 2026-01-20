import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Professional Financial Analysis & Portfolio Management
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Advanced tools for value investing, stock analysis, and risk management. 
              Make informed investment decisions with comprehensive data and analytics.
            </p>
            <div className="flex gap-4">
              <Link href="/persistent-value">
                <Button size="lg" className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Comprehensive Investment Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to track, analyze, and optimize your investment portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Persistent Value Portfolio</CardTitle>
              <CardDescription>
                Track your value-focused investment strategy with real-time data, 
                performance metrics, and allocation analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/persistent-value">
                <Button variant="outline" className="w-full">View Portfolio</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Stock Analysis</CardTitle>
              <CardDescription>
                Deep dive into individual stocks with comprehensive financial data, 
                quality metrics, and valuation analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>
                Monitor market conditions and manage portfolio risk with BPSP indicators 
                and timing strategies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-muted/50 border-t border-border">
        <div className="container py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by MotherDuck • Yahoo Finance • GuruFocus • Norgate Data
          </p>
        </div>
      </div>
    </div>
  );
}
