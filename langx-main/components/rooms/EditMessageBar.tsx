import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: IMessage | null;
};

const EditMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  const theme = useColorScheme() === "dark" ? "dark" : "light";
  return (
    <>
      {message !== null && (
        <Animated.View
          style={{
            height: 60,
            flexDirection: "row",
            backgroundColor: Colors[theme].background,
          }}
          entering={FadeInDown}
          exiting={FadeOutDown}
        >
          <View
            style={{
              height: "100%",
              width: 6,
              backgroundColor: Colors[theme].primary,
            }}
          ></View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: Colors[theme].primary,
                paddingLeft: 10,
                paddingTop: 5,
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              Edit
            </Text>
            <Text
              style={{
                color: Colors.light.gray3,
                paddingLeft: 10,
                paddingVertical: 5,
              }}
            >
              {message!.text?.length > 40
                ? message?.text.substring(0, 40) + "..."
                : message?.text}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}
          >
            <Pressable onPress={clearReply}>
              <Ionicons
                name="close-circle-outline"
                color={Colors[theme].error}
                size={22}
              />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default EditMessageBar;
