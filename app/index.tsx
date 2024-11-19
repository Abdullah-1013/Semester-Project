import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Categories from '@/Components/Categories';
import Restaurants from '@/Components/Restaurants';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

const Page = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Categories section should be visible at the top */}
        <Categories />

        <Text style={styles.header}>Top Picks</Text>
        <Restaurants />

        <Text style={styles.header}>Weekend Offers</Text>
        <Restaurants />

        <Text style={styles.header}>Weekend Offers</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures SafeAreaView takes up the full screen
    backgroundColor: Colors.lightGrey,
  },
  scrollContent: {
    paddingBottom: 20, // Adds space at the bottom to prevent content from being cut off
    paddingTop: 90, // Add padding at the top to ensure content isn't hidden behind status bar
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
});

export default Page;
