import { Text as NativeText, StyleSheet, Platform } from 'react-native';

import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main
    }),
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.textWhite
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backGorundColor: {
    color: theme.colors.background,
  },
  lengBackgorund: {
    backgroundColor: theme.colors.lengBackgorund,
  },
  rating: {
    color: theme.colors.lengBackgorund,
  },
  smoothAng: {
    borderRadius: theme.borderR.radius,
  },
  paddi: {
    padding: theme.pad.value,
  },
  form: {
    fontSize: theme.fontSizes.form,
  },
  error: {
    color: theme.colors.error,
  },
});

const Text = ({rating, error, pad, borders ,backLen ,color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'background' && styles.backGorundColor,
    color === 'textWhite' && styles.colorWhite,
    backLen === 'lengBack' && styles.lengBackgorund,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    borders === 'smooth' && styles.smoothAng,
    pad === 'active' && styles.paddi,
    error === 'error' && styles.error,
    rating === 'on' && styles.rating,

    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;