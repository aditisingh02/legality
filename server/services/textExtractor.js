import mammoth from "mammoth";

export async function extractTextFromFile(file) {
  const { buffer, mimetype, originalname } = file;

  try {
    switch (mimetype) {
      case "application/pdf":
        throw new Error(
          "PDF support temporarily disabled. Please use DOCX or paste text directly."
        );

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return await extractFromDOCX(buffer);

      case "text/plain":
        return buffer.toString("utf-8");

      default:
        throw new Error(
          `Unsupported file type: ${mimetype}. Please use DOCX or TXT files.`
        );
    }
  } catch (error) {
    console.error(`Error extracting text from ${originalname}:`, error);
    throw new Error(
      `Failed to extract text from ${originalname}: ${error.message}`
    );
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
