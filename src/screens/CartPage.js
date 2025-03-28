import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { colors } from '../globals/style';

const CartPage = ({ route, navigation }) => {
  const { cart: initialCart, storeId } = route.params;
  const [cart, setCart] = useState(initialCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get user_type from Home screen navigation params
  const user_type = navigation.getState().routes.find(
    route => route.name === 'Home'
  )?.params?.user_type; 

  const username = navigation.getState().routes.find(
    route => route.name === 'Home'
  )?.params?.username;



  const handleQuantityChange = (item, quantityChange) => {
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
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price_usd * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (user_type !== 'customer') {
      Alert.alert('Error', 'Only customers can place orders');
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderData = {
        user_type: user_type,
        store_id: storeId,
        username: username,
        total_amount: calculateTotal(),
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price_usd
        }))
      };

      const response = await fetch('http://127.0.0.1:8000/drinks/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

     // In CartPage.js, modify the success handler:
         // In CartPage.js, modify the success handler:
if (response.ok) {
  Alert.alert('Success', 'Order placed successfully');
  setCart([]);
  navigation.navigate('MyOrders', { username: username }); // Modified this line
} else 
     {
        throw new Error(data.error || 'Failed to place order');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price_usd}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleQuantityChange(item, -1)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(item, 1)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
      </View>

      <TouchableOpacity 
        style={[styles.checkoutButton, isSubmitting && styles.disabledButton]} 
        onPress={handleCheckout}
        disabled={isSubmitting}
      >
        <Text style={styles.checkoutButtonText}>
          {isSubmitting ? 'Processing...' : 'Checkout'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.col1 },
  scrollContainer: { paddingBottom: 20 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.text2,
  },
  itemName: { fontSize: 16, color: colors.text3 },
  itemPrice: { fontSize: 16, color: colors.text1 },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: { fontSize: 20, color: colors.text1, marginHorizontal: 10 },
  quantity: { fontSize: 16, color: colors.text1 },
  totalContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.text2,
  },
  totalText: { fontSize: 18, fontWeight: 'bold', color: colors.text1 },
  checkoutButton: {
    backgroundColor: colors.col2,
    padding: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.text2,
  },
  checkoutButtonText: { color: colors.text1, fontSize: 18 },
});

export default CartPage;