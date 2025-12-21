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
  ShoppingCart,
  Heart,
  GraduationCap,
  Users,
  Plane,
  Shield,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Banknote,
  FileText,
  Gem,
  PiggyBank
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
  // Part 2: Assets (Sections A-K) - Exactly as per Form E
  const [assetSections, setAssetSections] = useState<Section[]>([
    {
      id: "A",
      title: "A. Matrimonial Home (2.1)",
      isExpanded: true,
      items: [
        { id: "matrimonialHome", label: "Net value of your interest in the matrimonial home", value: 0, icon: <Home className="w-4 h-4" /> },
      ]
    },
    {
      id: "B",
      title: "B. Other Landed Properties (2.2)",
      isExpanded: true,
      items: [
        { id: "otherProperty1", label: "Other Property 1 (net value)", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "otherProperty2", label: "Other Property 2 (net value)", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "otherProperty3", label: "Other Property 3 (net value)", value: 0, icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "C",
      title: "C. Bank Accounts (2.3)",
      isExpanded: true,
      items: [
        { id: "currentAccounts", label: "Current Accounts", value: 0, icon: <Wallet className="w-4 h-4" /> },
        { id: "savingsAccounts", label: "Savings Accounts", value: 0, icon: <PiggyBank className="w-4 h-4" /> },
        { id: "fixedDeposits", label: "Fixed / Term Deposits", value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "otherAccounts", label: "Other Bank Accounts", value: 0, icon: <Wallet className="w-4 h-4" /> },
      ]
    },
    {
      id: "D",
      title: "D. Private Company Shareholding (2.4)",
      isExpanded: true,
      items: [
        { id: "companyShares1", label: "Company 1 - Shareholding/Beneficial Interest", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "companyShares2", label: "Company 2 - Shareholding/Beneficial Interest", value: 0, icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "E",
      title: "E. Other Business Interests (2.6)",
      isExpanded: true,
      items: [
        { id: "business1", label: "Business 1 - Value of Interest", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "business2", label: "Business 2 - Value of Interest", value: 0, icon: <Briefcase className="w-4 h-4" /> },
      ]
    },
    {
      id: "F",
      title: "F. Stocks, Bonds & Securities (2.7)",
      isExpanded: true,
      items: [
        { id: "stocks", label: "Stocks & Shares", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "bonds", label: "Bonds", value: 0, icon: <FileText className="w-4 h-4" /> },
        { id: "unitTrusts", label: "Unit Trusts / Mutual Funds", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "otherSecurities", label: "Other Securities / Investments", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
      ]
    },
    {
      id: "G",
      title: "G. Life Insurance & Endowment Policies (2.8)",
      isExpanded: true,
      items: [
        { id: "lifeInsurance1", label: "Life Insurance Policy 1 (Surrender Value)", value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "lifeInsurance2", label: "Life Insurance Policy 2 (Surrender Value)", value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "endowment", label: "Endowment Policies (Surrender Value)", value: 0, icon: <Shield className="w-4 h-4" /> },
      ]
    },
    {
      id: "H",
      title: "H. Debts Owed to You (2.9)",
      isExpanded: true,
      items: [
        { id: "debtsOwed1", label: "Debt Owed to You 1", value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "debtsOwed2", label: "Debt Owed to You 2", value: 0, icon: <Banknote className="w-4 h-4" /> },
      ]
    },
    {
      id: "I",
      title: "I. Valuable Personal Items (2.10)",
      isExpanded: true,
      items: [
        { id: "vehicles", label: "Motor Vehicles", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "jewellery", label: "Jewellery", value: 0, icon: <Gem className="w-4 h-4" /> },
        { id: "boats", label: "Boats", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
        { id: "otherValuables", label: "Other Valuable Items", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "J",
      title: "J. Other Assets (2.11)",
      isExpanded: true,
      items: [
        { id: "shareOptions", label: "Share Option Scheme", value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "trustInterests", label: "Trust Interests", value: 0, icon: <FileText className="w-4 h-4" /> },
        { id: "expectedInheritance", label: "Expected Inheritance", value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "otherAssets", label: "Other Assets", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "K",
      title: "K. Pensions / MPF / Gratuity (2.12)",
      isExpanded: true,
      items: [
        { id: "mpf", label: "Mandatory Provident Fund (MPF)", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "orso", label: "ORSO / Superannuation Scheme", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "pension", label: "Pension Scheme", value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "gratuity", label: "Contract Gratuity", value: 0, icon: <Banknote className="w-4 h-4" /> },
      ]
    },
  ]);

  // Part 2: Liabilities (Section L)
  const [liabilitySections, setLiabilitySections] = useState<Section[]>([
    {
      id: "L",
      title: "L. All Liabilities (2.13)",
      isExpanded: true,
      items: [
        { id: "mortgages", label: "Mortgages (not already deducted from property values)", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "bankLoans", label: "Bank Loans", value: 0, icon: <CreditCard className="w-4 h-4" /> },
        { id: "creditCards", label: "Credit Card Balances", value: 0, icon: <CreditCard className="w-4 h-4" /> },
        { id: "hirePurchase", label: "Lease-to-Own / Rent-to-Own / Deferred Payment Plan", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "taxOwed", label: "Tax Owed", value: 0, icon: <Receipt className="w-4 h-4" /> },
        { id: "otherLiabilities", label: "Other Liabilities", value: 0, icon: <Minus className="w-4 h-4" /> },
      ]
    },
  ]);

  // Part 4: Monthly Expenses
  const [expenseSections, setExpenseSections] = useState<Section[]>([
    {
      id: "4.1",
      title: "4.1 General / Household Expenses",
      isExpanded: true,
      items: [
        { id: "rent", label: "Rent", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "mortgage", label: "Mortgage Instalments", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "utilities", label: "Utilities (electricity, gas, rates, telephone, water)", value: 0, icon: <Zap className="w-4 h-4" /> },
        { id: "managementFees", label: "Management Fees", value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "food", label: "Food", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "household", label: "Household Expenses", value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "carExpenses", label: "Car Expenses", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "insuranceGeneral", label: "Insurance Premia", value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "domesticHelper", label: "Domestic Helper(s)", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "otherGeneral", label: "Other", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "4.2",
      title: "4.2 Personal Expenses",
      isExpanded: true,
      items: [
        { id: "mealsOut", label: "Meals Out of Home", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "transport", label: "Transport", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "clothing", label: "Clothing / Shoes", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "grooming", label: "Personal Grooming (haircut, cosmetics)", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "entertainment", label: "Entertainment / Presents", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "holiday", label: "Holiday", value: 0, icon: <Plane className="w-4 h-4" /> },
        { id: "medical", label: "Medical / Dental", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "tax", label: "Tax", value: 0, icon: <Receipt className="w-4 h-4" /> },
        { id: "insurancePersonal", label: "Insurance Premia", value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "interimMaintenance", label: "Interim Maintenance", value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "contributionParents", label: "Contribution to Parents", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "dependentFamily", label: "Dependent Family Members", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "otherPersonal", label: "Others", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "4.3",
      title: "4.3 Children's Expenses",
      isExpanded: true,
      items: [
        { id: "schoolFees", label: "School Fees", value: 0, icon: <GraduationCap className="w-4 h-4" /> },
        { id: "extraTuition", label: "Extra Tuition Fees", value: 0, icon: <GraduationCap className="w-4 h-4" /> },
        { id: "booksStationery", label: "School Books and Stationery", value: 0, icon: <FileText className="w-4 h-4" /> },
        { id: "schoolTransport", label: "Transport to School (incl. school bus)", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "childMedical", label: "Medical / Dental", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "extraCurricular", label: "Extra Curricular Activities", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "childEntertainment", label: "Entertainment / Presents", value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "childHolidays", label: "Holidays", value: 0, icon: <Plane className="w-4 h-4" /> },
        { id: "childClothing", label: "Clothing / Shoes", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "childInsurance", label: "Insurance Premia", value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "lunchPocket", label: "Lunches and Pocket Money", value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "childTransport", label: "Other Transport", value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "childMinding", label: "Child-minding Fees", value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "uniform", label: "Uniform", value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "otherChildren", label: "Others", value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
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

  // Calculate Sub-total (A-J) without pensions
  const subTotalAtoJ = assetSections
    .filter(s => s.id !== "K")
    .reduce((sum, section) => sum + calculateSectionTotal(section), 0);
  
  // Pensions (K)
  const pensionsTotal = calculateSectionTotal(assetSections.find(s => s.id === "K")!);
  
  const totalAssets = subTotalAtoJ + pensionsTotal;
  const totalLiabilities = calculateAllSectionsTotal(liabilitySections);
  const netWorth = totalAssets - totalLiabilities;

  // Part 4 Expenses
  const householdExpenses = calculateSectionTotal(expenseSections.find(s => s.id === "4.1")!);
  const personalExpenses = calculateSectionTotal(expenseSections.find(s => s.id === "4.2")!);
  const childrenExpenses = calculateSectionTotal(expenseSections.find(s => s.id === "4.3")!);
  const totalMonthlyExpenses = householdExpenses + personalExpenses + childrenExpenses;

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
        {/* Part 2: Assets (Sections A-K) */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold">Part 2: Assets (Sections A-K)</h4>
            </div>
          </div>
          <div className="space-y-2">
            {assetSections.map(section => 
              renderSection(section, setAssetSections, "text-green-600")
            )}
          </div>
          
          {/* Assets Summary */}
          <div className="mt-4 space-y-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
            <div className="flex justify-between text-sm">
              <span>Sub-total (A-J)</span>
              <span className="font-medium text-green-600">{formatCurrency(subTotalAtoJ)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>K. Pensions/MPF</span>
              <span className="font-medium text-green-600">{formatCurrency(pensionsTotal)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-green-300 dark:border-green-800 pt-2">
              <span>TOTAL ASSETS</span>
              <span className="text-green-600 text-lg">{formatCurrency(totalAssets)}</span>
            </div>
          </div>
        </div>

        {/* Part 2: Liabilities (Section L) */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold">Part 2: Liabilities (Section L)</h4>
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
            <span className="font-semibold">NET VALUE (Assets - Liabilities)</span>
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
              <h4 className="font-semibold">Part 4: Current Monthly Expenses</h4>
            </div>
          </div>
          <div className="space-y-2">
            {expenseSections.map(section => 
              renderSection(section, setExpenseSections, "text-amber-600")
            )}
          </div>

          {/* Expenses Summary */}
          <div className="mt-4 space-y-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
            <div className="flex justify-between text-sm">
              <span>4.1 Total Monthly Household Expenses</span>
              <span className="font-medium text-amber-600">{formatCurrency(householdExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>4.2 Total Monthly Personal Expenses</span>
              <span className="font-medium text-amber-600">{formatCurrency(personalExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>4.3 Total Monthly Expenses for Children</span>
              <span className="font-medium text-amber-600">{formatCurrency(childrenExpenses)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-amber-300 dark:border-amber-800 pt-2">
              <span>TOTAL MONTHLY EXPENSES</span>
              <span className="text-amber-600 text-lg">{formatCurrency(totalMonthlyExpenses)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 flex-shrink-0">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This calculator follows the official Form E structure. The actual Form E requires complete financial disclosure with supporting documents. Seek professional legal and financial advice.
        </p>
      </div>
    </div>
  );
};

export default FormECalculator;
