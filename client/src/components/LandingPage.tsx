import { useState } from "react";
import {
  Scale,
  Users,
  Star,
  FileText,
  Shield,
  Brain,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import { Footer } from "./Footer";

interface LandingPageProps {
  onGetStarted: () => void;
}

interface FAQ {
  question: string;
  answer: string;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const stats = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      number: "10K+",
      label: "Documents Analyzed",
      description: "Comprehensive analysis across various legal document types",
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      number: "5+",
      label: "Years of AI Excellence",
      description:
        "Cutting-edge AI technology refined over years of development",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      number: "500+",
      label: "Satisfied Clients",
      description: "Individuals and businesses trusting our legal analysis",
    },
  ];

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze your legal documents with precision and accuracy.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk Assessment",
      description:
        "Comprehensive risk evaluation highlighting potential issues and vulnerabilities in your contracts.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Instant Results",
      description:
        "Get detailed analysis and plain-language summaries in minutes, not hours or days.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Key Terms Identification",
      description:
        "Automatically identify and explain critical clauses, obligations, and important legal terminology.",
    },
  ];

  const services = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Contract Analysis",
      description:
        "Comprehensive review of employment contracts, service agreements, and business partnerships.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Risk Evaluation",
      description:
        "Detailed assessment of potential legal and financial risks within your documents.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Legal Compliance",
      description:
        "Ensure your agreements meet current legal standards and regulatory requirements.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Plain Language Translation",
      description:
        "Convert complex legal jargon into clear, understandable explanations for informed decision-making.",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "What types of legal documents can be analyzed?",
      answer:
        "Our AI can analyze various legal documents including employment contracts, service agreements, NDAs, lease agreements, terms of service, privacy policies, and business partnerships. We support DOCX and TXT formats with PDF support coming soon.",
    },
    {
      question: "How accurate is the AI analysis?",
      answer:
        "Our AI system has been trained on thousands of legal documents and provides highly accurate analysis. However, our service is designed to supplement, not replace, professional legal advice. For critical decisions, we recommend consulting with a qualified attorney.",
    },
    {
      question: "Is my document data secure and private?",
      answer:
        "Yes, we take data security seriously. All documents are processed securely, encrypted in transit and at rest. We do not store your documents permanently, and they are automatically deleted after analysis completion.",
    },
    {
      question: "How long does the analysis take?",
      answer:
        "Most document analyses are completed within 2-5 minutes, depending on the document length and complexity. You'll receive real-time progress updates during the analysis process.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium geist-medium">
              <Shield className="h-4 w-4" />
              SECURING YOUR LEGAL INTERESTS
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground geist-bold leading-tight">
              Legal solutions for the{" "}
              <span className="text-primary">digital age</span> that you can
              trust
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed geist-regular">
              Empower yourself with AI-driven legal document analysis. Get
              instant insights, risk assessments, and plain-language
              explanations to make informed decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 geist-medium"
              >
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 geist-medium"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium geist-medium mb-6">
              ABOUT US
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 geist-bold">
              Who are we
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed geist-regular">
              Our AI-powered platform is committed to providing expert,
              client-focused legal document analysis across a range of practice
              areas. With deep experience and a results-driven approach, we
              deliver strategic solutions tailored to each client's needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-foreground mb-2 geist-bold">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2 geist-semibold">
                  {stat.label}
                </div>
                <p className="text-muted-foreground text-sm geist-regular">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium geist-medium mb-6">
                WHAT WE DO
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 geist-bold">
                Delivering practical solutions through{" "}
                <span className="text-primary">trusted AI analysis</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed geist-regular">
                Transform complex legal documents into clear, actionable
                insights with our advanced AI technology. Make confident
                decisions with comprehensive analysis and risk assessment.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-xl p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 geist-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground geist-regular">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium geist-medium mb-6">
              FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 geist-bold">
              Everything you need for{" "}
              <span className="text-primary">cutting-edge</span> legal analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed geist-regular">
              Comprehensive document analysis powered by advanced AI to help you
              understand and navigate complex legal agreements with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 geist-semibold">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed geist-regular">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium geist-medium mb-6">
              ANSWERS FOR YOUR QUESTIONS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 geist-bold">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground geist-regular">
              Find answers to common questions about our AI-powered legal
              document analysis service.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold geist-semibold">
                      {index + 1}
                    </div>
                    <span className="text-lg font-semibold text-foreground geist-semibold">
                      {faq.question}
                    </span>
                  </div>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="pl-12">
                      <p className="text-muted-foreground leading-relaxed geist-regular">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/20 p-4 rounded-2xl">
                <Scale className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 geist-bold">
              Start analyzing your legal documents today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto geist-regular">
              Join thousands of satisfied users who trust our AI-powered
              analysis for their legal document needs.
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 geist-medium"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
