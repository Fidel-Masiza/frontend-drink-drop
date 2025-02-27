import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from './CartContext';

const CartPage = ({ navigation }) => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalAmount = cart.reduce((total, item) => total + item.foodprice * item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.foodimage} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.foodname}</Text>
              <Text style={styles.cartItemPrice}>Ksh.{item.foodprice * item.quantity}/-</Text>
              <Text style={styles.cartItemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => removeFromCart(item.id)}
            >
              <Ionicons name="remove-circle" size={24} color="#ff4757" />
            </TouchableOpacity>
          </View>
        ))
      )}

      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: Ksh.{totalAmount}/-</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#555',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#777',
  },
  removeButton: {
    padding: 10,
  },
  totalContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartPage;