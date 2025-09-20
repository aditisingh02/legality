import { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  MessageCircle,
  Book,
  Download,
} from "lucide-react";
import type { DocumentAnalysisResult } from "../types";
import { QAChat } from "./QAChat";

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
        return "text-red-600 bg-red-50 border-red-200";
      case "MEDIUM":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "LOW":
        return "text-green-600 bg-green-50 border-green-200";
    }
  };

  const getRiskIcon = (level: "HIGH" | "MEDIUM" | "LOW") => {
    return (
      <AlertTriangle
        className={`h-5 w-5 ${
          level === "HIGH"
            ? "text-red-500"
            : level === "MEDIUM"
            ? "text-orange-500"
            : "text-green-500"
        }`}
      />
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Upload New Document
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("summary")}
              className={`px-6 py-4 font-medium ${
                activeTab === "summary"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("risks")}
              className={`px-6 py-4 font-medium ${
                activeTab === "risks"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Risk Assessment
            </button>
            <button
              onClick={() => setActiveTab("glossary")}
              className={`px-6 py-4 font-medium ${
                activeTab === "glossary"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Book className="h-4 w-4 inline mr-2" />
              Glossary
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-6 py-4 font-medium ${
                activeTab === "chat"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Ask Questions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "summary" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Document Summary
              </h2>
              <div className="space-y-3">
                {analysis.summary.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700">
                      {point.replace(/^[•\-]\s*/, "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "risks" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Risk Assessment
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {analysis.riskAssessment.overallRiskScore}/100
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      analysis.riskAssessment.riskLevel === "HIGH"
                        ? "text-red-600"
                        : analysis.riskAssessment.riskLevel === "MEDIUM"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {analysis.riskAssessment.riskLevel} RISK
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {analysis.riskAssessment.risks.map((risk, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getRiskColor(
                      risk.riskLevel
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      {getRiskIcon(risk.riskLevel)}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{risk.clause}</h3>
                        <p className="mb-3">{risk.explanation}</p>
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                          "{risk.quote}"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Legal Terms Glossary
              </h2>
              <div className="space-y-4">
                {analysis.glossary.map((term, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {term.term}
                    </h3>
                    <p className="text-gray-700 mb-2">{term.definition}</p>
                    <p className="text-sm text-gray-600 italic">
                      Context: {term.context}
                    </p>
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
