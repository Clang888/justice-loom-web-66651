import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
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
  PiggyBank,
  Printer,
  MessageSquare,
  Download,
  Copy,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import HKTaxCalculator from "./HKTaxCalculator";

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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showTaxCalculator, setShowTaxCalculator] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [hasFeedbackCompleted, setHasFeedbackCompleted] = useState(false);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  // Check if user has completed feedback (stored in localStorage)
  useEffect(() => {
    const feedbackCompleted = localStorage.getItem('formE_feedback_completed');
    if (feedbackCompleted === 'true') {
      setHasFeedbackCompleted(true);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(event.target as Node)) {
        setShowExportDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Part 2: Assets (Sections A-K) - Exactly as per Form E
  const [assetSections, setAssetSections] = useState<Section[]>([
    {
      id: "A",
      title: t('formECalculator.sections.A'),
      isExpanded: true,
      items: [
        { id: "matrimonialHome", label: t('formECalculator.assets.matrimonialHome'), value: 0, icon: <Home className="w-4 h-4" /> },
      ]
    },
    {
      id: "B",
      title: t('formECalculator.sections.B'),
      isExpanded: true,
      items: [
        { id: "otherProperty1", label: t('formECalculator.assets.otherProperty1'), value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "otherProperty2", label: t('formECalculator.assets.otherProperty2'), value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "otherProperty3", label: t('formECalculator.assets.otherProperty3'), value: 0, icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "C",
      title: t('formECalculator.sections.C'),
      isExpanded: true,
      items: [
        { id: "currentAccounts", label: t('formECalculator.assets.currentAccounts'), value: 0, icon: <Wallet className="w-4 h-4" /> },
        { id: "savingsAccounts", label: t('formECalculator.assets.savingsAccounts'), value: 0, icon: <PiggyBank className="w-4 h-4" /> },
        { id: "fixedDeposits", label: t('formECalculator.assets.fixedDeposits'), value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "otherAccounts", label: t('formECalculator.assets.otherAccounts'), value: 0, icon: <Wallet className="w-4 h-4" /> },
      ]
    },
    {
      id: "D",
      title: t('formECalculator.sections.D'),
      isExpanded: true,
      items: [
        { id: "companyShares1", label: t('formECalculator.assets.companyShares1'), value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "companyShares2", label: t('formECalculator.assets.companyShares2'), value: 0, icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: "E",
      title: t('formECalculator.sections.E'),
      isExpanded: true,
      items: [
        { id: "business1", label: t('formECalculator.assets.business1'), value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "business2", label: t('formECalculator.assets.business2'), value: 0, icon: <Briefcase className="w-4 h-4" /> },
      ]
    },
    {
      id: "F",
      title: t('formECalculator.sections.F'),
      isExpanded: true,
      items: [
        { id: "stocks", label: t('formECalculator.assets.stocks'), value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "bonds", label: t('formECalculator.assets.bonds'), value: 0, icon: <FileText className="w-4 h-4" /> },
        { id: "unitTrusts", label: t('formECalculator.assets.unitTrusts'), value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "otherSecurities", label: t('formECalculator.assets.otherSecurities'), value: 0, icon: <TrendingUp className="w-4 h-4" /> },
      ]
    },
    {
      id: "G",
      title: t('formECalculator.sections.G'),
      isExpanded: true,
      items: [
        { id: "lifeInsurance1", label: t('formECalculator.assets.lifeInsurance1'), value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "lifeInsurance2", label: t('formECalculator.assets.lifeInsurance2'), value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "endowment", label: t('formECalculator.assets.endowment'), value: 0, icon: <Shield className="w-4 h-4" /> },
      ]
    },
    {
      id: "H",
      title: t('formECalculator.sections.H'),
      isExpanded: true,
      items: [
        { id: "debtsOwed1", label: t('formECalculator.assets.debtsOwed1'), value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "debtsOwed2", label: t('formECalculator.assets.debtsOwed2'), value: 0, icon: <Banknote className="w-4 h-4" /> },
      ]
    },
    {
      id: "I",
      title: t('formECalculator.sections.I'),
      isExpanded: true,
      items: [
        { id: "vehicles", label: t('formECalculator.assets.vehicles'), value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "jewellery", label: t('formECalculator.assets.jewellery'), value: 0, icon: <Gem className="w-4 h-4" /> },
        { id: "boats", label: t('formECalculator.assets.boats'), value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
        { id: "otherValuables", label: t('formECalculator.assets.otherValuables'), value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "J",
      title: t('formECalculator.sections.J'),
      isExpanded: true,
      items: [
        { id: "shareOptions", label: t('formECalculator.assets.shareOptions'), value: 0, icon: <TrendingUp className="w-4 h-4" /> },
        { id: "trustInterests", label: t('formECalculator.assets.trustInterests'), value: 0, icon: <FileText className="w-4 h-4" /> },
        { id: "expectedInheritance", label: t('formECalculator.assets.expectedInheritance'), value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "otherAssets", label: t('formECalculator.assets.otherAssets'), value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "K",
      title: t('formECalculator.sections.K'),
      isExpanded: true,
      items: [
        { id: "mpf", label: t('formECalculator.assets.mpf'), value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "orso", label: t('formECalculator.assets.orso'), value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "pension", label: t('formECalculator.assets.pension'), value: 0, icon: <Briefcase className="w-4 h-4" /> },
        { id: "gratuity", label: t('formECalculator.assets.gratuity'), value: 0, icon: <Banknote className="w-4 h-4" /> },
      ]
    },
  ]);

  // Part 2: Liabilities (Section L)
  const [liabilitySections, setLiabilitySections] = useState<Section[]>([
    {
      id: "L",
      title: t('formECalculator.sections.L'),
      isExpanded: true,
      items: [
        { id: "mortgages", label: t('formECalculator.liabilities.mortgages'), value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "bankLoans", label: t('formECalculator.liabilities.bankLoans'), value: 0, icon: <CreditCard className="w-4 h-4" /> },
        { id: "creditCards", label: t('formECalculator.liabilities.creditCards'), value: 0, icon: <CreditCard className="w-4 h-4" /> },
        { id: "hirePurchase", label: t('formECalculator.liabilities.hirePurchase'), value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "taxOwed", label: t('formECalculator.liabilities.taxOwed'), value: 0, icon: <Receipt className="w-4 h-4" /> },
        { id: "otherLiabilities", label: t('formECalculator.liabilities.otherLiabilities'), value: 0, icon: <Minus className="w-4 h-4" /> },
      ]
    },
  ]);

  // Part 4: Monthly Expenses
  const [expenseSections, setExpenseSections] = useState<Section[]>([
    {
      id: "4.1",
      title: t('formECalculator.sections.4.1'),
      isExpanded: true,
      items: [
        { id: "rent", label: t('formECalculator.expenses.rent'), value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "mortgage", label: t('formECalculator.expenses.mortgage'), value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "utilities", label: t('formECalculator.expenses.utilities'), value: 0, icon: <Zap className="w-4 h-4" /> },
        { id: "managementFees", label: t('formECalculator.expenses.managementFees'), value: 0, icon: <Building className="w-4 h-4" /> },
        { id: "food", label: t('formECalculator.expenses.food'), value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "household", label: t('formECalculator.expenses.household'), value: 0, icon: <Home className="w-4 h-4" /> },
        { id: "carExpenses", label: t('formECalculator.expenses.carExpenses'), value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "insuranceGeneral", label: t('formECalculator.expenses.insuranceGeneral'), value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "domesticHelper", label: t('formECalculator.expenses.domesticHelper'), value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "otherGeneral", label: t('formECalculator.expenses.otherGeneral'), value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "4.2",
      title: t('formECalculator.sections.4.2'),
      isExpanded: true,
      items: [
        { id: "mealsOut", label: t('formECalculator.expenses.mealsOut'), value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "transport", label: t('formECalculator.expenses.transport'), value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "clothing", label: t('formECalculator.expenses.clothing'), value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "grooming", label: t('formECalculator.expenses.grooming'), value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "entertainment", label: t('formECalculator.expenses.entertainment'), value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "holiday", label: t('formECalculator.expenses.holiday'), value: 0, icon: <Plane className="w-4 h-4" /> },
        { id: "medical", label: t('formECalculator.expenses.medical'), value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "tax", label: t('formECalculator.expenses.tax'), value: 0, icon: <Receipt className="w-4 h-4" /> },
        { id: "insurancePersonal", label: t('formECalculator.expenses.insurancePersonal'), value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "interimMaintenance", label: t('formECalculator.expenses.interimMaintenance'), value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "contributionParents", label: t('formECalculator.expenses.contributionParents'), value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "dependentFamily", label: t('formECalculator.expenses.dependentFamily'), value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "otherPersonal", label: t('formECalculator.expenses.otherPersonal'), value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
      ]
    },
    {
      id: "4.3",
      title: t('formECalculator.sections.4.3'),
      isExpanded: true,
      items: [
        { id: "schoolFees", label: t('formECalculator.expenses.schoolFees'), value: 0, icon: <GraduationCap className="w-4 h-4" /> },
        { id: "extraTuition", label: t('formECalculator.expenses.extraTuition'), value: 0, icon: <GraduationCap className="w-4 h-4" /> },
        { id: "booksStationery", label: t('formECalculator.expenses.booksStationery'), value: 0, icon: <FileText className="w-4 h-4" /> },
        { id: "schoolTransport", label: t('formECalculator.expenses.schoolTransport'), value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "childMedical", label: t('formECalculator.expenses.childMedical'), value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "extraCurricular", label: t('formECalculator.expenses.extraCurricular'), value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "childEntertainment", label: t('formECalculator.expenses.childEntertainment'), value: 0, icon: <Heart className="w-4 h-4" /> },
        { id: "childHolidays", label: t('formECalculator.expenses.childHolidays'), value: 0, icon: <Plane className="w-4 h-4" /> },
        { id: "childClothing", label: t('formECalculator.expenses.childClothing'), value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "childInsurance", label: t('formECalculator.expenses.childInsurance'), value: 0, icon: <Shield className="w-4 h-4" /> },
        { id: "lunchPocket", label: t('formECalculator.expenses.lunchPocket'), value: 0, icon: <Banknote className="w-4 h-4" /> },
        { id: "childTransport", label: t('formECalculator.expenses.childTransport'), value: 0, icon: <Car className="w-4 h-4" /> },
        { id: "childMinding", label: t('formECalculator.expenses.childMinding'), value: 0, icon: <Users className="w-4 h-4" /> },
        { id: "uniform", label: t('formECalculator.expenses.uniform'), value: 0, icon: <ShoppingCart className="w-4 h-4" /> },
        { id: "otherChildren", label: t('formECalculator.expenses.otherChildren'), value: 0, icon: <MoreHorizontal className="w-4 h-4" /> },
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

  const handlePrint = () => {
    window.print();
  };

  const generateExportData = () => {
    const rows: string[][] = [];
    rows.push(['Form E Financial Statement Export']);
    rows.push(['Generated on', new Date().toLocaleDateString()]);
    rows.push([]);
    
    // Assets
    rows.push(['PART 2: ASSETS']);
    assetSections.forEach(section => {
      rows.push([section.title]);
      section.items.forEach(item => {
        if (item.value > 0) {
          rows.push(['', item.label, `HK$${item.value.toLocaleString()}`]);
        }
      });
    });
    rows.push(['Sub-total (A-J)', '', `HK$${subTotalAtoJ.toLocaleString()}`]);
    rows.push(['Pensions/MPF (K)', '', `HK$${pensionsTotal.toLocaleString()}`]);
    rows.push(['TOTAL ASSETS', '', `HK$${totalAssets.toLocaleString()}`]);
    rows.push([]);
    
    // Liabilities
    rows.push(['PART 2: LIABILITIES']);
    liabilitySections.forEach(section => {
      rows.push([section.title]);
      section.items.forEach(item => {
        if (item.value > 0) {
          rows.push(['', item.label, `HK$${item.value.toLocaleString()}`]);
        }
      });
    });
    rows.push(['TOTAL LIABILITIES', '', `HK$${totalLiabilities.toLocaleString()}`]);
    rows.push([]);
    
    // Net Worth
    rows.push(['NET VALUE (Assets - Liabilities)', '', `HK$${netWorth.toLocaleString()}`]);
    rows.push([]);
    
    // Expenses
    rows.push(['PART 4: MONTHLY EXPENSES']);
    expenseSections.forEach(section => {
      rows.push([section.title]);
      section.items.forEach(item => {
        if (item.value > 0) {
          rows.push(['', item.label, `HK$${item.value.toLocaleString()}`]);
        }
      });
    });
    rows.push(['Total Household Expenses', '', `HK$${householdExpenses.toLocaleString()}`]);
    rows.push(['Total Personal Expenses', '', `HK$${personalExpenses.toLocaleString()}`]);
    rows.push(['Total Children Expenses', '', `HK$${childrenExpenses.toLocaleString()}`]);
    rows.push(['TOTAL MONTHLY EXPENSES', '', `HK$${totalMonthlyExpenses.toLocaleString()}`]);
    
    return rows;
  };

  const handleExportCSV = () => {
    const rows = generateExportData();
    const csvContent = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Form-E-Export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setShowExportDropdown(false);
  };

  const handleCopyToClipboard = async () => {
    const rows = generateExportData();
    const textContent = rows.map(row => row.filter(cell => cell).join('\t')).join('\n');
    try {
      await navigator.clipboard.writeText(textContent);
      setShowExportDropdown(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
                {item.id === "taxOwed" && (
                  <button
                    onClick={() => setShowTaxCalculator(true)}
                    className="mr-2 p-1.5 bg-primary/10 hover:bg-primary/20 rounded text-primary transition-colors"
                    title={t('formECalculator.openTaxCalculator')}
                  >
                    <Calculator className="w-4 h-4" />
                  </button>
                )}
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
    <div className="print-form-e bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm h-full flex flex-col max-h-[80vh] overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            {t('formECalculator.title')}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {t('formECalculator.subtitle')}
          </p>
        </div>
        <div className="flex gap-2 print:hidden">
          <div className="relative" ref={exportDropdownRef}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                if (!hasFeedbackCompleted) {
                  toast.info(t('formECalculator.feedbackRequired'), {
                    action: {
                      label: t('formECalculator.giveFeedback'),
                      onClick: () => navigate("/form-e-feedback")
                    }
                  });
                  return;
                }
                setShowExportDropdown(!showExportDropdown);
              }}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {t('formECalculator.export')}
              <ChevronDown className="w-3 h-3" />
            </Button>
            {showExportDropdown && hasFeedbackCompleted && (
              <div className="absolute right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 transition-colors rounded-t-lg"
                >
                  <Download className="w-4 h-4" />
                  {t('formECalculator.exportCSV')}
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary/50 transition-colors rounded-b-lg"
                >
                  <Copy className="w-4 h-4" />
                  {t('formECalculator.copyClipboard')}
                </button>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (!hasFeedbackCompleted) {
                toast.info(t('formECalculator.feedbackRequired'), {
                  action: {
                    label: t('formECalculator.giveFeedback'),
                    onClick: () => navigate("/form-e-feedback")
                  }
                });
                return;
              }
              handlePrint();
            }}
            className="flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            {t('formECalculator.print')}
          </Button>
          <Button 
            variant={hasFeedbackCompleted ? "default" : "outline"}
            size="sm" 
            onClick={() => navigate("/form-e-feedback")}
            className="flex items-center gap-2 relative"
          >
            {hasFeedbackCompleted ? (
              <Check className="w-4 h-4" />
            ) : (
              <MessageSquare className="w-4 h-4" />
            )}
            {hasFeedbackCompleted ? t('formECalculator.feedbackSubmitted') : t('formECalculator.feedback')}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetCalculator}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t('formECalculator.resetAll')}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-6 pr-1">
        {/* Part 2: Assets (Sections A-K) */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold">{t('formECalculator.part2Assets')}</h4>
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
              <span>{t('formECalculator.subTotalAJ')}</span>
              <span className="font-medium text-green-600">{formatCurrency(subTotalAtoJ)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('formECalculator.pensionsMPF')}</span>
              <span className="font-medium text-green-600">{formatCurrency(pensionsTotal)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-green-300 dark:border-green-800 pt-2">
              <span>{t('formECalculator.totalAssets')}</span>
              <span className="text-green-600 text-lg">{formatCurrency(totalAssets)}</span>
            </div>
          </div>
        </div>

        {/* Part 2: Liabilities (Section L) */}
        <div>
          <div className="flex items-center justify-between mb-3 sticky top-0 bg-card py-2 z-10">
            <div className="flex items-center gap-2">
              <Minus className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold">{t('formECalculator.part2Liabilities')}</h4>
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
            <span className="font-semibold">{t('formECalculator.netValue')}</span>
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
              <h4 className="font-semibold">{t('formECalculator.part4Expenses')}</h4>
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
              <span>{t('formECalculator.totalHouseholdExpenses')}</span>
              <span className="font-medium text-amber-600">{formatCurrency(householdExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('formECalculator.totalPersonalExpenses')}</span>
              <span className="font-medium text-amber-600">{formatCurrency(personalExpenses)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t('formECalculator.totalChildrenExpenses')}</span>
              <span className="font-medium text-amber-600">{formatCurrency(childrenExpenses)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-amber-300 dark:border-amber-800 pt-2">
              <span>{t('formECalculator.totalMonthlyExpenses')}</span>
              <span className="text-amber-600 text-lg">{formatCurrency(totalMonthlyExpenses)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 flex-shrink-0">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">{t('formECalculator.disclaimer')}</strong> {t('formECalculator.disclaimerText')}
        </p>
      </div>

      {/* HK Tax Calculator Modal */}
      {showTaxCalculator && (
        <HKTaxCalculator
          onClose={() => setShowTaxCalculator(false)}
          onApplyTax={(taxAmount) => {
            updateSectionItem(setLiabilitySections, "L", "taxOwed", taxAmount);
          }}
        />
      )}
    </div>
  );
};

export default FormECalculator;
