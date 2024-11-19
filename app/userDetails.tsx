import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
  email: string;
  password: string;
};

const userDetails = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedUser) {
//           setUser(JSON.parse(storedUser) as User);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);


useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await AsyncStorage.getItem("currentUser");
        if (currentUser) {
          setUser(JSON.parse(currentUser));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  
//   const handleLogout = async () => {
//   try {
//     await AsyncStorage.setItem('isLoggedIn', 'false'); // Set session flag to false
//     alert('You have been logged out.');
//     router.replace('/login'); // Redirect to login screen
//   } catch (error) {
//     console.error('Logout failed:', error);
//   }
// };

const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.removeItem("currentUser"); // Clear current session
      alert("You have been logged out.");
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      {user ? (
        <View style={styles.details}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user.name}</Text>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      ) : (
        <Text>No user data available.</Text>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  details: { width: '80%', marginBottom: 40 },
  label: { fontSize: 18, color: '#333' },
  value: { fontSize: 20, fontWeight: 'bold', color: '#007BFF', marginBottom: 10 },
  logoutButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});

export default userDetails;
