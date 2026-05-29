import React from 'react';
import {
  PixelRatio,
  Text,
  useWindowDimensions,
  type TextProps,
  type TextStyle,
} from 'react-native';

import { textColors, type TextColorToken } from '@/shared/config/colors';
import {
  typographyVariants,
  type TextVariant,
} from '@/shared/config/typography';
import { scaleFontSize } from '@/shared/lib/scaleFontSize';

const DEFAULT_VARIANT: TextVariant = 'body';
const DEFAULT_COLOR: TextColorToken = 'primary';

const isTextVariant = (value: string): value is TextVariant =>
  value in typographyVariants;

const isTextColorToken = (value: string): value is TextColorToken =>
  value in textColors;

const resolveVariant = (variant?: TextVariant): TextVariant => {
  if (variant === undefined) {
    return DEFAULT_VARIANT;
  }

  if (isTextVariant(variant)) {
    return variant;
  }

  if (__DEV__) {
    console.warn(
      `[AppText] Unknown variant "${variant}", falling back to "${DEFAULT_VARIANT}".`,
    );
  }

  return DEFAULT_VARIANT;
};

const resolveColor = (color?: TextColorToken): TextColorToken => {
  if (color === undefined) {
    return DEFAULT_COLOR;
  }

  if (isTextColorToken(color)) {
    return color;
  }

  if (__DEV__) {
    console.warn(
      `[AppText] Unknown color "${color}", falling back to "${DEFAULT_COLOR}".`,
    );
  }

  return DEFAULT_COLOR;
};

/** Props for adaptive semantic text with centralized typography and color tokens. */
export interface AppTextProps extends Omit<TextProps, 'allowFontScaling'> {
  /** Semantic typography preset; defaults to `body`. */
  variant?: TextVariant;
  /** Semantic text color token; defaults to `primary`. */
  color?: TextColorToken;
}

/**
 * Reusable text with variant presets, color tokens, and width- plus accessibility-aware scaling.
 */
export const AppText = React.memo(
  ({ variant, color, style, children, ...rest }: AppTextProps) => {
    const { width } = useWindowDimensions();
    const resolvedVariant = resolveVariant(variant);
    const resolvedColor = resolveColor(color);
    const preset = typographyVariants[resolvedVariant];
    const systemFontScale = PixelRatio.getFontScale();

    const scaledFontSize = scaleFontSize(preset.fontSize, width, systemFontScale);
    const scaledLineHeight = scaleFontSize(
      preset.lineHeight,
      width,
      systemFontScale,
    );

    const presetStyle: TextStyle = {
      color: textColors[resolvedColor],
      fontSize: scaledFontSize,
      lineHeight: scaledLineHeight,
      fontWeight: preset.fontWeight,
    };

    if (preset.letterSpacing !== undefined) {
      presetStyle.letterSpacing = preset.letterSpacing;
    }

    return (
      <Text allowFontScaling={false} style={[presetStyle, style]} {...rest}>
        {children}
      </Text>
    );
  },
);

AppText.displayName = 'AppText';
