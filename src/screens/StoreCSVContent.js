import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../globals/style';
import ProductSlider from '../components/ProductSlider';
import BottomNav from '../components/BottomNav';

const StoreCSVContent = ({ route, navigation }) => {
  const { storeId } = route.params;
  const [extractedData, setExtractedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/drinks/stores/${storeId}/csv-content/`);
        const data = await response.json();
        setExtractedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/drinks/stores/${storeId}/filter-csv-content/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query }),
          }
        );
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error('Error filtering data:', error);
      }
    } else {
      setFilteredData([]);
    }
  };

  const handleAddToCart = (item, quantityChange) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityChange;
      if (newQuantity <= 0) {
        setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id));
      } else {
        setCart((prevCart) =>
          prevCart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
          )
        );
      }
    } else if (quantityChange > 0) {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const goToCart = () => {
    navigation.navigate('CartPage', { 
      cart, 
      storeId
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.text1} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by brand, name, or type..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredData.length > 0 && (
          <ProductSlider title="Search Results" data={filteredData} onAddToCart={handleAddToCart} cart={cart} />
        )}
        <ProductSlider title="All Products" data={extractedData} onAddToCart={handleAddToCart} cart={cart} />
      </ScrollView>

      <TouchableOpacity style={styles.cartButton} onPress={goToCart}>
        <Text style={styles.cartButtonText}>Go to Cart ({cart.length})</Text>
      </TouchableOpacity>

      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.col1 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  searchBar: {
    height: 40,
    borderColor: colors.text1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  scrollContainer: { 
    paddingBottom: 20 
  },
  bottomnav: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%' 
  },
  cartButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: colors.col2,
    padding: 10,
    borderRadius: 10,
  },
  cartButtonText: { 
    color: colors.text1, 
    fontSize: 16 
  },
});

export default StoreCSVContent;