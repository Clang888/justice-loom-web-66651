import { useState } from "react";
import { 
  Calculator, 
  Home, 
  Car, 
  Briefcase, 
  CreditCard,
  TrendingUp,
  Minus,
  Plus,
  RotateCcw,
  Building,
  Wallet,
  Receipt,
  Zap,
  Phone,
  ShoppingCart,
  Heart,
  GraduationCap,
  Users,
  Plane,
  Shield,
  MoreHorizontal,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FinancialItem {
  id: string;
  label: string;
  value: number;
  icon: React.ReactNode;
}

interface Section {
  id: string;
  title: string;
  items: FinancialItem[];
  isExpanded: boolean;
}

const FormECalculator = () => {
  // Part 2: Assets (Sections A-F)
  const [assetSections, setAssetSections] = useState<Section[]>([
    {
      id: "A",
      title: "A. Real Property",
      isExpanded: true,
      items: [
        { id: "matrimonialHome", label: "Matrimonial Home", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "otherProperty1", label: "Other Property 1", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "otherProperty2", label: "Other Property 2", value: 0, icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "B",
      title: "B. Bank Accounts & Cash",
      isExpanded: true,
      items: [
        { id: "currentAccounts", label: "Current Accounts", value: 0, icon: <Wallet className="w-4 h-4" /> },
        { id: "savingsAccounts", label: "Savings Accounts", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "fixedDeposits", label: "Fixed Deposits", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "cashOnHand", label: "Cash on Hand", value: 0, icon: <Wallet className="w-4 h-4" /> },
      ]
    },
    {
      id: "C",
      title: "C. Investments & Securities",
      isExpanded: true,
      items: [
        { id: "stocks", label: "Stocks & Shares", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "bonds", label: "Bonds", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "unitTrusts", label: "Unit Trusts / Mutual Funds", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "otherInvestments", label: "Other Investments", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
      ]
    },
    {
      id: "D",
      title: "D. Insurance & Pensions",
      isExpanded: true,
      items: [
        { id: "lifeInsurance", label: "Life Insurance (Surrender Value)", value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "mpf", label: "MPF / Pension Funds", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "orso", label: "ORSO Schemes", value: 0, icon: <Briefcase className="w-4 h-4" /> },
      ]
    },
    {
      id: "E",
      title: "E. Business Interests",
      isExpanded: true,
      items: [
        { id: "businessValue", label: "Value of Business Interest", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "partnershipShare", label: "Partnership Share", value: 0, icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      id: "F",
      title: "F. Other Assets",
      isExpanded: true,
      items: [
        { id: "vehicles", label: "Motor Vehicles", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "jewellery", label: "Jewellery & Valuables", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "furniture", label: "Furniture & Household Items", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "otherAssets", label: "Other Assets", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
  ]);

  // Part 2: Liabilities (Sections G-L)
  const [liabilitySections, setLiabilitySections] = useState<Section[]>([
    {
      id: "G",
      title: "G. Mortgages",
      isExpanded: true,
      items: [
        { id: "mortgageHome", label: "Mortgage on Matrimonial Home", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "mortgageOther", label: "Mortgage on Other Properties", value: 0, icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "H",
      title: "H. Bank Loans",
      isExpanded: true,
      items: [
        { id: "personalLoans", label: "Personal Loans", value: 0, icon: <CreditCard className="w-4 h-4" /> },
        { id: "overdrafts", label: "Bank Overdrafts", value: 0, icon: <Wallet className="w-4 h-4" /> },
      ]
    },
    {
      id: "I",
      title: "I. Credit Cards & Store Cards",
      isExpanded: true,
      items: [
        { id: "creditCards", label: "Credit Card Balances", value: 0, icon: <CreditCard className="w-4 h-4" /> },
        { id: "storeCards", label: "Store Card Balances", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
      ]
    },
    {
      id: "J",
      title: "J. Hire Purchase",
      isExpanded: true,
      items: [
        { id: "carHP", label: "Car Hire Purchase", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "otherHP", label: "Other Hire Purchase", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "K",
      title: "K. Loans from Family/Friends",
      isExpanded: true,
      items: [
        { id: "familyLoans", label: "Loans from Family", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "friendsLoans", label: "Loans from Friends", value: 0, icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      id: "L",
      title: "L. Other Liabilities",
      isExpanded: true,
      items: [
        { id: "taxOwed", label: "Tax Owed", value: 0, icon: <Receipt className="w-4 h-4" /> },
        { id: "legalFees", label: "Legal Fees Outstanding", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "otherLiabilities", label: "Other Liabilities", value: 0, icon: <Minus className="w-4 h-4" /> },
      ]
    },
  ]);

  // Part 4: Monthly Expenses
  const [expenseSections, setExpenseSections] = useState<Section[]>([
    {
      id: "housing",
      title: "Housing Expenses",
      isExpanded: true,
      items: [
        { id: "rent", label: "Rent / Mortgage Payment", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "rates", label: "Rates & Management Fees", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "utilities", label: "Electricity, Gas, Water", value: 0, icon: <Zap className="w-4 h-4" /> },
        { id: "phone", label: "Telephone / Internet", value: 0, icon: <Phone className="w-4 h-4" /> },
        { id: "repairs", label: "Repairs & Maintenance", value: 0, icon: <Home className="w-4 h-4" /> },
      ]
    },
    {
      id: "living",
      title: "Living Expenses",
      isExpanded: true,
      items: [
        { id: "food", label: "Food & Groceries", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "clothing", label: "Clothing", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "transport", label: "Transport / Car Expenses", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "medical", label: "Medical / Dental", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "insurance", label: "Insurance Premiums", value: 0, icon: <Shield className="w-4 h-4" /> },
      ]
    },
    {
      id: "children",
      title: "Children's Expenses",
      isExpanded: true,
      items: [
        { id: "schoolFees", label: "School Fees", value: 0, icon: <GraduationCap className="w-4 h-4" /> },
        { id: "tuition", label: "Tuition / Extra Classes", value: 0, icon: <GraduationCap className="w-4 h-4" /> },
        { id: "childCare", label: "Childcare / Helper", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "childMedical", label: "Children's Medical", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "childActivities", label: "Extracurricular Activities", value: 0, icon: <Users className="w-4 h-4" /> },
      ]
    },
    {
      id: "other",
      title: "Other Expenses",
      isExpanded: true,
      items: [
        { id: "entertainment", label: "Entertainment / Dining", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "holidays", label: "Holidays / Travel", value: 0, icon: <Plane className="w-4 h-4" /> },
        { id: "personalCare", label: "Personal Care", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "otherExpenses", label: "Other Monthly Expenses", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
  ]);

  const updateSectionItem = (
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    sectionId: string,
    itemId: string,
    value: number
  ) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            items: section.items.map(item => 
              item.id === itemId ? { ...item, value: Math.max(0, value) } : item
            )
          }
        : section
    ));
  };

  const toggleSection = (
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    sectionId: string
  ) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section
    ));
  };

  const calculateSectionTotal = (section: Section) => 
    section.items.reduce((sum, item) => sum + item.value, 0);

  const calculateAllSectionsTotal = (sections: Section[]) =>
    sections.reduce((sum, section) => sum + calculateSectionTotal(section), 0);

  const totalAssets = calculateAllSectionsTotal(assetSections);
  const totalLiabilities = calculateAllSectionsTotal(liabilitySections);
  const totalExpenses = calculateAllSectionsTotal(expenseSections);
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
    setAssetSections(prev => prev.map(section => ({
      ...section,
      items: section.items.map(item => ({ ...item, value: 0 }))
    })));
    setLiabilitySections(prev => prev.map(section => ({
      ...section,
      items: section.items.map(item => ({ ...item, value: 0 }))
    })));
    setExpenseSections(prev => prev.map(section => ({
      ...section,
      items: section.items.map(item => ({ ...item, value: 0 }))
    })));
  };

  const renderSection = (
    section: Section,
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    colorClass: string
  ) => (
    <div key={section.id} className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(setSections, section.id)}
        className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{section.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn("text-sm font-semibold", colorClass)}>
            {formatCurrency(calculateSectionTotal(section))}
          </span>
          {section.isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
      {section.isExpanded && (
        <div className="p-3 space-y-2">
          {section.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 bg-background rounded-lg p-2">
              <div className="text-muted-foreground">{item.icon}</div>
              <span className="flex-1 text-sm">{item.label}</span>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-xs">HK$</span>
                <input
                  type="number"
                  value={item.value || ''}
                  onChange={(e) => updateSectionItem(
                    setSections,
                    section.id,
                    item.id,
                    parseFloat(e.target.value) || 0
                  )}
                  placeholder="0"
                  className="w-28 bg-secondary/50 border border-border rounded px-2 py-1.5 text-sm text-right focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm h-full flex flex-col max-h-[80vh] overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Form E Calculator
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Financial Statement for Divorce Proceedings (Hong Kong)
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetCalculator}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All
        </Button>
      </div>

      <div className="flex-1 overflow-auto space-y-6 pr-1">
        {/* Part 2: Assets (Sections A-F) */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold">Part 2: Assets (Sections A-F)</h4>
            </div>
            <span className="text-green-600 font-bold text-lg">
              {formatCurrency(totalAssets)}
            </span>
          </div>
          <div className="space-y-2">
            {assetSections.map(section => 
              renderSection(section, setAssetSections, "text-green-600")
            )}
          </div>
        </div>

        {/* Part 2: Liabilities (Sections G-L) */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold">Part 2: Liabilities (Sections G-L)</h4>
            </div>
            <span className="text-red-600 font-bold text-lg">
              {formatCurrency(totalLiabilities)}
            </span>
          </div>
          <div className="space-y-2">
            {liabilitySections.map(section => 
              renderSection(section, setLiabilitySections, "text-red-600")
            )}
          </div>
        </div>

        {/* Net Worth Summary */}
        <div className={cn(
          "p-4 rounded-xl border",
          netWorth >= 0 
            ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900" 
            : "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
        )}>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Net Assets (Assets - Liabilities)</span>
            <span className={cn(
              "text-xl font-bold",
              netWorth >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {formatCurrency(netWorth)}
            </span>
          </div>
        </div>

        {/* Part 4: Monthly Expenses */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold">Part 4: Monthly Expenses</h4>
            </div>
            <span className="text-amber-600 font-bold text-lg">
              {formatCurrency(totalExpenses)}/month
            </span>
          </div>
          <div className="space-y-2">
            {expenseSections.map(section => 
              renderSection(section, setExpenseSections, "text-amber-600")
            )}
          </div>
        </div>

        {/* Annual Expenses */}
        <div className="p-4 rounded-xl border bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total Annual Expenses</span>
            <span className="text-xl font-bold text-amber-600">
              {formatCurrency(totalExpenses * 12)}/year
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 flex-shrink-0">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This calculator provides estimates for Form E preparation. The official Form E requires complete financial disclosure with supporting documents. Seek professional legal and financial advice.
        </p>
      </div>
    </div>
  );
};

export default FormECalculator;
