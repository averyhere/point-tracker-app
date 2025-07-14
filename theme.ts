import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const colors = {
  white: "#ffffff",
  black: "#171717",
  pink: "#F184D5",
  blue: "#66C7F1",
  purple: "#ACA6E3",
  brightPurple: "#A41EF1",
};

export const DarkTheme: typeof MD3DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.blue,
    primaryContainer: colors.black,
    secondary: colors.pink,
    secondaryContainer: colors.black,
    tertiary: colors.brightPurple,
    tertiaryContainer: colors.black,
    // surface: string;
    // surfaceVariant: string;
    // surfaceDisabled: string;
    background: colors.black,
    // error: string;
    // errorContainer: string;
    // onPrimary: string;
    // onPrimaryContainer: string;
    // onSecondary: string;
    // onSecondaryContainer: string;
    // onTertiary: string;
    // onTertiaryContainer: string;
    // onSurface: string;
    // onSurfaceVariant: string;
    // onSurfaceDisabled: string;
    // onError: string;
    // onErrorContainer: string;
    // onBackground: string;
    // outline: string;
    // outlineVariant: string;
    // inverseSurface: string;
    // inverseOnSurface: string;
    // inversePrimary: string;
    // shadow: string;
    // scrim: string;
    // backdrop: string;
    // elevation: MD3ElevationColors;
  },
};

export const LightTheme: typeof MD3DarkTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.brightPurple,
    primaryContainer: colors.white,
    secondary: colors.pink,
    secondaryContainer: colors.white,
    tertiary: colors.blue,
    tertiaryContainer: colors.purple,
    // surface: string;
    // surfaceVariant: string;
    // surfaceDisabled: string;
    background: colors.white,
    // error: string;
    // errorContainer: string;
    // onPrimary: string;
    // onPrimaryContainer: string;
    // onSecondary: string;
    // onSecondaryContainer: string;
    // onTertiary: string;
    // onTertiaryContainer: string;
    // onSurface: string;
    // onSurfaceVariant: string;
    // onSurfaceDisabled: string;
    // onError: string;
    // onErrorContainer: string;
    // onBackground: string;
    // outline: string;
    // outlineVariant: string;
    // inverseSurface: string;
    // inverseOnSurface: string;
    // inversePrimary: string;
    // shadow: string;
    // scrim: string;
    // backdrop: string;
    // elevation: MD3ElevationColors;
  },
};
