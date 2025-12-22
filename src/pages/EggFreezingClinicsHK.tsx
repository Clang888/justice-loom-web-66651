import { Building2, MapPin, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const clinics = [
  {
    name: "Hong Kong Sanatorium & Hospital – Assisted Reproductive Centre",
    address: "2 Village Road, Happy Valley, Hong Kong",
    phone: "+852 2835 8060",
    website: "https://www.hksh.com"
  },
  {
    name: "Queen Mary Hospital – Assisted Reproduction Unit",
    address: "102 Pok Fu Lam Road, Pok Fu Lam, Hong Kong",
    phone: "+852 2255 4517",
    website: "https://www.ha.org.hk"
  },
  {
    name: "The University of Hong Kong – Centre of Assisted Reproduction and Embryology (CARE)",
    address: "Level 4, Block E, Queen Mary Hospital, 102 Pok Fu Lam Road, Hong Kong",
    phone: "+852 2255 4653",
    website: "https://www.hku.hk"
  },
  {
    name: "Victory ART Laboratory",
    address: "1/F, 27 Hospital Road, Sai Ying Pun, Hong Kong",
    phone: "+852 2818 9338",
    website: "https://www.victoryart.com.hk"
  },
  {
    name: "Hong Kong IVF Centre",
    address: "Suite 901-902, 9/F, New World Tower 1, 16-18 Queen's Road Central, Hong Kong",
    phone: "+852 2868 2311",
    website: "https://www.hkivf.com"
  },
  {
    name: "Virtus Fertility Centre Hong Kong",
    address: "21/F, 100 Queen's Road Central, Hong Kong",
    phone: "+852 2100 2328",
    website: "https://www.virtusfertilitycentre.com.hk"
  }
];

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

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {clinics.map((clinic, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">{clinic.name}</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{clinic.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                  <a href={`tel:${clinic.phone}`} className="hover:underline">{clinic.phone}</a>
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
