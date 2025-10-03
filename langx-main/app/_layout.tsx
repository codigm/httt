import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { Provider, useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import store, { RootState, AppDispatch } from "@/store/store";
import { fetchAuthData } from "@/store/authSlice";
import { fonts } from "@/constants/fonts";
import { getToastConfig } from "@/constants/toast";
import { useColorScheme } from "@/hooks/useColorScheme";
import usePlausible from "@/hooks/usePlausible";
import { ThemedText } from "@/components/themed/atomic/ThemedText";
import { ThemedView } from "@/components/themed/atomic/ThemedView";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const StackLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const segments = useSegments();
  const router = useRouter();
  usePlausible();

  // Selectors
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.isLoading) {
      // TODO: We may add this check to (auth) layout
      if (segments.length === (0 as number)) {
        if (authState.session) {
          if (!authState.user) {
            router.replace("/complete");
          } else {
            router.replace("/(home)");
          }
        }
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 500);
      }
    }
  }, [
    authState.isLoggedIn,
    authState.isGuestIn,
    authState.isLoading,
    authState.user,
  ]);

  useEffect(() => {
    dispatch(fetchAuthData());
  }, [dispatch]);

  // Debugging useSegments
  useEffect(() => {
    console.log("[SEGMENT] ", segments);
  }, [segments]);

  if (authState.isLoading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText style={{ fontSize: 26 }}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen name="complete" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerBackTitle: "Back" }} />
    </Stack>
  );
};

export default function RootLayout() {
  const theme = useColorScheme() ?? "light";
  const [fontsLoaded, error] = useFonts(fonts);

  const toastConfig = getToastConfig(theme);

  useEffect(() => {
    if (fontsLoaded) {
      // console.log("Fonts loaded");
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
        <StackLayout />
        <Toast config={toastConfig} />
      </ThemeProvider>
    </Provider>
  );
}
