import { Color } from '../types';

// --- Color Conversion Utilities ---

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  let r, g, b;
  h /= 360;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => ('0' + Math.round(c).toString(16)).slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

// --- Palette Generation Logic ---

type Scheme = 'analogous' | 'monochromatic' | 'triadic' | 'complementary';

const generateHarmoniousColor = (baseHue: number, scheme: Scheme, index: number, total: number) => {
    let h = baseHue;
    switch(scheme) {
        case 'analogous':
            h = (baseHue + 30 * (index - Math.floor(total / 2))) % 360;
            break;
        case 'monochromatic':
            // Hue is the same, saturation and lightness will be varied
            break;
        case 'triadic':
            h = (baseHue + 120 * index) % 360;
            break;
        case 'complementary':
             // Creates pairs of complements and slightly adjusted hues
            h = (baseHue + 180 * (index % 2) + (Math.random() - 0.5) * 20) % 360;
            break;
    }
    if (h < 0) h += 360;

    const s = 0.45 + Math.random() * 0.5; // Saturation between 45% and 95%
    const l = (scheme === 'monochromatic') 
        ? 0.2 + (index / total) * 0.7 + (Math.random() * 0.1 - 0.05)
        : 0.3 + Math.random() * 0.5; // Lightness between 30% and 80%

    const { r, g, b } = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
};

export const generateLocalPalette = (lockedColors: string[] = []): Color[] => {
  // Map locked colors first. The first locked color (if any) is primary.
  const finalPalette: Color[] = lockedColors.map((hex, index) => ({ 
    hex, 
    isPrimary: index === 0 
  }));
  
  const numToGenerate = 5 - lockedColors.length;
  
  if (numToGenerate <= 0) {
    return finalPalette.slice(0, 5);
  }

  const baseHue = lockedColors.length > 0
    ? rgbToHsl(hexToRgb(lockedColors[0]).r, hexToRgb(lockedColors[0]).g, hexToRgb(lockedColors[0]).b).h
    : Math.random() * 360;
  
  const schemes: Scheme[] = ['analogous', 'monochromatic', 'triadic', 'complementary'];
  const chosenScheme = schemes[Math.floor(Math.random() * schemes.length)];

  const allHexCodes = new Set(lockedColors.map(c => c.toUpperCase()));

  for (let i = 0; i < numToGenerate; i++) {
    let newHex;
    let attempts = 0;
    do {
      newHex = generateHarmoniousColor(baseHue, chosenScheme, i, numToGenerate).toUpperCase();
      attempts++;
    } while (allHexCodes.has(newHex) && attempts < 20);
    
    allHexCodes.add(newHex);
    finalPalette.push({
      hex: newHex,
      // The first generated color is primary ONLY if there are no locked colors.
      isPrimary: lockedColors.length === 0 && i === 0,
    });
  }

  return finalPalette;
};