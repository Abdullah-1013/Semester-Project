import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       const storedUser = await AsyncStorage.getItem("user");
//       if (storedUser) {
//         const {
//           email: storedEmail,
//           password: storedPassword,
//           name,
//         } = JSON.parse(storedUser);
//         if (email === storedEmail && password === storedPassword) {
//           await AsyncStorage.setItem("isLoggedIn", "true");
//           alert(`Welcome back, ${name}!`);
//           router.push("/");
//         } else {
//           alert("Invalid credentials");
//         }
//       } else {
//         alert("No user found. Please sign up first.");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };



interface User {
    name: string;
    email: string;
    password: string;
  }
  

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
  
      // Check if credentials match any user
      const user: User | undefined = users.find(
        (user: User) => user.email === email && user.password === password
      );
  
      if (user) {
        // Save login session
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("currentUser", JSON.stringify(user));
        alert(`Welcome back, ${user.name}!`);
        router.push("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF8E1",
  },
  logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FF6F00",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB74D",
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  linkText: { color: "#FF6F00", marginTop: 20, textAlign: "center" },
});

export default Login;
