import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../globals/style';

const ProductSlider = ({ title, data, onAddToCart, cart }) => {
  const handleAdd = (item) => {
    onAddToCart(item, 1);
  };

  const handleRemove = (item) => {
    onAddToCart(item, -1);
  };

  const getQuantity = (item) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image || 'https://via.placeholder.com/150' }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.brand}>{item.brand}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.price}>Price: ${item.price_usd}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleRemove(item)}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{getQuantity(item)}</Text>
                <TouchableOpacity onPress={() => handleAdd(item)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.text3, marginHorizontal: 10, marginBottom: 10 },
  card: {
    width: 200,
    marginHorizontal: 10,
    backgroundColor: colors.col2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: { width: '100%', height: 120 },
  image: { width: '100%', height: '100%' },
  detailsContainer: { padding: 10 },
  brand: { fontSize: 16, fontWeight: 'bold', color: colors.text3 },
  name: { fontSize: 14, color: colors.text3 },
  type: { fontSize: 12, color: colors.text2 },
  price: { fontSize: 14, color: colors.text1, marginTop: 5 },
  description: { fontSize: 12, color: colors.text2, marginTop: 5 },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: { fontSize: 20, color: colors.text1 },
  quantity: { fontSize: 16, color: colors.text1 },
});

export default ProductSlider;