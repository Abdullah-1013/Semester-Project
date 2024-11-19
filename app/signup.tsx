import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

//   const handleSignup = async () => {
//     if (name && password) {
//       try {
//         // Save user details in AsyncStorage
//         await AsyncStorage.setItem(
//           "user",
//           JSON.stringify({ name, password, email })
//         );
//         alert("Signup successful!");
//         router.replace("/login"); // Navigate to login page after signup
//       } catch (error) {
//         console.error("Error saving user data:", error);
//       }
//     } else {
//       alert("Please enter both username and password");
//     }
//   };

interface User {
    name: string;
    email: string;
    password: string;
  }

  
  const handleSignup = async () => {
    if (name && email && password) {
      try {
        // Retrieve existing users from AsyncStorage
        const storedUsers = await AsyncStorage.getItem("users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
  
        // Check if email is already registered
        if (users.some((user: User) => user.email === email)) {
          alert("Email already registered. Please login.");
          return;
        }
  
        // Add new user to the list
        const newUser: User = { name, email, password };
        users.push(newUser);
  
        // Save updated users list back to AsyncStorage
        await AsyncStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful!");
        router.replace("/login");
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Account</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
});

export default Signup;
