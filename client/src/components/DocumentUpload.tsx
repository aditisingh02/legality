import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import type { DocumentAnalysisResult } from "../types";

interface DocumentUploadProps {
  onAnalysisComplete: (
    analysis: DocumentAnalysisResult,
    documentText: string
  ) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function DocumentUpload({
  onAnalysisComplete,
  isLoading,
  setIsLoading,
}: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "text">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(
        "http://localhost:3001/api/analyze-document",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }

      const data = await response.json();
      onAnalysisComplete(data.analysis, ""); // We don't have the original text from file upload
    } catch (error) {
      console.error("Error analyzing document:", error);
      alert("Failed to analyze document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/analyze-document",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: textInput }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }

      const data = await response.json();
      onAnalysisComplete(data.analysis, textInput);
    } catch (error) {
      console.error("Error analyzing document:", error);
      alert("Failed to analyze document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Analyzing Document
        </h2>
        <p className="text-gray-600">This may take a few moments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Upload Your Legal Document
        </h2>
        <p className="text-lg text-gray-600">
          Get instant plain-language summaries, risk assessments, and
          explanations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUploadMethod("file")}
            className={`px-4 py-2 rounded-lg font-medium ${
              uploadMethod === "file"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Upload File
          </button>
          <button
            onClick={() => setUploadMethod("text")}
            className={`px-4 py-2 rounded-lg font-medium ${
              uploadMethod === "text"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Paste Text
          </button>
        </div>

        {uploadMethod === "file" ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.txt"
              onChange={handleFileInput}
              className="hidden"
            />

            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop your document here
            </h3>
            <p className="text-gray-600 mb-4">or click to browse files</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supports DOCX and TXT files (max 10MB). PDF support coming soon.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste your legal document text here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleTextSubmit}
              disabled={!textInput.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <FileText className="h-5 w-5 inline mr-2" />
              Analyze Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
