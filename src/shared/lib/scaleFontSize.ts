import { PixelRatio } from 'react-native';

const REFERENCE_WIDTH = 390;
const MIN_WIDTH_FACTOR = 0.85;
const MAX_WIDTH_FACTOR = 1.15;
const MAX_FONT_SCALE = 2;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Scales a base font size for screen width and system font scale.
 * widthFactor = clamp(windowWidth / 390, 0.85, 1.15)
 * result = round(baseSize * widthFactor * min(fontScale, 2))
 */
export const scaleFontSize = (
  baseSize: number,
  windowWidth: number,
  fontScale?: number,
): number => {
  const widthFactor = clamp(
    windowWidth / REFERENCE_WIDTH,
    MIN_WIDTH_FACTOR,
    MAX_WIDTH_FACTOR,
  );
  const effectiveFontScale = Math.min(
    fontScale ?? PixelRatio.getFontScale(),
    MAX_FONT_SCALE,
  );

  return Math.round(baseSize * widthFactor * effectiveFontScale);
};
