import { 
  Calendar, 
  Building2, 
  Scale, 
  MessageSquare, 
  Heart, 
  Utensils,
  Clock,
  DollarSign,
  FileText,
  CheckCircle2,
  Leaf,
  Soup
} from "lucide-react";

import tcmFoodsImage from "@/assets/tcm-foods-fertility.jpg";
import wellnessTeaImage from "@/assets/fertility-wellness-tea.jpg";
import consultationImage from "@/assets/fertility-consultation.jpg";
import clinicInteriorImage from "@/assets/fertility-clinic-interior.jpg";
import recoveryRestImage from "@/assets/fertility-recovery-rest.jpg";
import planningCalendarImage from "@/assets/fertility-planning-calendar.jpg";

const FertilityPlanningGuide = () => {
  return (
    <div className="space-y-12 text-foreground">
      {/* Header */}
      <div className="text-center border-b border-border pb-8">
        <h1 className="text-3xl font-bold mb-2">Hong Kong Fertility Planning Guide</h1>
        <p className="text-muted-foreground">Your Complete Roadmap to Egg Freezing Success</p>
        <img 
          src={wellnessTeaImage} 
          alt="Peaceful moment with herbal tea" 
          className="mt-6 w-full max-w-2xl mx-auto rounded-xl object-cover h-48 md:h-64"
        />
      </div>

      {/* Section 1: Timeline */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Step-by-Step Timeline</h2>
        </div>

        <img 
          src={planningCalendarImage} 
          alt="Planning calendar for fertility journey" 
          className="w-full rounded-xl object-cover h-48 md:h-64 mb-6"
        />
        
        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-xl p-5 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Month 1-2: Research & Initial Consultation</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Research clinics and compare services</li>
              <li>• Schedule initial consultation with 2-3 clinics</li>
              <li>• Complete baseline fertility tests (AMH, AFC, FSH)</li>
              <li>• Review test results with fertility specialist</li>
            </ul>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-5 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Month 3: Preparation Phase</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Begin lifestyle optimization (diet, exercise, supplements)</li>
              <li>• Complete required pre-procedure tests</li>
              <li>• Finalize clinic selection and payment plan</li>
              <li>• Learn injection techniques (if applicable)</li>
            </ul>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-5 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Month 4: Stimulation Cycle (10-14 days)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Day 1-2: Begin hormone injections</li>
              <li>• Day 5-7: First monitoring ultrasound</li>
              <li>• Day 8-10: Continued monitoring, adjust medications</li>
              <li>• Day 12-14: Trigger shot, egg retrieval procedure</li>
            </ul>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-5 border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Post-Retrieval: Recovery & Storage</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 1-2 days rest after procedure</li>
              <li>• Receive final egg count and quality report</li>
              <li>• Set up annual storage payment schedule</li>
              <li>• Schedule follow-up if additional cycles desired</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 2: Clinic Comparison */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Public Hospital or Private Clinic?</h2>
        </div>

        <img 
          src={clinicInteriorImage} 
          alt="Modern fertility clinic waiting room in Hong Kong" 
          className="w-full rounded-xl object-cover h-48 md:h-64 mb-6"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-3 font-semibold">Factor</th>
                <th className="text-left p-3 font-semibold">Public Hospitals</th>
                <th className="text-left p-3 font-semibold">Private Clinics</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Cost Range (per cycle)</td>
                <td className="p-3 text-muted-foreground">HK$30,000-50,000</td>
                <td className="p-3 text-muted-foreground">HK$60,000-120,000</td>
              </tr>
              <tr className="border-t border-border bg-secondary/30">
                <td className="p-3 font-medium">Medication Costs</td>
                <td className="p-3 text-muted-foreground">Often included or subsidized</td>
                <td className="p-3 text-muted-foreground">HK$15,000-30,000 extra</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Wait Time for First Appointment</td>
                <td className="p-3 text-muted-foreground">3-6 months</td>
                <td className="p-3 text-muted-foreground">1-4 weeks</td>
              </tr>
              <tr className="border-t border-border bg-secondary/30">
                <td className="p-3 font-medium">Appointment Flexibility</td>
                <td className="p-3 text-muted-foreground">Limited to weekday slots</td>
                <td className="p-3 text-muted-foreground">Evening & weekend options available</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Doctor Continuity</td>
                <td className="p-3 text-muted-foreground">May see different doctors</td>
                <td className="p-3 text-muted-foreground">Same doctor throughout</td>
              </tr>
              <tr className="border-t border-border bg-secondary/30">
                <td className="p-3 font-medium">Experience & Volume</td>
                <td className="p-3 text-muted-foreground">High volume, established protocols</td>
                <td className="p-3 text-muted-foreground">Varies—check CHRT statistics</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Language</td>
                <td className="p-3 text-muted-foreground">Cantonese or Mandarin</td>
                <td className="p-3 text-muted-foreground">English, Cantonese, Mandarin</td>
              </tr>
              <tr className="border-t border-border bg-secondary/30">
                <td className="p-3 font-medium">Annual Egg Storage Fees</td>
                <td className="p-3 text-muted-foreground">HK$3,000-5,000/year</td>
                <td className="p-3 text-muted-foreground">HK$5,000-12,000/year</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Facilities</td>
                <td className="p-3 text-muted-foreground">Hospital setting, shared spaces</td>
                <td className="p-3 text-muted-foreground">Private rooms, hotel-like comfort</td>
              </tr>
              <tr className="border-t border-border bg-secondary/30">
                <td className="p-3 font-medium">TCM Integration</td>
                <td className="p-3 text-muted-foreground">Rarely offered</td>
                <td className="p-3 text-muted-foreground">Some clinics offer acupuncture</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-medium">Payment Plans</td>
                <td className="p-3 text-muted-foreground">Full payment upfront</td>
                <td className="p-3 text-muted-foreground">Installment options available</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* How to Check Success Rates */}
        <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-5">
          <h3 className="font-semibold mb-2">How to Check Clinic Success Rates</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The <strong>Council on Human Reproductive Technology (CHRT)</strong> publishes annual statistics 
            for all licensed fertility centres in Hong Kong. These reports include pregnancy rates, live birth 
            rates, and cycle volumes by clinic.
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 mb-3">
            <li>• <strong>CHRT Annual Statistics:</strong> <a href="https://www.chrt.org.hk/english/publications/publications.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.chrt.org.hk</a> (Publications section)</li>
            <li>• <strong>Hong Kong Medical Journal:</strong> Peer-reviewed articles on IVF outcomes in HK</li>
            <li>• <strong>Individual clinic websites:</strong> Some clinics publish their own success rates (e.g., HKU-QMH CARE)</li>
          </ul>
          <p className="text-xs text-muted-foreground italic">
            Tip: When comparing rates, ensure you're comparing like-for-like (same age groups, fresh vs frozen cycles, 
            pregnancy rate vs live birth rate).
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-2">Best for Public Hospitals</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Budget-conscious patients</li>
              <li>• Those comfortable with Cantonese or Mandarin</li>
              <li>• Patients with flexible schedules</li>
              <li>• Those who prefer established institutional protocols</li>
            </ul>
          </div>
          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-2">Best for Private Clinics</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Busy professionals needing schedule flexibility</li>
              <li>• English or Mandarin speakers</li>
              <li>• Those wanting personalized, continuous care</li>
              <li>• Patients seeking premium comfort and privacy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Traditional Chinese Foods */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Soup className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Traditional Chinese Foods for Egg Health</h2>
        </div>

        <img 
          src={tcmFoodsImage} 
          alt="Traditional Chinese medicine ingredients for fertility including red dates, goji berries, and black sesame" 
          className="w-full rounded-xl object-cover h-48 md:h-64 mb-6"
        />
        
        <p className="text-muted-foreground mb-4">
          Traditional Chinese Medicine (TCM) emphasizes nourishing the blood and kidney essence (腎精) 
          to support egg quality and reproductive health. These foods are commonly recommended by TCM practitioners.
        </p>

        {/* Preparation Timeline */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-5 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            When to Start Preparing
          </h3>
          <div className="text-sm space-y-3">
            <p className="text-muted-foreground">
              <strong>Ideal preparation period: 3 months before egg retrieval</strong>
            </p>
            <p className="text-muted-foreground">
              Eggs take approximately 90 days to mature from dormant follicles to ovulation-ready eggs. 
              This means your diet, lifestyle, and supplements during this 3-month window directly impact 
              the quality of eggs retrieved.
            </p>
            <div className="grid md:grid-cols-3 gap-3 mt-4">
              <div className="bg-background/50 rounded-lg p-3">
                <p className="font-medium text-xs text-primary mb-1">3 Months Before</p>
                <p className="text-xs text-muted-foreground">Begin TCM foods, CoQ10, reduce alcohol/caffeine, start moderate exercise</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <p className="font-medium text-xs text-primary mb-1">1 Month Before</p>
                <p className="text-xs text-muted-foreground">Intensify nourishing soups, prioritize sleep, reduce stress, avoid cold foods</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <p className="font-medium text-xs text-primary mb-1">During Stimulation</p>
                <p className="text-xs text-muted-foreground">Warm, protein-rich meals, gentle walking only, stay hydrated</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-primary" />
              Blood-Nourishing Foods (補血)
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>Red dates (紅棗)</strong> - Rich in iron, supports blood production</li>
              <li><strong>Goji berries (枸杞子)</strong> - Nourishes liver and kidney yin</li>
              <li><strong>Black sesame (黑芝麻)</strong> - Strengthens kidney essence</li>
              <li><strong>Longan (龍眼)</strong> - Tonifies heart and spleen blood</li>
              <li><strong>Black chicken (烏雞)</strong> - Traditional fertility tonic</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-primary" />
              Kidney-Tonifying Foods (補腎)
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>Black beans (黑豆)</strong> - Strengthens kidney energy</li>
              <li><strong>Walnuts (核桃)</strong> - Supports brain and kidney function</li>
              <li><strong>Chinese yam (淮山)</strong> - Nourishes spleen and kidney</li>
              <li><strong>Sea cucumber (海參)</strong> - Premium kidney tonic</li>
              <li><strong>Black fungus (黑木耳)</strong> - Improves blood circulation</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Soup className="w-4 h-4 text-primary" />
              Fertility Soups (湯水)
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>Black chicken soup with goji & dates</strong> - Classic fertility tonic</li>
              <li><strong>Fish maw soup (花膠湯)</strong> - Rich in collagen, supports uterine health</li>
              <li><strong>Dang gui chicken soup (當歸雞湯)</strong> - Regulates menstruation</li>
              <li><strong>Lotus seed & lily bulb soup</strong> - Calms the mind, supports yin</li>
              <li><strong>Four herbs soup (四物湯)</strong> - Traditional blood tonic</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Foods to Limit
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><strong>Cold/raw foods</strong> - May impair blood circulation</li>
              <li><strong>Excessive spicy foods</strong> - Can cause internal heat</li>
              <li><strong>Processed foods</strong> - Low nutritional value</li>
              <li><strong>Excessive caffeine</strong> - May affect hormone balance</li>
              <li><strong>Alcohol</strong> - Impacts egg quality</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-primary/10 rounded-xl p-5 border border-primary/20">
          <p className="text-sm">
            <strong>TCM Tip:</strong> Consume warming foods during the follicular phase (after menstruation) 
            to support egg development. Many women in Hong Kong visit TCM practitioners alongside 
            their fertility clinic for a holistic approach.
          </p>
        </div>
      </section>

      {/* Section 4: Legal & Financial */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Scale className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Legal & Financial Considerations</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Hong Kong Legal Framework
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Maximum storage period: 10 years (extendable)</li>
              <li>• Only married couples can use frozen eggs for IVF</li>
              <li>• Single women can freeze but cannot use for conception in HK</li>
              <li>• Eggs can be transported overseas for use</li>
              <li>• Egg donation is prohibited—you cannot donate eggs or receive donor eggs in HK</li>
              <li>• Written consent required for storage and disposal</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Cost Breakdown (Typical)
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Initial consultation: HK$1,500-3,000</li>
              <li>• Fertility testing: HK$3,000-8,000</li>
              <li>• Medications: HK$15,000-30,000</li>
              <li>• Egg retrieval: HK$25,000-50,000</li>
              <li>• Freezing & first year storage: HK$10,000-20,000</li>
              <li>• Annual storage: HK$3,000-12,000/year</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-secondary/50 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Insurance & Tax Considerations</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Most Hong Kong health insurance does not cover elective egg freezing</li>
            <li>• Some employer benefits may include fertility preservation</li>
            <li>• Expenses are generally not tax-deductible</li>
            <li>• Consider flexible payment plans offered by clinics</li>
          </ul>
        </div>
      </section>

      {/* Section 5: Consultation Questions */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Questions for Your Consultation</h2>
        </div>

        <img 
          src={consultationImage} 
          alt="Doctor consultation in a modern fertility clinic" 
          className="w-full rounded-xl object-cover h-48 md:h-64 mb-6"
        />
        <div className="space-y-4">
          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3">About the Clinic</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>□ How many egg freezing cycles do you perform annually?</li>
              <li>□ What is your average number of eggs retrieved per cycle?</li>
              <li>□ What is your egg survival rate after thawing?</li>
              <li>□ Who will be my primary doctor throughout the process?</li>
              <li>□ What languages do your staff speak?</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3">About the Procedure</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>□ Based on my test results, how many eggs might I expect?</li>
              <li>□ What stimulation protocol do you recommend for me?</li>
              <li>□ How many monitoring appointments will I need?</li>
              <li>□ What are the risks and side effects?</li>
              <li>□ Do you recommend any supplements before the cycle?</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3">About Costs & Logistics</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>□ What is the total cost including all medications?</li>
              <li>□ Do you offer payment plans?</li>
              <li>□ What are the annual storage fees and terms?</li>
              <li>□ What happens if I want to transport my eggs overseas?</li>
              <li>□ What is the process for using my eggs in the future?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Recovery Guide */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Recovery & Self-Care</h2>
        </div>

        <img 
          src={recoveryRestImage} 
          alt="Woman relaxing at home during recovery" 
          className="w-full rounded-xl object-cover h-48 md:h-64 mb-6"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Day of Retrieval</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Arrange someone to take you home</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Rest for the remainder of the day</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Take prescribed pain medication as needed</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Avoid driving for 24 hours</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Stay hydrated with warm fluids</li>
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-xl p-5">
            <h3 className="font-semibold mb-3">Week After Retrieval</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Avoid strenuous exercise for 1-2 weeks</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />No swimming or baths (showers only)</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Mild bloating is normal for a few days</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Return to work after 1-2 days (desk work)</li>
              <li><CheckCircle2 className="w-4 h-4 inline text-primary mr-2" />Expect period within 1-2 weeks</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-destructive/10 rounded-xl p-5 border border-destructive/20">
          <h3 className="font-semibold mb-2 text-destructive">When to Contact Your Doctor</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Severe abdominal pain not relieved by medication</li>
            <li>• Fever above 38°C (100.4°F)</li>
            <li>• Heavy bleeding (more than a normal period)</li>
            <li>• Difficulty urinating or decreased urine output</li>
            <li>• Significant weight gain or bloating</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          This guide is for informational purposes only and does not constitute medical advice. 
          Always consult with qualified healthcare professionals for personalized guidance.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © Just Law Elizabeth · Hong Kong Fertility Planning Guide
        </p>
      </div>
    </div>
  );
};

export default FertilityPlanningGuide;
