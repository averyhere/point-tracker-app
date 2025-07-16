import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme, colors } from "@/theme";
import {
  BottomNavigation,
  PaperProvider,
  IconButton,
} from "react-native-paper";
import { useRouter } from "expo-router";
import "@/assets/global.css";
import { Stack } from "expo-router";

import HomeRoute from "./index";
import SettingsRoute from "./settings";

const RootLayout = () => {
  const router = useRouter();

  // Handle scene routing
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "index",
      title: "Leaderboard",
      focusedIcon: "account-group",
      unfocusedIcon: "account-group-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    index: HomeRoute,
    settings: SettingsRoute,
  });

  // Handle color scheme and theme
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            navigationBarColor: paperTheme.colors.background,
            navigationBarHidden: false,
            headerRight: () => (
              <IconButton
                onPress={() => router.navigate("/settings")}
                icon="cog"
              />
            ),
            headerBlurEffect: "regular",
            headerTransparent: true,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTintColor: paperTheme.colors.primary,
            contentStyle: {
              backgroundColor: paperTheme.colors.background,
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: "Scoreboard" }} />
          <Stack.Screen
            name="settings/index"
            options={{
              title: "Settings",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default RootLayout;
