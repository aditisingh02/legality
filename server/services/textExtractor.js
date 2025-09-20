import mammoth from "mammoth";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export async function extractTextFromFile(file) {
  const { buffer, mimetype, originalname } = file;

  try {
    switch (mimetype) {
      case "application/pdf":
        return await extractFromPDF(buffer);

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return await extractFromDOCX(buffer);

      case "text/plain":
        return buffer.toString("utf-8");

      default:
        throw new Error(
          `Unsupported file type: ${mimetype}. Please use PDF, DOCX, or TXT files.`
        );
    }
  } catch (error) {
    console.error(`Error extracting text from ${originalname}:`, error);
    throw new Error(
      `Failed to extract text from ${originalname}: ${error.message}`
    );
  }
}

async function extractFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer, {
      // Options to improve text extraction quality
      normalizeWhitespace: true,
      disableCombineTextItems: false,
    });

    if (!data.text || data.text.trim().length === 0) {
      throw new Error(
        "PDF appears to be empty or contains no extractable text"
      );
    }

    return data.text;
  } catch (error) {
    throw new Error(`PDF parsing failed: ${error.message}`);
  }
}

async function extractFromDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    throw new Error(`DOCX parsing failed: ${error.message}`);
  }
}
