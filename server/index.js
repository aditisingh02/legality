import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeDocument } from "./services/documentAnalyzer.js";
import { extractTextFromFile } from "./services/textExtractor.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only DOCX and TXT files are allowed. PDF support coming soon."
        )
      );
    }
  },
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
    service: "Legality API",
  });
});

// Document upload and analysis endpoint
app.post(
  "/api/analyze-document",
  upload.single("document"),
  async (req, res) => {
    try {
      let documentText = "";

      if (req.file) {
        // Extract text from uploaded file
        documentText = await extractTextFromFile(req.file);
      } else if (req.body.text) {
        // Use provided text
        documentText = req.body.text;
      } else {
        return res.status(400).json({ error: "No document or text provided" });
      }

      if (!documentText.trim()) {
        return res.status(400).json({
          error: "Document appears to be empty or text could not be extracted",
        });
      }

      // Analyze document with Gemini AI
      const analysis = await analyzeDocument(genAI, documentText);

      res.json({
        success: true,
        analysis,
        documentLength: documentText.length,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Document analysis error:", error);
      res.status(500).json({
        error: "Failed to analyze document",
        details: error.message,
      });
    }
  }
);

// Q&A endpoint for document-specific questions
app.post("/api/ask-question", async (req, res) => {
  try {
    const { question, documentText } = req.body;

    if (!question || !documentText) {
      return res
        .status(400)
        .json({ error: "Question and document text are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Based ONLY on the following legal document, answer this question: "${question}"

Document:
${documentText}

Instructions:
- Answer only based on information found in the document
- Include direct quotes from the document to support your answer
- If the information is not in the document, say "This information is not found in the provided document"
- Be specific and cite the relevant sections

Answer:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({
      question,
      answer,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Q&A error:", error);
    res.status(500).json({
      error: "Failed to answer question",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Legality server running on http://localhost:${PORT}`);
  console.log("📄 Document analysis ready");
  console.log("🤖 Gemini AI configured");
});
