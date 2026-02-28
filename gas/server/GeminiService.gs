/**
 * AI Insights Service (Gemini)
 */
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';

function getAiInsights(prompt) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const payload = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };
    
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };
    
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());
    
    if (json.candidates && json.candidates[0].content.parts[0].text) {
      return json.candidates[0].content.parts[0].text;
    }
    return "Tidak ada hasil dari AI.";
  } catch (e) {
    return "Error AI: " + e.toString();
  }
}
