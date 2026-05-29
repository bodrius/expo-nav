import { render, screen } from '@testing-library/react-native';
import { PixelRatio, useWindowDimensions } from 'react-native';
import type { TextStyle } from 'react-native';

import { textColors } from '@/shared/config/colors';
import { typographyVariants } from '@/shared/config/typography';
import { scaleFontSize } from '@/shared/lib/scaleFontSize';
import { AppText } from '@/shared/ui';

import { HomeScreen } from './HomeScreen';

const flattenStyle = (
  style: TextStyle | TextStyle[] | undefined,
): TextStyle => {
  if (!style) {
    return {};
  }

  if (Array.isArray(style)) {
    return style.reduce<TextStyle>((acc, item) => ({ ...acc, ...item }), {});
  }

  return style;
};

describe('HomeScreen', () => {
  it('renders the home title', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Hello Expo Navigation')).toBeOnTheScreen();
  });

  it('renders welcome title with AppText title variant and primary color', () => {
    const HomeTitleProbe = () => {
      const { width } = useWindowDimensions();
      const fontScale = PixelRatio.getFontScale();
      const expectedBodyFontSize = scaleFontSize(
        typographyVariants.body.fontSize,
        width,
        fontScale,
      );

      return (
        <>
          <HomeScreen />
          <AppText testID="expected-title-size" variant="title">
            {String(
              scaleFontSize(typographyVariants.title.fontSize, width, fontScale),
            )}
          </AppText>
          <AppText testID="expected-title-line-height" variant="title">
            {String(
              scaleFontSize(
                typographyVariants.title.lineHeight,
                width,
                fontScale,
              ),
            )}
          </AppText>
          <AppText testID="expected-body-size">{String(expectedBodyFontSize)}</AppText>
        </>
      );
    };

    render(<HomeTitleProbe />);

    const title = screen.getByTestId('home-title');
    const style = flattenStyle(title.props['style'] as TextStyle | TextStyle[]);
    const expectedFontSize = Number(
      screen.getByTestId('expected-title-size').props['children'],
    );
    const expectedLineHeight = Number(
      screen.getByTestId('expected-title-line-height').props['children'],
    );
    const expectedBodyFontSize = Number(
      screen.getByTestId('expected-body-size').props['children'],
    );

    expect(style.color).toBe(textColors.primary);
    expect(style.fontSize).toBe(expectedFontSize);
    expect(style.fontSize).toBeGreaterThan(expectedBodyFontSize);
    expect(style.lineHeight).toBe(expectedLineHeight);
    expect(screen.getByText('Hello Expo Navigation')).toBeOnTheScreen();
    expect(title.props['allowFontScaling']).toBe(false);
  });
});
