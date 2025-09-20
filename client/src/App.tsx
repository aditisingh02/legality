import { useState } from "react";
import { DocumentUpload } from "./components/DocumentUpload";
import { DocumentAnalysis } from "./components/DocumentAnalysis";
import { Header } from "./components/Header";
import type { DocumentAnalysisResult } from "./types";

function App() {
  const [analysis, setAnalysis] = useState<DocumentAnalysisResult | null>(null);
  const [documentText, setDocumentText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (
    result: DocumentAnalysisResult,
    text: string
  ) => {
    setAnalysis(result);
    setDocumentText(text);
  };

  const handleReset = () => {
    setAnalysis(null);
    setDocumentText("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!analysis ? (
          <DocumentUpload
            onAnalysisComplete={handleAnalysisComplete}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
          <DocumentAnalysis
            analysis={analysis}
            documentText={documentText}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;
