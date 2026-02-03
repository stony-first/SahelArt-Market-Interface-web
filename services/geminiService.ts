import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (
  name: string,
  category: string,
  materials: string,
  mood: string = "authentique et poétique"
): Promise<string> => {
  try {
    const prompt = `
      Tu es un expert en marketing pour l'artisanat d'art africain.
      Rédige une description courte (max 80 mots), séduisante et émotionnelle pour un produit.
      
      Produit: ${name}
      Catégorie: ${category}
      Matériaux: ${materials}
      Ton: ${mood}
      
      Mets en valeur le savoir-faire manuel et l'héritage culturel. N'utilise pas de markdown, juste du texte brut.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Description non disponible.";
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Impossible de générer la description pour le moment. Veuillez réessayer.";
  }
};

export const generateSocialPost = async (productName: string, description: string): Promise<string> => {
  try {
    const prompt = `
      À partir de la description suivante, rédige un post Instagram/Facebook engageant pour vendre ce produit artisanal.
      Utilise des emojis pertinents. Ajoute 5 hashtags populaires liés à l'artisanat africain et au fait-main.
      
      Produit: ${productName}
      Description: ${description}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Post non disponible.";
  } catch (error) {
    return "Erreur de génération du post.";
  }
};
