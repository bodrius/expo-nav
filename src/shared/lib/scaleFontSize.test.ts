import { PixelRatio } from 'react-native';

import { scaleFontSize } from './scaleFontSize';

describe('scaleFontSize', () => {
  it('returns base size at reference width and unit font scale', () => {
    expect(scaleFontSize(16, 390, 1)).toBe(16);
  });

  it('returns a larger size when font scale is above 1', () => {
    expect(scaleFontSize(16, 390, 2)).toBeGreaterThan(scaleFontSize(16, 390, 1));
  });

  it('applies minimum width factor below reference width', () => {
    expect(scaleFontSize(16, 320, 1)).toBe(14);
  });

  it('applies maximum width factor above reference width', () => {
    expect(scaleFontSize(16, 768, 1)).toBe(18);
  });

  it('scales smoothly at a large-phone width between reference and tablet', () => {
    expect(scaleFontSize(16, 428, 1)).toBe(18);
  });

  it('caps system font scale at 2', () => {
    jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(3);

    expect(scaleFontSize(16, 390)).toBe(32);

    jest.restoreAllMocks();
  });

  it('uses explicit fontScale when provided', () => {
    expect(scaleFontSize(16, 390, 1.5)).toBe(24);
  });
});
