import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  lastUpdated?: string;
}

export default function PageHeader({
  title,
  description,
  icon,
  onRefresh,
  refreshing = false,
  lastUpdated,
}: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="container py-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {icon && (
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
              {lastUpdated && (
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-medium">Last Updated:</span> {lastUpdated}
                </p>
              )}
            </div>
          </div>
          
          {onRefresh && (
            <Button
              onClick={onRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
