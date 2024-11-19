import { Stack, useRouter } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";

import CustomHeader from "../Components/CustomHeader";
import Colors from "@/constants/Colors";

export const unstable_settings = {
  initialRouteName: "login", // Set 'login' as the initial route
};

export default function RootLayoutNav() {
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "true") {
          console.log("No active session found. Redirecting to login...");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        router.replace("/login");
      }
    };
    checkUserSession();
  }, []);

  
  

  return (
    <BottomSheetModalProvider>
      <Stack>
        {/* Login Screen */}
        <Stack.Screen
          name="login"
          options={{
            headerShown: false, // Hide header for login
          }}
        />

        {/* Signup Screen */}
        <Stack.Screen
          name="signup"
          options={{
            headerTitle: "Sign Up",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="userDetails"
          options={{
            headerTitle: "User Details",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#FFD700",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Main Index Screen */}
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />

        {/* Filter Modal */}
        <Stack.Screen
          name="(modal)/filter"
          options={{
            presentation: "modal",
            headerTitle: "Filter",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Location Modal */}
        <Stack.Screen
          name="(modal)/location"
          options={{
            presentation: "fullScreenModal",
            headerTitle: "Select Location",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="close-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Dish Modal */}
        <Stack.Screen
          name="(modal)/dish"
          options={{
            presentation: "modal",
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "#fff",
                  padding: 6,
                  borderRadius: 20,
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Basket Screen */}
        <Stack.Screen
          name="basket"
          options={{
            headerTitle: "Cart",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={30} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
