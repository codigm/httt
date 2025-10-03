import React from "react";
import { FlatList, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import * as Haptics from "expo-haptics";

import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/themed/atomic/ThemedView";
import { ThemedText } from "@/components/themed/atomic/ThemedText";

const LanguageFilterSection = ({
  languages,
  studyLanguages,
  setStudyLanguages,
  motherLanguages,
  setMotherLanguages,
}) => {
  const handleStudyLanguages = (item) => {
    setStudyLanguages((prevItems) => {
      const isChecked = prevItems.some((i) => i === item.name);
      if (isChecked) {
        return prevItems.filter((i) => i !== item.name);
      } else {
        return [...prevItems, item.name];
      }
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleMotherLanguages = (item) => {
    setMotherLanguages((prevItems) => {
      const isChecked = prevItems.some((i) => i === item.name);
      if (isChecked) {
        return prevItems.filter((i) => i !== item.name);
      } else {
        return [...prevItems, item.name];
      }
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderStudyLanguageItem = ({ item }) => (
    <Pressable onPress={() => handleStudyLanguages(item)}>
      <ThemedView style={styles.item}>
        <Ionicons name={"language-outline"} style={styles.icon} />
        <ThemedView style={styles.labelContainer}>
          <ThemedText style={styles.label}>{item.name}</ThemedText>
          <ThemedText style={styles.note}>{item.nativeName}</ThemedText>
        </ThemedView>
        <ThemedView>
          <CheckBox
            checked={studyLanguages.some((i) => i === item.name)}
            onPress={() => handleStudyLanguages(item)}
            size={30}
            checkedColor={Colors.light.primary}
            uncheckedColor={Colors.light.gray4}
          />
        </ThemedView>
      </ThemedView>
    </Pressable>
  );

  const renderMotherLanguageItem = ({ item }) => (
    <Pressable onPress={() => handleMotherLanguages(item)}>
      <ThemedView style={styles.item}>
        <Ionicons name={"language-outline"} style={styles.icon} />
        <ThemedView style={styles.labelContainer}>
          <ThemedText style={styles.label}>{item.name}</ThemedText>
          <ThemedText style={styles.note}>{item.nativeName}</ThemedText>
        </ThemedView>
        <ThemedView>
          <CheckBox
            checked={motherLanguages.some((i) => i === item.name)}
            onPress={() => handleMotherLanguages(item)}
            size={30}
            checkedColor={Colors.light.primary}
            uncheckedColor={Colors.light.gray4}
          />
        </ThemedView>
      </ThemedView>
    </Pressable>
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>Study Language</ThemedText>
          <ThemedText style={styles.cardSubtitle}>
            Filter by Study Languages
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.cardContent}>
          <FlatList
            data={languages}
            renderItem={renderStudyLanguageItem}
            keyExtractor={(item) => item.$id}
          />
        </ThemedView>
        <ThemedView style={styles.cardHeader}>
          <ThemedText style={styles.cardTitle}>Mother Language</ThemedText>
          <ThemedText style={styles.cardSubtitle}>
            Filter by Native Languages
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.cardContent}>
          <FlatList
            data={languages}
            renderItem={renderMotherLanguageItem}
            keyExtractor={(item) => item.$id}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default LanguageFilterSection;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
  },
  cardHeader: {
    padding: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: "Lexend-Bold",
  },
  cardSubtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  cardContent: {
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 20,
    color: Colors.light.primary,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  note: {
    fontFamily: "NotoSans-Regular",
    fontSize: 14,
    color: Colors.light.gray3,
  },
});
