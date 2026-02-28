
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeHealthData(dataSummary: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Sebagai ahli kesehatan masyarakat, analisalah data laporan kesehatan anak berikut dan berikan rekomendasi strategis dalam format Markdown: \n\n ${dataSummary}`,
    config: {
      temperature: 0.7,
      topP: 0.95,
      thinkingConfig: { thinkingBudget: 0 }
    }
  });

  return response.text;
}

export async function getHealthDashboardSummary(stats: any) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatlah ringkasan eksekutif singkat (max 300 kata) tentang status kesehatan anak berdasarkan statistik ini: ${JSON.stringify(stats)}. Fokus pada area kritis.`,
    config: {
      temperature: 0.5
    }
  });
  return response.text;
}
