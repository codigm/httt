import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";
import * as Haptics from "expo-haptics";

import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/themed/atomic/ThemedView";

export const showToast = (type: string, msg: string) => {
  const updatedMsg = msg.replace("AppwriteException: ", "");
  Toast.show({
    type: type,
    text1: updatedMsg,
  });
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const getToastConfig = (theme: string): ToastConfig => ({
  success: (props) => (
    <ThemedView>
      <BaseToast
        {...props}
        style={{
          borderLeftColor: Colors[theme].success,
          backgroundColor: Colors[theme].background,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          fontFamily: "Lexend-Bold",
          color: Colors[theme].black,
        }}
      />
    </ThemedView>
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors[theme].error,
        backgroundColor: Colors[theme].background,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Lexend-Bold",
        color: Colors[theme].black,
      }}
    />
  ),
});
