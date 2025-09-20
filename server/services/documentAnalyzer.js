export async function analyzeDocument(genAI, documentText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate summary
  const summary = await generateSummary(model, documentText);

  // Assess risks
  const riskAssessment = await assessRisks(model, documentText);

  // Extract glossary terms
  const glossary = await extractGlossary(model, documentText);

  return {
    summary,
    riskAssessment,
    glossary,
    documentLength: documentText.length,
  };
}

async function generateSummary(model, documentText) {
  const prompt = `Analyze this legal document and provide a plain-language summary in exactly 5-7 bullet points. Focus on:
- Key obligations and responsibilities
- Important deadlines and time periods
- Financial terms and penalties
- Termination conditions
- User rights and limitations

Document:
${documentText}

Provide ONLY the bullet points, no additional text:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log("Raw summary response:", text);

  // Clean up the response and split into lines
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  console.log("Processed lines:", lines);

  // If we have bullet points, filter for them
  const bulletPoints = lines.filter(
    (line) =>
      line.startsWith("•") ||
      line.startsWith("-") ||
      line.startsWith("*") ||
      line.match(/^\d+\./)
  );

  console.log("Found bullet points:", bulletPoints);

  // If we found bullet points, use them, otherwise use the first few non-empty lines
  if (bulletPoints.length > 0) {
    return bulletPoints.slice(0, 7);
  } else {
    return lines.slice(0, 7);
  }
}

async function assessRisks(model, documentText) {
  const prompt = `Analyze this legal document for risk factors. Identify clauses that could be unfavorable to the user and assign risk levels.

Document:
${documentText}

For each risk found, provide:
1. Risk Level: HIGH, MEDIUM, or LOW
2. Clause Description: Brief description of the problematic clause
3. Risk Explanation: Why this is risky in plain language
4. Quote: Direct quote from the document

Format as JSON array:
[
  {
    "riskLevel": "HIGH|MEDIUM|LOW",
    "clause": "Brief description",
    "explanation": "Why this is risky",
    "quote": "Direct quote from document"
  }
]

Respond with ONLY the JSON array:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  // Clean up the response to extract JSON
  text = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  try {
    const risks = JSON.parse(text);

    // Calculate overall risk score
    const riskScore = calculateRiskScore(risks);

    return {
      risks,
      overallRiskScore: riskScore,
      riskLevel: getRiskLevel(riskScore),
    };
  } catch (error) {
    console.error("Error parsing risk assessment:", error);
    return {
      risks: [],
      overallRiskScore: 0,
      riskLevel: "LOW",
      error: "Could not parse risk assessment",
    };
  }
}

async function extractGlossary(model, documentText) {
  const prompt = `Extract legal jargon and complex terms from this document and provide simple definitions.

Document:
${documentText}

For each term, provide:
1. Term: The legal term or jargon
2. Definition: Simple, plain-English explanation
3. Context: How it's used in this document

Format as JSON array:
[
  {
    "term": "legal term",
    "definition": "simple explanation",
    "context": "how it's used in this document"
  }
]

Focus on terms that non-lawyers would find confusing. Respond with ONLY the JSON array:`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();

  // Clean up the response to extract JSON
  text = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing glossary:", error);
    return [];
  }
}

function calculateRiskScore(risks) {
  if (!risks || risks.length === 0) return 0;

  let totalScore = 0;
  const weights = { HIGH: 30, MEDIUM: 15, LOW: 5 };

  risks.forEach((risk) => {
    totalScore += weights[risk.riskLevel] || 0;
  });

  // Cap at 100
  return Math.min(totalScore, 100);
}

function getRiskLevel(score) {
  if (score >= 60) return "HIGH";
  if (score >= 30) return "MEDIUM";
  return "LOW";
}
