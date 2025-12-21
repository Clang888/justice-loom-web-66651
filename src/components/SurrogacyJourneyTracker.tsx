import { useState } from "react";
import { 
  Heart, 
  Users, 
  FileText, 
  Stethoscope, 
  Baby, 
  Scale, 
  Home,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyStage {
  id: number;
  title: string;
  duration: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

const journeyStages: JourneyStage[] = [
  {
    id: 1,
    title: "Initial Consultation & Research",
    duration: "1-3 months",
    description: "Understanding your options and making informed decisions about your surrogacy journey.",
    details: [
      "Research surrogacy laws in your jurisdiction",
      "Consult with a fertility specialist",
      "Understand legal requirements depending on where the surrogate is located, where the child is to be born, and where the child is to be raised",
      "Consider counselling to prepare emotionally",
      "Understand the difference between gestational and traditional surrogacy",
      "Choose between agency-assisted or independent surrogacy"
    ],
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Finding & Matching with a Surrogate",
    duration: "1-6 months",
    description: "The process of finding the right surrogate who shares your values and expectations.",
    details: [
      "Work with an agency or search independently",
      "Review surrogate profiles and backgrounds",
      "Conduct initial meetings and interviews",
      "Ensure medical and psychological screenings",
      "Discuss expectations, communication, and boundaries",
      "Confirm mutual agreement to proceed"
    ],
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 3,
    title: "Legal Agreements",
    duration: "1-2 months",
    description: "Establishing comprehensive legal contracts to protect all parties involved.",
    details: [
      "Engage separate legal counsel for each party",
      "Draft surrogacy agreement covering all scenarios",
      "Address financial arrangements and expenses",
      "Define parental rights and responsibilities",
      "Include provisions for medical decisions",
      "Execute and notarise all agreements"
    ],
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Medical Procedures",
    duration: "2-4 months",
    description: "The medical process of IVF, embryo creation, and transfer.",
    details: [
      "Complete fertility assessments and tests",
      "Begin hormone treatments and egg retrieval",
      "Create embryos via IVF",
      "Prepare surrogate for embryo transfer",
      "Perform embryo transfer procedure",
      "Await pregnancy confirmation (2-week wait)"
    ],
    icon: <Stethoscope className="w-5 h-5" />
  },
  {
    id: 5,
    title: "Pregnancy Journey",
    duration: "9 months",
    description: "Supporting your surrogate through pregnancy while preparing for your baby's arrival.",
    details: [
      "Attend prenatal appointments (where possible)",
      "Maintain regular communication with surrogate",
      "Prepare nursery and baby essentials",
      "Plan for birth logistics and hospital arrangements",
      "Consider attending birth preparation classes",
      "Build relationship with surrogate's support team"
    ],
    icon: <Baby className="w-5 h-5" />
  },
  {
    id: 6,
    title: "Birth & Legal Parentage",
    duration: "1-3 months",
    description: "Welcoming your baby and completing legal formalities for parentage.",
    details: [
      "Be present for the birth (if agreed)",
      "Obtain birth certificate documentation",
      "Apply for Parental Order (UK) within 6 months",
      "Complete any required court hearings",
      "Finalise passport and citizenship matters",
      "Address any international legal requirements"
    ],
    icon: <Scale className="w-5 h-5" />
  },
  {
    id: 7,
    title: "Bringing Baby Home",
    duration: "Ongoing",
    description: "Beginning your new life as a family and maintaining positive relationships.",
    details: [
      "Settle into life with your new baby",
      "Consider ongoing relationship with surrogate",
      "Plan for future conversations about surrogacy",
      "Connect with other families via surrogacy",
      "Keep records and mementos of the journey",
      "Celebrate your family's unique story"
    ],
    icon: <Home className="w-5 h-5" />
  }
];

const SurrogacyJourneyTracker = () => {
  const [expandedStage, setExpandedStage] = useState<number | null>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const toggleStage = (id: number) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  const toggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedStages(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const progressPercentage = (completedStages.length / journeyStages.length) * 100;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Baby className="w-5 h-5 text-primary" />
            Surrogacy Journey Tracker
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Understanding your path from beginning to parenthood
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {completedStages.length} of {journeyStages.length} stages
          </div>
          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-3">
          {journeyStages.map((stage, index) => {
            const isCompleted = completedStages.includes(stage.id);
            const isExpanded = expandedStage === stage.id;
            const isLast = index === journeyStages.length - 1;

            return (
              <div key={stage.id} className="relative">
                {/* Timeline node */}
                <div 
                  className={cn(
                    "absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 cursor-pointer z-10",
                    isCompleted 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "bg-card border-border text-muted-foreground hover:border-primary"
                  )}
                  onClick={(e) => toggleComplete(stage.id, e)}
                  title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    stage.icon
                  )}
                </div>

                {/* Content card */}
                <div 
                  className={cn(
                    "ml-14 bg-secondary/50 rounded-xl transition-all duration-300 cursor-pointer",
                    isExpanded ? "ring-1 ring-primary/20" : "hover:bg-secondary"
                  )}
                  onClick={() => toggleStage(stage.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className={cn(
                            "font-medium transition-colors",
                            isCompleted && "text-primary"
                          )}>
                            {stage.title}
                          </h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {stage.duration}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {stage.description}
                        </p>
                      </div>
                      <button 
                        className="flex-shrink-0 p-1 hover:bg-background rounded-md transition-colors"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    {/* Expanded details */}
                    <div className={cn(
                      "grid transition-all duration-300 ease-out",
                      isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <ul className="space-y-2">
                          {stage.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <Circle className="w-1.5 h-1.5 mt-2 flex-shrink-0 fill-primary text-primary" />
                              <span className="text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector to next stage */}
                {!isLast && (
                  <div className={cn(
                    "absolute left-[19px] top-10 w-0.5 h-3 transition-colors duration-300",
                    isCompleted ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Timelines vary based on jurisdiction, individual circumstances, and whether you're pursuing domestic or international surrogacy. This tracker is for educational purposes. Consult with relevant professionals for personalised guidance.
        </p>
      </div>
    </div>
  );
};

export default SurrogacyJourneyTracker;
