export interface DocumentAnalysisResult {
  summary: string[];
  riskAssessment: {
    risks: Array<{
      riskLevel: "HIGH" | "MEDIUM" | "LOW";
      clause: string;
      explanation: string;
      quote: string;
    }>;
    overallRiskScore: number;
    riskLevel: "HIGH" | "MEDIUM" | "LOW";
  };
  glossary: Array<{
    term: string;
    definition: string;
    context: string;
  }>;
  documentLength: number;
}
