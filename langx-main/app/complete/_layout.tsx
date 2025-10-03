import { Stack } from "expo-router";

export default function CompleteLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="language" options={{ headerShown: false }} />
    </Stack>
  );
}
