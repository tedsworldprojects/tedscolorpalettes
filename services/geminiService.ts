import { GoogleGenAI, Type } from '@google/genai';
import { Color, PaletteResponse } from '../types';

// The API key is injected by the environment, so we pass it directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        palette: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    hex: { 
                        type: Type.STRING,
                        description: "The hexadecimal color code, starting with #."
                    },
                    isPrimary: { 
                        type: Type.BOOLEAN,
                        description: "Indicates if this is the primary color of the palette."
                    },
                },
                required: ['hex', 'isPrimary'],
            },
        },
    },
    required: ['palette'],
};

const systemInstruction = `You are the 'Coolors Palette Engine,' an ultra-fast, expert color theorist and generator. Your sole function is to instantly generate beautiful, harmonious five-color palettes. You must respond exclusively with a JSON object containing a single key, 'palette', which holds an array of exactly five color objects. Each object requires two keys: 'hex' (a string for the HEX code, e.g., #1A2B3C) and 'isPrimary' (a boolean). All five colors must be aesthetically pleasing, visually distinct, and form a harmonious color scheme (e.g., complementary, triadic, analogous, monochromatic). Exactly one color must be marked as isPrimary: true. If the user provides locked colors, they must be included in the final palette, and the remaining colors must be chosen to complement them beautifully. Do not include the locked colors in your response if the user provides an empty list of locked colors.`;

export const generatePalette = async (lockedColors: string[]): Promise<Color[]> => {
  try {
    const prompt = `Generate a new palette. ${
      lockedColors.length > 0 ? `locked: ${lockedColors.join(', ')}` : ''
    }`.trim();
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse: PaletteResponse = JSON.parse(jsonText);

    if (!parsedResponse.palette || parsedResponse.palette.length !== 5) {
        throw new Error('API returned an invalid palette structure.');
    }
    
    return parsedResponse.palette;
  } catch (error) {
    console.error('Error generating palette:', error);
    throw new Error('Failed to generate palette. Please try again.');
  }
};