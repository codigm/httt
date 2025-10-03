import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Chats() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats Screen</Text>
      <Button title="Open Chat" onPress={() => router.push("/chat")} />
    </View>
  );
}
