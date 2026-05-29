/** Semantic text color tokens for AppText and other UI copy. */
export type TextColorToken =
  | 'primary'
  | 'secondary'
  | 'inverse'
  | 'error'
  | 'success'
  | 'warning'
  | 'disabled';

/** Central palette for text glyph colors; edit here for app-wide text color changes. */
export const textColors: Record<TextColorToken, string> = {
  primary: '#111827',
  secondary: '#6B7280',
  inverse: '#F9FAFB',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
  disabled: '#9CA3AF',
};
