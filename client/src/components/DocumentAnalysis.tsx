import { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Book,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import type { DocumentAnalysisResult } from "../types";
import { QAChat } from "./QAChat";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface DocumentAnalysisProps {
  analysis: DocumentAnalysisResult;
  documentText: string;
  onReset: () => void;
}

export function DocumentAnalysis({
  analysis,
  documentText,
  onReset,
}: DocumentAnalysisProps) {
  const [activeTab, setActiveTab] = useState<
    "summary" | "risks" | "glossary" | "chat"
  >("summary");

  const getRiskColor = (level: "HIGH" | "MEDIUM" | "LOW") => {
    switch (level) {
      case "HIGH":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "MEDIUM":
        return "text-orange-600 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";
      case "LOW":
        return "text-green-600 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
    }
  };

  const getRiskIcon = (level: "HIGH" | "MEDIUM" | "LOW") => {
    switch (level) {
      case "HIGH":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "MEDIUM":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "LOW":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getOverallRiskColor = (level: "HIGH" | "MEDIUM" | "LOW") => {
    switch (level) {
      case "HIGH":
        return "text-destructive";
      case "MEDIUM":
        return "text-orange-500";
      case "LOW":
        return "text-green-500";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={onReset} className="geist-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Upload New Document
        </Button>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="border-b border-border bg-muted/30">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-6 py-4 font-medium transition-all geist-medium ${
                activeTab === "summary"
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("risks")}
              className={`px-6 py-4 font-medium transition-all geist-medium ${
                activeTab === "risks"
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Shield className="h-4 w-4 inline mr-2" />
              Risk Assessment
            </button>
            <button
              onClick={() => setActiveTab("glossary")}
              className={`px-6 py-4 font-medium transition-all geist-medium ${
                activeTab === "glossary"
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Book className="h-4 w-4 inline mr-2" />
              Glossary
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-4 font-medium transition-all geist-medium ${
                activeTab === "chat"
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Ask Questions
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === "summary" && (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8 geist-bold">
                Document Summary
              </h2>
              <div className="space-y-4">
                {analysis.summary.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                    <div className="text-foreground leading-relaxed geist-regular">
                      <MarkdownRenderer
                        content={point.replace(/^[•\-]\s*/, "")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "risks" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground geist-bold">
                  Risk Assessment
                </h2>
                <div className="text-right">
                  <div className="text-4xl font-bold text-foreground geist-bold">
                    {analysis.riskAssessment.overallRiskScore}/100
                  </div>
                  <div
                    className={`text-sm font-semibold geist-semibold ${getOverallRiskColor(
                      analysis.riskAssessment.riskLevel
                    )}`}
                  >
                    {analysis.riskAssessment.riskLevel} RISK
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {analysis.riskAssessment.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-6 transition-all hover:shadow-sm ${getRiskColor(
                      risk.riskLevel
                    )}`}
                  >
                    <div className="flex items-start gap-4">
                      {getRiskIcon(risk.riskLevel)}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-3 text-lg geist-semibold">
                          <MarkdownRenderer content={risk.clause} />
                        </h3>
                        <div className="mb-4 leading-relaxed geist-regular">
                          <MarkdownRenderer content={risk.explanation} />
                        </div>
                        <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground geist-regular">
                          "<MarkdownRenderer content={risk.quote} />"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "glossary" && (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8 geist-bold">
                Legal Terms Glossary
              </h2>
              <div className="grid gap-6">
                {analysis.glossary.map((term, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-xl p-6 bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="font-semibold text-xl text-foreground mb-3 geist-semibold">
                      <MarkdownRenderer content={term.term} />
                    </h3>
                    <div className="text-foreground mb-3 leading-relaxed geist-regular">
                      <MarkdownRenderer content={term.definition} />
                    </div>
                    <div className="text-sm text-muted-foreground italic geist-regular">
                      Context: <MarkdownRenderer content={term.context} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "chat" && <QAChat documentText={documentText} />}
        </div>
      </div>
    </div>
  );
}
