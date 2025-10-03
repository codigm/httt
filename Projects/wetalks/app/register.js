import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  // ✅ Real-time username availability check
  const checkUsername = async (value) => {
    setUsername(value);
    if (value.length > 2) {
      const snap = await getDoc(doc(db, "usernames", value));
      setUsernameAvailable(!snap.exists());
    } else {
      setUsernameAvailable(true);
    }
  };

  const handleRegister = async () => {
    if (!name || !username || !birthday || !gender || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!usernameAvailable) {
      Alert.alert("Error", "This username is already taken.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Save username mapping
      await setDoc(doc(db, "usernames", username), { uid: user.uid });

      // ✅ Save user profile
      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        birthday: new Date(birthday), // stored as Date
        gender,
        email,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      const errorMap = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Please enter a valid email.",
        "auth/weak-password": "Password should be at least 6 characters.",
      };
      Alert.alert("Registration Error", errorMap[error.code] || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={username}
        onChangeText={checkUsername}
      />
      {username.length > 2 && (
        <Text style={{ color: usernameAvailable ? "green" : "red" }}>
          {usernameAvailable ? "✔ Available" : "❌ Taken"}
        </Text>
      )}

      {/* Birthday */}
      <TextInput
        style={styles.input}
        placeholder="Birthday (YYYY-MM-DD)"
        placeholderTextColor="#999"
        value={birthday}
        onChangeText={setBirthday}
      />

      {/* Gender */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === "Male" && styles.genderSelected,
          ]}
          onPress={() => setGender("Male")}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === "Female" && styles.genderSelected,
          ]}
          onPress={() => setGender("Female")}
        >
          <Text>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderOption,
            gender === "Other" && styles.genderSelected,
          ]}
          onPress={() => setGender("Other")}
        >
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.toggleButton}
        >
          <Text>{secureText ? "Show" : "Hide"}</Text>
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      {/* Login Redirect */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ====================
// STYLES
// ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 30,
    resizeMode: "contain",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  genderOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  genderSelected: {
    borderColor: "#007BFF",
    backgroundColor: "#E6F0FF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleButton: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    marginTop: 15,
    color: "#007BFF",
  },
});
