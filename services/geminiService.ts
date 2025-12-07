import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
 
/** // <--- הוספתי כאן רווח בשורה הריקה כדי לכפות עדכון
 * Helps a user write a better barter offer using Gemini.
 */
export const optimizeOfferDescription = async (rawInput: string): Promise<{
  title: string,
  description: string,
  offeredService: string,
  requestedService: string,
  location: string,
  tags: string[],
  expirationDate?: string
} | null> => {

  if (!API_KEY) {
    console.warn("Gemini API Key missing.");
    return null;
  }

  try {
    // 1. אתחול לפי הספרייה התקנית עם המפתח המוסתר
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // 2. הגדרת המודל וההחזרה כ-JSON
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: "application/json" }
    });

    const today = new Date().toISOString().split('T')[0];
    
    // 3. הפרומפט המקורי שלך
    const prompt = `
      Current Date: ${today}
      Analyze this barter offer request: "${rawInput}"
      
      Return a JSON object with:
      - title (Hebrew, professional)
      - description (Hebrew, persuasive)
      - offeredService (Short Hebrew)
      - requestedService (Short Hebrew)
      - location (Hebrew, City or 'Remote')
      - tags (Array of strings)
      - expirationDate (YYYY-MM-DD, only if a deadline is explicitly mentioned relative to today)
    `;

    // 4. שליחה וקבלת תשובה
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return JSON.parse(text);

  } catch (error) {
    console.error("Offer optimization failed:", error);
    return null;
  }
};