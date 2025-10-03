import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => router.replace("/login")} />
    </View>
  );
}
