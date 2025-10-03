import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null; // wait until font is loaded
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* Splash Screen */}
        <Stack.Screen name="Splash" />

        {/* Auth Screens */}
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />

        {/* Main App Tabs */}
        <Stack.Screen name="(tabs)" />

        {/* Extra Screens */}
        <Stack.Screen name="chat" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
