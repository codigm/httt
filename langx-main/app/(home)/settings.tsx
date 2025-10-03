import React, { useState } from "react";
import { FlatList, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { logout } from "@/services/authService";
import { setAuthInitialState } from "@/store/authSlice";
import { ThemedView } from "@/components/themed/atomic/ThemedView";
import { ThemedText } from "@/components/themed/atomic/ThemedText";
import { defaultStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BoxedIcon from "@/components/BoxedIcon";
import { showToast } from "@/constants/toast";

const Settings = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const devices = [
    {
      name: "Broadcast Lists",
      icon: "megaphone",
      backgroundColor: Colors.light.success,
    },
    {
      name: "Starred Messages",
      icon: "star",
      backgroundColor: Colors.light.primary,
    },
    {
      name: "Linked Devices",
      icon: "laptop-outline",
      backgroundColor: Colors.light.success,
    },
  ];

  const items = [
    {
      name: "Account",
      icon: "key",
      backgroundColor: Colors.light.primary,
    },
    {
      name: "Privacy",
      icon: "lock-closed",
      backgroundColor: "#33A5D1",
    },
    {
      name: "Chats",
      icon: "logo-whatsapp",
      backgroundColor: Colors.light.success,
    },
    {
      name: "Notifications",
      icon: "notifications",
      backgroundColor: Colors.light.error,
    },
    {
      name: "Storage and Data",
      icon: "repeat",
      backgroundColor: Colors.light.success,
    },
  ];

  const support = [
    {
      name: "Help",
      icon: "information",
      backgroundColor: Colors.light.primary,
    },
    {
      name: "Tell a Friend",
      icon: "heart",
      backgroundColor: Colors.light.error,
    },
  ];

  const onPressLogout = async () => {
    setSubmitting(true);
    try {
      await logout();
      dispatch(setAuthInitialState());
      showToast("success", "Logged out");
      console.log("logged out");
      router.replace("/(auth)/login");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ThemedView style={defaultStyles.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <ThemedView style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <ThemedView style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />

                <ThemedText style={{ fontSize: 18, flex: 1 }}>
                  {item.name}
                </ThemedText>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.light.gray3}
                />
              </ThemedView>
            )}
          />
        </ThemedView>

        <ThemedView style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <ThemedView style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <ThemedView style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />

                <ThemedText style={{ fontSize: 18, flex: 1 }}>
                  {item.name}
                </ThemedText>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.light.gray3}
                />
              </ThemedView>
            )}
          />
        </ThemedView>

        <ThemedView style={defaultStyles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <ThemedView style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <ThemedView style={defaultStyles.item}>
                <BoxedIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />

                <ThemedText style={{ fontSize: 18, flex: 1 }}>
                  {item.name}
                </ThemedText>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.light.gray3}
                />
              </ThemedView>
            )}
          />
        </ThemedView>

        <Pressable onPress={onPressLogout}>
          <ThemedText
            style={{
              fontSize: 18,
              textAlign: "center",
              paddingVertical: 14,
            }}
          >
            Log Out
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
};

export default Settings;
