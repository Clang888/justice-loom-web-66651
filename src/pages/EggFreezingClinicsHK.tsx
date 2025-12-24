import { Building2, MapPin, Phone, Globe, Mail, MessageCircle, Download, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

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
  const downloadCSV = () => {
    const headers = ["Name", "Address", "Phone", "WhatsApp", "Email", "Website"];
    const csvContent = [
      headers.join(","),
      ...clinics.map(clinic => [
        `"${clinic.name}"`,
        `"${clinic.address}"`,
        `"${clinic.phone}${clinic.phoneAlt ? ` / ${clinic.phoneAlt}` : ''}"`,
        `"${clinic.whatsapp || ''}"`,
        `"${clinic.email}"`,
        `"${clinic.website}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "egg-freezing-clinics-hong-kong.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 50;
    const lineHeight = 14;
    
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let yPosition = pageHeight - margin;

    // Title
    page.drawText("Egg Freezing Clinics in Hong Kong", {
      x: margin,
      y: yPosition,
      size: 20,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    yPosition -= 30;

    // Subtitle
    page.drawText("A comprehensive list of fertility clinics offering egg freezing services", {
      x: margin,
      y: yPosition,
      size: 10,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    });
    yPosition -= 10;

    page.drawText(`Generated: ${new Date().toLocaleDateString()}`, {
      x: margin,
      y: yPosition,
      size: 9,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
    yPosition -= 35;

    // Clinics
    for (const clinic of clinics) {
      // Check if we need a new page
      if (yPosition < 150) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }

      // Clinic name
      page.drawText(clinic.name, {
        x: margin,
        y: yPosition,
        size: 12,
        font: boldFont,
        color: rgb(0.15, 0.15, 0.15),
      });
      yPosition -= lineHeight + 4;

      // Address
      const addressLines = wrapText(clinic.address, 80);
      for (const line of addressLines) {
        page.drawText(`Address: ${line}`, {
          x: margin + 10,
          y: yPosition,
          size: 9,
          font: font,
          color: rgb(0.3, 0.3, 0.3),
        });
        yPosition -= lineHeight;
      }

      // Phone
      let phoneText = `Phone: ${clinic.phone}`;
      if (clinic.phoneAlt) phoneText += ` / ${clinic.phoneAlt}`;
      page.drawText(phoneText, {
        x: margin + 10,
        y: yPosition,
        size: 9,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });
      yPosition -= lineHeight;

      // WhatsApp (if available)
      if (clinic.whatsapp) {
        page.drawText(`WhatsApp: ${clinic.whatsapp}`, {
          x: margin + 10,
          y: yPosition,
          size: 9,
          font: font,
          color: rgb(0.3, 0.3, 0.3),
        });
        yPosition -= lineHeight;
      }

      // Email
      page.drawText(`Email: ${clinic.email}`, {
        x: margin + 10,
        y: yPosition,
        size: 9,
        font: font,
        color: rgb(0.3, 0.3, 0.3),
      });
      yPosition -= lineHeight;

      // Website
      page.drawText(`Website: ${clinic.website}`, {
        x: margin + 10,
        y: yPosition,
        size: 9,
        font: font,
        color: rgb(0.2, 0.4, 0.7),
      });
      yPosition -= lineHeight + 15;
    }

    // Disclaimer at the bottom of the last page
    if (yPosition < 80) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }
    
    yPosition = 60;
    page.drawText("Disclaimer: This list is for informational purposes only and does not constitute an endorsement.", {
      x: margin,
      y: yPosition,
      size: 8,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
    page.drawText("Please verify information directly with clinics and consult medical professionals before making decisions.", {
      x: margin,
      y: yPosition - 10,
      size: 8,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "egg-freezing-clinics-hong-kong.pdf";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Helper function to wrap long text
  const wrapText = (text: string, maxChars: number): string[] => {
    if (text.length <= maxChars) return [text];
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxChars) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

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
          A list of fertility clinics offering egg freezing services in Hong Kong. 
          Please verify information directly with the clinics as details may change.
        </p>

        {/* Download Clinics List Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Download Clinics List</h2>
              <p className="text-sm text-muted-foreground">
                Save this list for offline reference in CSV or PDF format
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={downloadCSV} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Download className="w-4 h-4" />
                CSV
              </Button>
              <Button onClick={downloadPDF} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <FileText className="w-4 h-4" />
                PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Egg Optimisation Guide Banner */}
        <div className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Egg Optimisation Planning Guide</h2>
              <p className="text-sm text-muted-foreground">
                Complete roadmap with TCM foods, clinic comparisons, egg optimisation readiness & recovery tips
              </p>
            </div>
            <Link to="/fertility-guide">
              <Button className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white">
                Purchase Guide HK$199
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
