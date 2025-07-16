import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "@/theme";
import { PaperProvider, IconButton } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import "@/assets/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  const router = useRouter();

  // Handle color scheme and theme
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
};

export default RootLayout;
