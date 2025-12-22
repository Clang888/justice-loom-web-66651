import { Building2, MapPin, Phone, Globe, Mail, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const clinics = [
  {
    name: "HKU–Queen Mary Hospital (HKU-QMH CARE)",
    address: "Room 528, 5/F, Block K, Queen Mary Hospital, Pokfulam Road, Hong Kong",
    phone: "+852 2255 4262",
    email: "hkuivf@hku.hk",
    website: "https://hkuivf.hku.hk"
  },
  {
    name: "CUHK IVFHK (Prince of Wales Hospital – ART Unit)",
    address: "9/F, Old Block (EF Wing), Prince of Wales Hospital, Shatin, N.T., Hong Kong",
    phone: "+852 3505 1456",
    phoneAlt: "+852 3505 3148 (ART patients)",
    whatsapp: "+852 6501 1574",
    email: "ivfhkmed@cuhk.edu.hk",
    website: "https://ivfhk.com"
  },
  {
    name: "Hong Kong Sanatorium & Hospital – IVF Centre",
    address: "6/F, Li Shu Pui Block, 2 Village Road, Happy Valley, Hong Kong",
    phone: "+852 2835 8060",
    whatsapp: "+852 2835 8060",
    email: "ivf@hksh-hospital.com",
    website: "https://www.hksh.com/en/medical-services/facilities-services-centres-and-clinics/ivf-centre.html"
  },
  {
    name: "Hong Kong Assisted Reproduction Centre (HKARC)",
    address: "Room 1502, 15/F, Henley Building, 5 Queen's Road Central, Central, Hong Kong",
    phone: "+852 2117 3855",
    whatsapp: "+852 9018 8248",
    email: "enquiry@hkarc.com.hk",
    website: "https://hkarc.com.hk"
  },
  {
    name: "HEAL Fertility",
    address: "10/F, One Chinachem Central, 22 Des Voeux Road Central, Central, Hong Kong",
    phone: "+852 3703 3608",
    email: "info@heal-fertility.com",
    website: "https://heal-fertility.com"
  },
  {
    name: "HK IVF Centre (Ocean Centre, Tsim Sha Tsui)",
    address: "Room 1322–1325, 13/F, Ocean Centre, Harbour City, 5 Canton Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    phone: "+852 3468 3168",
    email: "info@hkivf.com",
    website: "https://hkivf.com"
  },
  {
    name: "Hong Kong Reproductive Medicine Centre (HKRMC)",
    address: "Suite 1228–30, 12/F, Ocean Centre, Tsim Sha Tsui, Hong Kong",
    phone: "+852 8200 8168",
    whatsapp: "+852 5489 8756",
    email: "enquiry@reprodmed.com",
    website: "https://reprodmed.com"
  },
  {
    name: "Union Reproductive Medicine Centre (Tsim Sha Tsui)",
    address: "12/F, H Zentre, 15 Middle Road, Tsim Sha Tsui, Kowloon, Hong Kong",
    phone: "+852 3126 1623",
    whatsapp: "+852 9380 0023",
    email: "urmc@union.org",
    website: "https://www.union.org/urmc"
  },
  {
    name: "The IVF Clinic (The Women's Clinic Group – Central)",
    address: "13/F, Central Tower, 28 Queen's Road Central, Central, Hong Kong",
    phone: "+852 2208 6338",
    email: "info@theivfclinic.com.hk",
    website: "https://thewomensclinic.com.hk"
  },
  {
    name: "OT&P Healthcare (Egg Freezing)",
    address: "OT&P Central Family Clinic, LG/F, Century Square, 1 D'Aguilar Street, Central, Hong Kong",
    phone: "+852 2155 9055",
    email: "business@otandp.com",
    website: "https://otandp.com"
  },
  {
    name: "SG IVF Center (Tsuen Wan)",
    address: "Unit 01–09, 19/F, International Enterprise Centre 1, 11 Chai Wan Kok Street, Tsuen Wan, N.T., Hong Kong",
    phone: "+852 2115 0833",
    email: "info@sgivfhk.com",
    website: "https://sgivfhk.com/en/"
  }
];

interface Clinic {
  name: string;
  address: string;
  phone: string;
  phoneAlt?: string;
  whatsapp?: string;
  email: string;
  website: string;
}

const EggFreezingClinicsHK = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/egg-freezing-surrogacy" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">
          ← Back to Egg Freezing & Surrogacy
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Egg Freezing Clinics in Hong Kong</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          A list of reputable fertility clinics offering egg freezing services in Hong Kong. 
          Please verify information directly with the clinics as details may change.
        </p>

        {/* Premium Guide Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Premium Fertility Planning Guide</h2>
              <p className="text-sm text-muted-foreground">
                Complete roadmap with TCM foods, clinic comparisons, legal guidance & recovery tips
              </p>
            </div>
            <Link to="/fertility-guide">
              <Button className="gap-2 whitespace-nowrap">
                <BookOpen className="w-4 h-4" />
                View Guide
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {clinics.map((clinic: Clinic, index: number) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">{clinic.name}</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{clinic.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="flex flex-col">
                    <a href={`tel:${clinic.phone.replace(/\s/g, '')}`} className="hover:underline">{clinic.phone}</a>
                    {clinic.phoneAlt && (
                      <span className="text-xs">{clinic.phoneAlt}</span>
                    )}
                  </div>
                </li>
                {clinic.whatsapp && (
                  <li className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 flex-shrink-0 text-primary" />
                    <a href={`https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      WhatsApp: {clinic.whatsapp}
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                  <a href={`mailto:${clinic.email}`} className="hover:underline">{clinic.email}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-4 h-4 flex-shrink-0 text-primary" />
                  <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                    Visit Website
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-muted-foreground italic">
            <strong>Disclaimer:</strong> This list is provided for informational purposes only and does not constitute an endorsement or recommendation. 
            Please conduct your own research and consult with medical professionals before making any decisions about fertility treatment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EggFreezingClinicsHK;
