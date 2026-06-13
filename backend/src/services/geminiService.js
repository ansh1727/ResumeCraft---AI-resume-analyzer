import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

const getApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const isPlaceholder = !apiKey || /^(your|replace|example)/i.test(apiKey);

  if (isPlaceholder) {
    const error = new Error('Gemini API key is not configured. Add a valid GEMINI_API_KEY to backend/.env and restart the backend.');
    error.statusCode = 503;
    throw error;
  }

  return apiKey;
};

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(getApiKey());
  }
  return genAI;
};

const generateContent = async (prompt) => {
  try {
    const model = getGenAI().getGenerativeModel({ model: MODEL_NAME });
    return await model.generateContent(prompt);
  } catch (error) {
    if (error.message?.includes('API key not valid') || error.message?.includes('API_KEY_INVALID')) {
      const configError = new Error('Gemini rejected the API key. Add a valid GEMINI_API_KEY to backend/.env and restart the backend.');
      configError.statusCode = 503;
      throw configError;
    }
    throw error;
  }
};

const parseJSONResponse = (text) => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Failed to parse analysis response as JSON');
  }
  return JSON.parse(jsonMatch[0]);
};

export const analyzeResume = async (extractedData, rawText) => {
  const prompt = `You are an expert resume analyst and career coach. Analyze the following resume data and provide a comprehensive assessment.

Resume Data:
${JSON.stringify(extractedData, null, 2)}

Full Resume Text (excerpt):
${rawText.substring(0, 3000)}

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "atsScore": <number 0-100>,
  "technicalSkillScore": <number 0-100>,
  "projectQualityScore": <number 0-100>,
  "resumeFormattingScore": <number 0-100>,
  "employabilityScore": <number 0-100>,
  "missingSkills": ["skill1", "skill2"],
  "weakSections": ["section description"],
  "suggestions": ["improvement suggestion"],
  "recommendedTechnologies": ["tech1", "tech2"],
  "recommendedProjects": ["project idea"],
  "recommendedCertifications": ["certification name"]
}`;

  const result = await generateContent(prompt);
  const response = await result.response;
  return parseJSONResponse(response.text());
};

export const matchJobDescription = async (resumeData, jobDescription) => {
  const prompt = `You are an ATS (Applicant Tracking System) expert. Compare the resume against the job description and provide a detailed match analysis.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Job Description:
${jobDescription}

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "matchPercentage": <number 0-100>,
  "matchScore": <number 0-100>,
  "missingKeywords": ["keyword1", "keyword2"],
  "matchingSkills": ["skill1", "skill2"],
  "improvementSuggestions": ["suggestion1", "suggestion2"],
  "atsCompatibilityScore": <number 0-100>
}`;

  const result = await generateContent(prompt);
  const response = await result.response;
  return parseJSONResponse(response.text());
};

export const enhanceExtractedData = async (rawText) => {
  const prompt = `Extract structured information from this resume text. Return ONLY valid JSON:

Resume Text:
${rawText.substring(0, 4000)}

{
  "name": "full name",
  "email": "email",
  "phone": "phone",
  "skills": ["skill1", "skill2"],
  "education": ["degree and institution"],
  "projects": ["project description"],
  "experience": ["job title and company"],
  "certifications": ["certification name"]
}`;

  try {
    const result = await generateContent(prompt);
    const response = await result.response;
    return parseJSONResponse(response.text());
  } catch {
    return null;
  }
};
