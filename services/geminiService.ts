
import { GoogleGenAI, Modality } from "@google/genai";
import { Product } from '../types';

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const buildPrompt = (product: Product): string => {
  return `Perform a photorealistic, in-place texture replacement on the provided room image.
  Task: Apply the following Texturelle product to the main wall surface(s) in the image.
  Product Name: "${product.name}"
  Design Style: "${product.design}"
  Primary Color: "${product.color}"
  Material & Finish: "${product.texture}"
  
  CRITICAL INSTRUCTIONS:
  1.  Photorealism is the top priority. The result must look like a high-resolution photograph, not a digital rendering.
  2.  Perfectly match the existing perspective, shadows, and lighting of the original room image.
  3.  The applied texture must wrap realistically around corners and objects.
  4.  Preserve all original furniture, fixtures, windows, and decor. Only change the wall surface.
  5.  Avoid any flat, "pasted-on" appearance. The texture must have depth and react to the room's lighting.
  6.  The final output should be the modified image only.`;
};


export const generateVisualisation = async (
  base64ImageData: string,
  mimeType: string,
  product: Product,
  retries = MAX_RETRIES
): Promise<string> => {
  const textPrompt = buildPrompt(product);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: textPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    throw new Error("No image data found in the AI response.");
  } catch (error) {
    console.error(`API call failed. Retries left: ${retries}`, error);
    if (retries > 0) {
      const delay = INITIAL_DELAY_MS * Math.pow(2, MAX_RETRIES - retries);
      await new Promise(res => setTimeout(res, delay));
      return generateVisualisation(base64ImageData, mimeType, product, retries - 1);
    } else {
      throw new Error("Failed to generate image after multiple retries.");
    }
  }
};
