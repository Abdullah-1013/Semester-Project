import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import Colors from '@/constants/Colors';
  import { useNavigation } from 'expo-router';
  import categories from '@/assets/data/filter.json';
  import { Ionicons } from '@expo/vector-icons';
  import BouncyCheckbox from 'react-native-bouncy-checkbox';
  import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from 'react-native-reanimated';
  
  interface Category {
    name: string;
    count: number;
    checked?: boolean;
  }
  
  const ItemBox = () => (
    <>
      <View style={styles.itemBox}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="trending-up-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Sort</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.primary}
            style={{ marginLeft: 3, marginTop: 2 }}
          />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Top Rated</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.primary}
            style={{ marginLeft: 3, marginTop: 2 }}
          />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Offers</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.primary}
            style={{ marginLeft: 3, marginTop: 2 }}
          />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Dietary Restrictions</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors.primary}
            style={{ marginLeft: 3, marginTop: 2 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Categories</Text>
    </>
  );
  
  const Filter = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState<Category[]>(categories);
    const [selected, setSelected] = useState<Category[]>([]);
    const flexWidth = useSharedValue(0);
    const scale = useSharedValue(0);
  
    useEffect(() => {
      const selectedItems = items.filter((item) => item.checked);
      setSelected(selectedItems);
  
      const hasSelected = selectedItems.length > 0;
      flexWidth.value = withTiming(hasSelected ? 150 : 0);
      scale.value = withTiming(hasSelected ? 1 : 0);
    }, [items]);
  
    const clearAll = () => {
      const updatedItems = items.map((item) => ({
        ...item,
        checked: false,
      }));
      setItems(updatedItems);
    };
  
    const toggleCheck = (index: number) => {
      const updatedItems = items.map((item, idx) => {
        if (idx === index) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      setItems(updatedItems);
    };
  
    const renderItem: ListRenderItem<Category> = ({ item, index }) => (
      <View style={styles.row}>
        <Text style={styles.text}>
          {item.name} ({item.count})
        </Text>
        <BouncyCheckbox
          isChecked={item.checked}
          fillColor={Colors.primary}
          unfillColor="#fff"
          iconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2 }}
          innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2 }}
          onPress={() => toggleCheck(index)}
        />
      </View>
    );
  
    const animatedStyles = useAnimatedStyle(() => ({
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    }));
  
    const animatedText = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    return (
      <View style={styles.container}>
        <FlatList
          data={selected.length > 0 ? selected : items}
          renderItem={renderItem}
          ListHeaderComponent={<ItemBox />}
          keyExtractor={(item) => item.name}
        />
        <View style={{ height: 76 }} />
        <View style={styles.footer}>
          <View style={styles.btnContainer}>
            <Animated.View style={[animatedStyles, styles.clearBtn]}>
              <TouchableOpacity onPress={clearAll}>
                <Animated.Text style={[animatedText, styles.clearTxt]}>
                  Clear All
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
  
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.applyBtn}>
              <Text style={styles.applyTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: Colors.lightGrey,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      backgroundColor: '#fff',
      padding: 10,
      elevation: 10,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: -10,
      },
    },
    applyBtn: {
      backgroundColor: Colors.primary,
      padding: 16,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1,
      height: 56,
    },
    applyTxt: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    itemBox: {
      padding: 8,
      borderRadius: 10,
      marginBottom: 16,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 16,
    },
    item: {
      paddingLeft: 12,
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderColor: Colors.grey,
      borderBottomWidth: 1,
      borderRadius: 10,
      margin: 2,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
      borderColor: Colors.grey,
      borderBottomWidth: 1,
      borderRadius: 10,
      margin: 2,
    },
    text: {
      flex: 1,
    },
    btnContainer: {
      flexDirection: 'row',
      gap: 12,
      justifyContent: 'center',
    },
    clearBtn: {
      borderColor: Colors.primary,
      borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      height: 56,
    },
    clearTxt: {
      color: Colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  
  export default Filter;
  