
/**
 * Calculates whether black or white text is more readable against a given hex color.
 * @param hex - The hex color string (e.g., "#RRGGBB").
 * @returns 'black' or 'white' as a string.
 */
export const getContrastingTextColor = (hex: string): string => {
  if (!hex) return 'white';

  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Formula for luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? 'black' : 'white';
};
