import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const speakingEngagements = [
  { date: "7 Dec 2022", event: "Alienated Children First Webinar", topic: "DIY Hague Applications Part 2" },
  { date: "22 Nov 2022", event: "Alienated Children First Webinar", topic: "DIY Hague Applications Part 1" },
  { date: "6 Feb 2020, Brussels", event: "EU-Parliament", topic: "International Conference on PA: Current Awareness in ROI" },
  { date: "30 May 2019, Dublin", event: "Parental Alienation EU, Trinity College", topic: "No Bars Required, A Perspective between the USA and Ireland" },
  { date: "12 July 2019, Galway", event: "32nd Annual Film Fleadh", topic: "Protection, Documents, Jurisdiction & Finances in Film Law" },
  { date: "13 June 2018, Luxembourg", event: "European Court of Justice", topic: "Mutual Trust between the Member States of the European Union" },
  { date: "9 May 2018, Dublin", event: "Irish Centre for European Law", topic: "Brexit and Rights in Northern Ireland: The Role of the EU-27" },
  { date: "4 Nov 2017, Kilkenny", event: "Integras", topic: "Legality & Ethics of Genetic Manipulation" },
  { date: "5 Feb 2016, Beverly Hills, CA", event: "Steel Partners", topic: "Think Tank on Parental Alienation" },
  { date: "12 Oct 2015, Hong Kong", event: "American Club", topic: "Relationships, Wills & Legal Guardians" },
  { date: "8 Oct 2015, Hong Kong", event: "Law Society HK", topic: "Jurisdictional & Financial Implications in International Cases - Part 3" },
  { date: "7 May 2015, Hong Kong", event: "American Club", topic: "Your Legal & Financial Rights as a US Citizen in Hong Kong" },
  { date: "5 Dec 2014, Hong Kong", event: "The Profectional Company", topic: "Jurisdictional and Financial Implications in International Cases - Part 2" },
  { date: "16 Oct 2014, Hong Kong", event: "Law Society HK", topic: "Jurisdictional & Financial Implications in International Cases - Part 1" },
  { date: "17 Sept 2013, Buenos Aires", event: "International Academy of Matrimonial Lawyers", topic: "Hague Symposium" },
  { date: "16 Jan 2013, Tokyo", event: "Ministry of Foreign Affairs of Japan", topic: "Symposium on the Hague Convention in Considering the Modality of International Family Mediation" },
  { date: "4 Nov 2013, Hong Kong", event: "American Chamber & The Women's Foundation", topic: "Women of Influence Conference and Awards 2013" },
  { date: "4 Sept 2012, Singapore", event: "International Academy of Matrimonial Lawyers", topic: "Practice of the Hague Convention in HK" },
  { date: "5-9 Sept 2012, Singapore", event: "International Academy of Matrimonial Lawyers", topic: "Annual Meeting" },
  { date: "27-28 Aug 2012, Hong Kong", event: "2nd Children's Issues Forum", topic: "" },
  { date: "13-14 July 2012, Penang", event: "4th LawAsia Family Law Conference", topic: "" },
  { date: "29 April 2011, Fort Carson, CO", event: "US Army, JAG", topic: "International Law & Military Families" },
  { date: "2 July 2010, London", event: "London Metropolitan University", topic: "Mediating Parental Kidnapping Cases in the USA" },
  { date: "4 June 2010, Denver, CO", event: "AFCC 47th Annual Conference", topic: "Traversing the Trail of International Alienation" },
];

const Books = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-3">Books & Guides</h2>
        <p className="text-muted-foreground mb-6">From courtroom timelines to financial disclosure, we publish practical resources you can actually use.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-5 flex gap-4">
            <img 
              src="/book-cover-hk.png" 
              alt="Hong Kong Family Court: A Guide to Self Representation book cover" 
              className="w-24 h-auto rounded-lg shadow-md flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold">Hong Kong Family Court: A Guide to Self Representation</h3>
              <p className="text-sm text-muted-foreground mt-2">Published by HKU Press (2026). A step by step guide for anyone wanting to represent themselves in Family Court in Hong Kong.</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Publication updates <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 flex gap-4">
            <img 
              src="/book-cover-mdjw.png" 
              alt="My Divorce Journal Workbook book cover" 
              className="w-24 h-auto rounded-lg shadow-md flex-shrink-0"
            />
            <div>
              <h3 className="font-semibold">My Divorce Journal Workbook</h3>
              <p className="text-sm text-muted-foreground mt-2">Scheduled for publication in Spring 2026. A workbook to guide the user through all aspects of divorce.</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-medium hover:underline">Join the Waiting List <ChevronRight className="w-4 h-4" /></Link>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5 lg:row-span-2">
            <h4 className="font-semibold mb-3">Speaking Engagements</h4>
            <p className="text-sm text-muted-foreground mb-3">30+ international speaking engagements including:</p>
            <ScrollArea className="h-[320px] pr-3">
              <ul className="space-y-3">
                {speakingEngagements.map((engagement, index) => (
                  <li key={index} className="text-sm border-b border-border/50 pb-2 last:border-0">
                    <span className="text-muted-foreground text-xs">{engagement.date}</span>
                    <p className="font-medium">{engagement.event}</p>
                    {engagement.topic && <p className="text-muted-foreground text-xs">{engagement.topic}</p>}
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <Link to="/speaking-enquiry" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline">
              Hire Caroline for a Speaking Engagement <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Books;
