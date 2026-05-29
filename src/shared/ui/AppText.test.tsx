import { render, screen } from '@testing-library/react-native';
import { Dimensions, PixelRatio, StyleSheet, useWindowDimensions } from 'react-native';
import type { TextStyle } from 'react-native';

import { textColors, type TextColorToken } from '@/shared/config/colors';
import {
  typographyVariants,
  type TextVariant,
} from '@/shared/config/typography';
import { scaleFontSize } from '@/shared/lib/scaleFontSize';

import { AppText } from './AppText';

const VARIANTS: TextVariant[] = [
  'display',
  'title',
  'subtitle',
  'body',
  'caption',
  'label',
];

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

const getFlatStyle = (testID: string): TextStyle => {
  const node = screen.getByTestId(testID);
  const style = node.props['style'] as TextStyle | TextStyle[] | undefined;

  return flattenStyle(style);
};

const getScaledBodyFontSize = (windowWidth: number): number =>
  scaleFontSize(
    typographyVariants.body.fontSize,
    windowWidth,
    PixelRatio.getFontScale(),
  );

const setWindowDimensions = (width: number, height = 800): void => {
  const window = { width, height, scale: 2, fontScale: 1 };
  Dimensions.set({ window, screen: window });
};

describe('AppText', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders children with default body variant and primary color', () => {
    const TestHarness = () => {
      const { width } = useWindowDimensions();
      const expectedFontSize = getScaledBodyFontSize(width);

      return (
        <>
          <AppText testID="app-text">Hello</AppText>
          <AppText testID="expected-size" variant="body">
            {String(expectedFontSize)}
          </AppText>
        </>
      );
    };

    render(<TestHarness />);

    const node = screen.getByTestId('app-text');
    const flatStyle = getFlatStyle('app-text');
    const expectedFontSize = Number(
      screen.getByTestId('expected-size').props['children'],
    );

    expect(screen.getByText('Hello')).toBeOnTheScreen();
    expect(flatStyle.color).toBe(textColors.primary);
    expect(flatStyle.fontSize).toBe(expectedFontSize);
    expect(node.props['allowFontScaling']).toBe(false);
  });

  it('preserves typography hierarchy across all variants', () => {
    render(
      <>
        {VARIANTS.map((variant) => (
          <AppText key={variant} testID={`variant-${variant}`} variant={variant}>
            {variant}
          </AppText>
        ))}
      </>,
    );

    const sizes = VARIANTS.map(
      (variant) => getFlatStyle(`variant-${variant}`).fontSize ?? 0,
    );

    for (let index = 0; index < sizes.length - 1; index += 1) {
      expect(sizes[index]).toBeGreaterThan(sizes[index + 1] ?? 0);
    }
  });

  it('applies distinct styles for title and caption variants', () => {
    render(
      <>
        <AppText testID="title-text" variant="title">
          Title
        </AppText>
        <AppText testID="caption-text" variant="caption">
          Caption
        </AppText>
      </>,
    );

    const titleFlat = getFlatStyle('title-text');
    const captionFlat = getFlatStyle('caption-text');

    expect(titleFlat.fontSize ?? 0).toBeGreaterThan(captionFlat.fontSize ?? 0);
    expect(titleFlat.fontWeight).toBe(typographyVariants.title.fontWeight);
  });

  it.each(Object.entries(textColors) as [TextColorToken, string][])(
    'resolves %s color token',
    (token, hex) => {
      render(
        <AppText testID="colored-text" color={token}>
          {token}
        </AppText>,
      );

      expect(getFlatStyle('colored-text').color).toBe(hex);
    },
  );

  it('falls back to body and primary for invalid variant and color in dev', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    const TestHarness = () => {
      const { width } = useWindowDimensions();
      const expectedFontSize = getScaledBodyFontSize(width);

      return (
        <>
          <AppText
            testID="fallback-text"
            variant={'unknown' as never}
            color={'unknown' as never}
          >
            Fallback
          </AppText>
          <AppText testID="expected-size" variant="body">
            {String(expectedFontSize)}
          </AppText>
        </>
      );
    };

    render(<TestHarness />);

    const flatStyle = getFlatStyle('fallback-text');
    const expectedFontSize = Number(
      screen.getByTestId('expected-size').props['children'],
    );

    expect(flatStyle.color).toBe(textColors.primary);
    expect(flatStyle.fontSize).toBe(expectedFontSize);

    if (__DEV__) {
      expect(warnSpy).toHaveBeenCalled();
    }

    warnSpy.mockRestore();
  });

  it('forwards testID to the underlying Text', () => {
    render(<AppText testID="welcome-label">Hi</AppText>);

    expect(screen.getByTestId('welcome-label')).toBeOnTheScreen();
  });

  it('forwards standard Text props such as numberOfLines and accessibilityLabel', () => {
    render(
      <AppText
        testID="accessible-text"
        numberOfLines={1}
        accessibilityLabel="Greeting"
      >
        Hi
      </AppText>,
    );

    const node = screen.getByTestId('accessible-text');

    expect(node.props['numberOfLines']).toBe(1);
    expect(node.props['accessibilityLabel']).toBe('Greeting');
  });

  it('merges custom style after preset styles', () => {
    render(
      <AppText testID="custom-style" style={testStyles.styleOverride}>
        Hi
      </AppText>,
    );

    const flatStyle = getFlatStyle('custom-style');

    expect(flatStyle.textAlign).toBe('center');
    expect(flatStyle.color).toBe('#ABCDEF');
  });

  it('scales font size up on wider viewports', () => {
    jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(1);

    setWindowDimensions(320);
    const { unmount } = render(<AppText testID="narrow-text">Narrow</AppText>);
    const narrowSize = getFlatStyle('narrow-text').fontSize;
    unmount();

    setWindowDimensions(768);
    render(<AppText testID="wide-text">Wide</AppText>);
    const wideSize = getFlatStyle('wide-text').fontSize;

    expect(wideSize).toBeGreaterThan(narrowSize ?? 0);
    expect(wideSize).toBe(
      scaleFontSize(typographyVariants.body.fontSize, 768, 1),
    );
    expect(narrowSize).toBe(
      scaleFontSize(typographyVariants.body.fontSize, 320, 1),
    );
  });

  it('applies system font scale to rendered size', () => {
    const FontScaleHarness = () => {
      const { width } = useWindowDimensions();
      const expectedSize = scaleFontSize(
        typographyVariants.body.fontSize,
        width,
        PixelRatio.getFontScale(),
      );

      return (
        <>
          <AppText testID="scaled-text">Hi</AppText>
          <AppText testID="expected-size">{String(expectedSize)}</AppText>
        </>
      );
    };

    setWindowDimensions(390);
    jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(1);

    const { unmount } = render(<FontScaleHarness />);
    const unitSize = getFlatStyle('scaled-text').fontSize;
    const unitExpected = Number(
      screen.getByTestId('expected-size').props['children'],
    );
    expect(unitSize).toBe(unitExpected);
    unmount();

    jest.spyOn(PixelRatio, 'getFontScale').mockReturnValue(2);
    render(<FontScaleHarness />);
    const scaledSize = getFlatStyle('scaled-text').fontSize;
    const scaledExpected = Number(
      screen.getByTestId('expected-size').props['children'],
    );

    expect(scaledSize).toBe(scaledExpected);
    expect(scaledSize).toBe(scaleFontSize(typographyVariants.body.fontSize, 390, 2));
    expect(scaledSize).toBeGreaterThan(unitExpected);
  });

  it('renders empty children without crashing', () => {
    render(<AppText testID="empty-text" />);

    expect(screen.getByTestId('empty-text')).toBeOnTheScreen();
  });
});

const testStyles = StyleSheet.create({
  styleOverride: {
    textAlign: 'center',
    color: '#ABCDEF',
  },
});
