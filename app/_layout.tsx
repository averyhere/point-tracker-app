import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "@/theme";
import { BottomNavigation, PaperProvider } from "react-native-paper";
import "@/assets/global.css";

import HomeRoute from "./index";
import SettingsRoute from "./settings";

const RootLayout = () => {
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
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          compact
        />
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default RootLayout;
