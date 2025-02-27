import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const ProductPage = ({ route, navigation }) => {
  const { 
    foodname, 
    foodprice, 
    foodtype, 
    foodimage, 
    fooddescription, 
    restaurantname, 
    restaurantaddressbuilding, 
    restaurantaddressstreet, 
    restaurantaddresscity, 
    addon, 
    addonprice 
  } = route.params;

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const totalAmount = foodprice * quantity;
    alert(`Added ${quantity} ${foodname}(s) to cart. Total: Ksh.${totalAmount}/-`);
  };

  const totalAmount = foodprice * quantity;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Food Image */}
      <Image source={foodimage} style={styles.foodImage} />

      {/* Food Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.foodName}>{foodname}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.foodPrice}>Ksh.{foodprice}/-</Text>

        <Text style={styles.label}>Type:</Text>
        <Text style={styles.foodType}>{foodtype}</Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.foodDescription}>{fooddescription}</Text>
      </View>

      {/* Restaurant Info */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Store Name:</Text>
        <Text style={styles.restaurantName}>{restaurantname}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.restaurantAddress}>
          {restaurantaddressbuilding}, {restaurantaddressstreet}, {restaurantaddresscity}
        </Text>
      </View>

      {/* Addon Info */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Addon:</Text>
        <Text style={styles.addonText}>{addon}</Text>

        <Text style={styles.label}>Addon Price:</Text>
        <Text style={styles.addonPrice}>Ksh.{addonprice}/-</Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.quantitySelector}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          >
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(Number(text) || 1)}
          />
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Total Amount */}
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountLabel}>Total Amount:</Text>
        <Text style={styles.totalAmountValue}>Ksh.{totalAmount}/-</Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 25,
    zIndex: 1,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  foodImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  foodPrice: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  foodType: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  foodDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  restaurantAddress: {
    fontSize: 16,
    color: '#555',
  },
  addonText: {
    fontSize: 16,
    color: '#333',
  },
  addonPrice: {
    fontSize: 16,
    color: '#555',
  },
  quantityContainer: {
    width: '100%',
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#ff4757',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  totalAmountContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  totalAmountLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmountValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff4757',
  },
  addToCartButton: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductPage; 