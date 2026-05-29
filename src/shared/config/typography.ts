import type { TextStyle } from 'react-native';

/** Semantic typography variants for AppText. */
export type TextVariant =
  | 'display'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label';

export interface TypographyPreset {
  fontSize: number;
  lineHeight: number;
  fontWeight: NonNullable<TextStyle['fontWeight']>;
  letterSpacing?: number;
}

/** Base typography presets at reference width (~390pt); sizes scale via scaleFontSize. */
export const typographyVariants: Record<TextVariant, TypographyPreset> = {
  display: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
};
