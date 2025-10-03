import { StyleSheet, ImageBackground, Pressable } from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import { ThemedView } from "@/components/themed/atomic/ThemedView";
import { ThemedText } from "@/components/themed/atomic/ThemedText";

import { useDatabase } from "@/hooks/useDatabase";
import { getUserImage } from "@/services/bucketService";
import { onlineStatus, getFlagEmoji2 } from "@/constants/utils";
import { Language } from "@/models/Language";

const UserCard = ({ item }) => {
  const [userImageUrl, setUserImageUrl] = useState("");
  const { data, loading, refetch } = useDatabase(() =>
    getUserImage(item.profilePic)
  );

  useEffect(() => {
    if (data) {
      try {
        setUserImageUrl(data.toString());
      } catch (error) {
        console.error("Failed to process user image URL", error);
      }
    }
  }, [data]);

  const getStudyLanguages = () => {
    let studyLanguages = item.languages
      .filter((language: Language) => !language.motherLanguage)
      .map((language: Language) => language.code);
    const flags = studyLanguages.map((lang: string) => getFlagEmoji2(lang));
    return flags.join(" ");
  };

  const getMotherLanguages = () => {
    let motherLanguages = item.languages
      .filter((language: Language) => language.motherLanguage)
      .map((language: Language) => language.code);
    const flags = motherLanguages.map((lang: string) => getFlagEmoji2(lang));
    return flags.join(" ");
  };

  const renderStatusEmoji = () => {
    const status = onlineStatus(item.lastSeen);
    if (status === "online") return "🟢";
    if (status === "away") return "🟡";
    if (status === "offline") return "🟠";
    return "🔴";
  };

  if (loading) {
    return (
      <ThemedView style={styles.card}>
        <ThemedView style={styles.loading}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <Pressable
      onPress={() => router.push(item?.username)}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ImageBackground
        source={{ uri: userImageUrl }}
        style={styles.card}
        resizeMode="cover"
        imageStyle={styles.imageBackground}
      >
        <ThemedView style={styles.emojiIndicator}>
          <ThemedText style={{ fontSize: 10 }}>
            {renderStatusEmoji()}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={{
            opacity: 0.8,
            padding: 8,
            alignItems: "center",
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}
        >
          <ThemedText style={{ fontSize: 14, fontWeight: "bold", opacity: 1 }}>
            {item.name}
          </ThemedText>
          <ThemedText style={{ fontSize: 10 }}>
            Studies: {getStudyLanguages()}
          </ThemedText>
          <ThemedText style={{ fontSize: 10 }}>
            Speaks: {getMotherLanguages()}
          </ThemedText>
        </ThemedView>
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 200,
    width: 150,
    justifyContent: "flex-end",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiIndicator: {
    position: "absolute",
    backgroundColor: "transparent",
    top: 5,
    left: 10,
    zIndex: 2,
  },
});

export default UserCard;
