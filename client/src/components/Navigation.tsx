import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Shield, Home } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/">
            <a className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">JCN</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">JCN Financial</div>
                <div className="text-xs text-muted-foreground">Dashboard</div>
              </div>
            </a>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>
            <Link href="/persistent-value">
              <Button variant="ghost" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Persistent Value</span>
              </Button>
            </Link>
            <Link href="/stock-analysis">
              <Button variant="ghost" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Stock Analysis</span>
              </Button>
            </Link>
            <Link href="/risk-management">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Risk Management</span>
              </Button>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
