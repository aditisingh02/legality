import { Scale, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const companyLinks = [
    { label: "About Us", href: "#" },
    { label: "Meet the Team", href: "#" },
    { label: "Insights", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const serviceLinks = [
    { label: "Document Analysis", href: "#" },
    { label: "Risk Assessment", href: "#" },
    { label: "Contract Review", href: "#" },
    { label: "Legal Consulting", href: "#" },
  ];
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Scale className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground geist-bold">
                  Legality
                </h3>
                <p className="text-sm text-muted-foreground geist-regular">
                  AI-Powered Legal Analysis
                </p>
              </div>
            </div>
            <p className="text-muted-foreground geist-regular leading-relaxed">
              Empowering individuals and businesses with intelligent legal
              document analysis. Transform complex legal language into clear,
              actionable insights.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm geist-regular">
                  support@legality.ai
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm geist-regular">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm geist-regular">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6 geist-semibold">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors geist-regular"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-6 geist-semibold">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors geist-regular"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground geist-regular">
              © 2025 Legality. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground geist-regular">
              Made with ❤️ for better legal understanding
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
