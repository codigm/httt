import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function SplashScreen() {
  const router = useRouter();
  const [checked, setChecked] = useState(false); // Firebase check done
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Start listening to Firebase
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecked(true);
    });

    // 2. Cleanup
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!checked) return;

    // Always wait at least 3 seconds before moving
    const timer = setTimeout(() => {
      if (user) {
        router.replace("/(tabs)/chats"); // logged in
      } else {
        router.replace("/login"); // not logged in
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [checked, user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>WeTalks</Text>
      <Text style={styles.subtitle}>A Chatting APP</Text>
      <ActivityIndicator
        size="large"
        color="#007AFF"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 36, fontWeight: "bold", color: "#6C2DBA" },
  subtitle: { fontSize: 18, color: "#8E44AD", marginTop: 5 },
});
