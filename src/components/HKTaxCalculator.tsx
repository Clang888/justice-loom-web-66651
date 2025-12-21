import { useState } from "react";
import { Calculator, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HKTaxCalculatorProps {
  onClose: () => void;
  onApplyTax: (taxAmount: number) => void;
}

const HKTaxCalculator = ({ onClose, onApplyTax }: HKTaxCalculatorProps) => {
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [mpfDeductions, setMpfDeductions] = useState<number>(0);
  const [charitableDonations, setCharitableDonations] = useState<number>(0);
  const [maritalStatus, setMaritalStatus] = useState<"single" | "married">("single");
  const [hasChildren, setHasChildren] = useState<number>(0);
  const [showHelp, setShowHelp] = useState(false);

  // HK Tax Allowances 2023/24
  const basicAllowance = 132000;
  const marriedAllowance = 264000;
  const childAllowance = 130000; // per child

  // Progressive tax rates
  const calculateProgressiveTax = (netChargeable: number): number => {
    if (netChargeable <= 0) return 0;
    
    let tax = 0;
    let remaining = netChargeable;

    // First HK$50,000 at 2%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 50000);
      tax += taxable * 0.02;
      remaining -= taxable;
    }

    // Next HK$50,000 at 6%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 50000);
      tax += taxable * 0.06;
      remaining -= taxable;
    }

    // Next HK$50,000 at 10%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 50000);
      tax += taxable * 0.10;
      remaining -= taxable;
    }

    // Next HK$50,000 at 14%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 50000);
      tax += taxable * 0.14;
      remaining -= taxable;
    }

    // Remainder at 17%
    if (remaining > 0) {
      tax += remaining * 0.17;
    }

    return tax;
  };

  // Calculate standard rate tax (15% on net income)
  const calculateStandardRateTax = (netIncome: number): number => {
    return netIncome * 0.15;
  };

  // Calculate total allowances
  const totalAllowances = maritalStatus === "married" 
    ? marriedAllowance + (hasChildren * childAllowance)
    : basicAllowance + (hasChildren * childAllowance);

  // Calculate net income (after deductions)
  const netIncome = Math.max(0, annualIncome - mpfDeductions - charitableDonations);

  // Calculate net chargeable income (after allowances)
  const netChargeableIncome = Math.max(0, netIncome - totalAllowances);

  // Calculate both tax methods
  const progressiveTax = calculateProgressiveTax(netChargeableIncome);
  const standardRateTax = calculateStandardRateTax(netIncome);

  // Final tax is the lower of the two
  const finalTax = Math.min(progressiveTax, standardRateTax);
  const taxMethod = progressiveTax <= standardRateTax ? "Progressive" : "Standard Rate";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-HK', {
      style: 'currency',
      currency: 'HKD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApply = () => {
    onApplyTax(Math.round(finalTax));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Hong Kong Salaries Tax Calculator</h3>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Estimate your annual tax liability based on 2023/24 tax rates.
        </p>

        <div className="space-y-4">
          {/* Annual Income */}
          <div>
            <label className="text-sm font-medium">Annual Income (HK$)</label>
            <input
              type="number"
              value={annualIncome || ''}
              onChange={(e) => setAnnualIncome(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full mt-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* MPF Deductions */}
          <div>
            <label className="text-sm font-medium">MPF Contributions (HK$)</label>
            <p className="text-xs text-muted-foreground">Max deductible: HK$18,000/year</p>
            <input
              type="number"
              value={mpfDeductions || ''}
              onChange={(e) => setMpfDeductions(Math.min(18000, parseFloat(e.target.value) || 0))}
              placeholder="0"
              className="w-full mt-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Charitable Donations */}
          <div>
            <label className="text-sm font-medium">Charitable Donations (HK$)</label>
            <input
              type="number"
              value={charitableDonations || ''}
              onChange={(e) => setCharitableDonations(parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="w-full mt-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-sm font-medium">Marital Status</label>
            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setMaritalStatus("single")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-lg border text-sm transition-colors",
                  maritalStatus === "single" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-secondary/50 border-border hover:bg-secondary"
                )}
              >
                Single
              </button>
              <button
                onClick={() => setMaritalStatus("married")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-lg border text-sm transition-colors",
                  maritalStatus === "married" 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-secondary/50 border-border hover:bg-secondary"
                )}
              >
                Married
              </button>
            </div>
          </div>

          {/* Number of Children */}
          <div>
            <label className="text-sm font-medium">Number of Children</label>
            <input
              type="number"
              min="0"
              max="9"
              value={hasChildren || ''}
              onChange={(e) => setHasChildren(Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="0"
              className="w-full mt-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="mt-6 p-4 bg-secondary/30 rounded-xl space-y-2">
          <div className="flex justify-between text-sm">
            <span>Annual Income</span>
            <span>{formatCurrency(annualIncome)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Less: Deductions</span>
            <span className="text-red-500">-{formatCurrency(mpfDeductions + charitableDonations)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium border-t border-border pt-2">
            <span>Net Income</span>
            <span>{formatCurrency(netIncome)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Less: Allowances</span>
            <span className="text-red-500">-{formatCurrency(totalAllowances)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span>Net Chargeable Income</span>
            <span>{formatCurrency(netChargeableIncome)}</span>
          </div>
        </div>

        {/* Tax Result */}
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold">Estimated Annual Tax</span>
              <p className="text-xs text-muted-foreground">Using {taxMethod} rates</p>
            </div>
            <span className="text-xl font-bold text-amber-600">{formatCurrency(finalTax)}</span>
          </div>
        </div>

        {/* Help Section */}
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="mt-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <HelpCircle className="w-4 h-4" />
          {showHelp ? "Hide" : "Show"} tax rate details
        </button>

        {showHelp && (
          <div className="mt-2 p-3 bg-secondary/30 rounded-lg text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Progressive Tax Rates:</p>
            <p>First HK$50,000: 2%</p>
            <p>Next HK$50,000: 6%</p>
            <p>Next HK$50,000: 10%</p>
            <p>Next HK$50,000: 14%</p>
            <p>Remainder: 17%</p>
            <p className="mt-2 font-medium text-foreground">Or Standard Rate: 15% on net income</p>
            <p className="mt-2">You pay whichever is lower.</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleApply} className="flex-1">
            Apply to Tax Owed
          </Button>
        </div>

        <p className="mt-4 text-xs text-muted-foreground text-center">
          This is an estimate only. Consult the Inland Revenue Department or a tax professional for accurate calculations.
        </p>
      </div>
    </div>
  );
};

export default HKTaxCalculator;
