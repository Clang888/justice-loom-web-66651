import { useState } from "react";
import { 
  Calculator, 
  PoundSterling, 
  Home, 
  Car, 
  Briefcase, 
  CreditCard,
  TrendingUp,
  Minus,
  Plus,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FinancialItem {
  id: string;
  label: string;
  value: number;
  icon: React.ReactNode;
}

const FormECalculator = () => {
  const [assets, setAssets] = useState<FinancialItem[]>([
    { id: "property", label: "Property / Real Estate", value: 0, icon: <Home className="w-4 h-4" /> },
    { id: "savings", label: "Savings & Investments", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
    { id: "pensions", label: "Pensions", value: 0, icon: <Briefcase className="w-4 h-4" /> },
    { id: "vehicles", label: "Vehicles", value: 0, icon: <Car className="w-4 h-4" /> },
    { id: "other", label: "Other Assets", value: 0, icon: <PoundSterling className="w-4 h-4" /> },
  ]);

  const [liabilities, setLiabilities] = useState<FinancialItem[]>([
    { id: "mortgage", label: "Mortgage", value: 0, icon: <Home className="w-4 h-4" /> },
    { id: "loans", label: "Loans", value: 0, icon: <CreditCard className="w-4 h-4" /> },
    { id: "creditCards", label: "Credit Cards", value: 0, icon: <CreditCard className="w-4 h-4" /> },
    { id: "otherDebts", label: "Other Debts", value: 0, icon: <Minus className="w-4 h-4" /> },
  ]);

  const updateAsset = (id: string, value: number) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, value: Math.max(0, value) } : a));
  };

  const updateLiability = (id: string, value: number) => {
    setLiabilities(prev => prev.map(l => l.id === id ? { ...l, value: Math.max(0, value) } : l));
  };

  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-HK', {
      style: 'currency',
      currency: 'HKD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const resetCalculator = () => {
    setAssets(prev => prev.map(a => ({ ...a, value: 0 })));
    setLiabilities(prev => prev.map(l => ({ ...l, value: 0 })));
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Form E Calculator
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Estimate your net financial position for divorce proceedings
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetCalculator}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      <div className="flex-1 space-y-6 overflow-auto">
        {/* Assets Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Plus className="w-4 h-4 text-green-600" />
            <h4 className="font-medium text-sm">Assets</h4>
          </div>
          <div className="space-y-2">
            {assets.map((asset) => (
              <div key={asset.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                <div className="text-muted-foreground">{asset.icon}</div>
                <span className="flex-1 text-sm">{asset.label}</span>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">HK$</span>
                  <input
                    type="number"
                    value={asset.value || ''}
                    onChange={(e) => updateAsset(asset.id, parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24 bg-background border border-border rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end">
            <span className="text-sm font-medium text-green-600">
              Total: {formatCurrency(totalAssets)}
            </span>
          </div>
        </div>

        {/* Liabilities Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Minus className="w-4 h-4 text-red-600" />
            <h4 className="font-medium text-sm">Liabilities</h4>
          </div>
          <div className="space-y-2">
            {liabilities.map((liability) => (
              <div key={liability.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-3">
                <div className="text-muted-foreground">{liability.icon}</div>
                <span className="flex-1 text-sm">{liability.label}</span>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground text-sm">HK$</span>
                  <input
                    type="number"
                    value={liability.value || ''}
                    onChange={(e) => updateLiability(liability.id, parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-24 bg-background border border-border rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end">
            <span className="text-sm font-medium text-red-600">
              Total: {formatCurrency(totalLiabilities)}
            </span>
          </div>
        </div>
      </div>

      {/* Net Worth Summary */}
      <div className={cn(
        "mt-6 p-4 rounded-xl border",
        netWorth >= 0 
          ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900" 
          : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
      )}>
        <div className="flex items-center justify-between">
          <span className="font-medium">Net Financial Position</span>
          <span className={cn(
            "text-xl font-bold",
            netWorth >= 0 ? "text-green-600" : "text-red-600"
          )}>
            {formatCurrency(netWorth)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This is an estimate only. Form E requires detailed disclosure including income, expenses, and future needs.
        </p>
      </div>

      <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This calculator provides a simplified estimate. The official Form E is comprehensive and requires professional legal and financial advice.
        </p>
      </div>
    </div>
  );
};

export default FormECalculator;
