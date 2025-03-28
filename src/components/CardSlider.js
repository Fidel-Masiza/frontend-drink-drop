import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../globals/style';

const CardSlider = ({ title, data, navigation }) => {
  const [imageErrors, setImageErrors] = useState({});

  const openStoreItemPage = (item) => {
    navigation.navigate('StoreCSVContent', { storeId: item.id });
  };

  const handleImageError = (item) => {
    setImageErrors((prev) => ({ ...prev, [item.id]: true }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>{title}</Text>

      <FlatList
        style={styles.cardsout}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          const isImageError = imageErrors[item.id];

          return (
            <TouchableOpacity key={item.id} onPress={() => openStoreItemPage(item)}>
              <View style={styles.card}>
                {/* Image Section */}
                <View style={styles.s1}>
                  {isImageError ? (
                    <View style={styles.imageErrorContainer}>
                      <Text style={styles.imageErrorText}>Image failed to load</Text>
                    </View>
                  ) : (
                    <Image
                      source={
                        Platform.OS === 'web'
                          ? { uri: item.store_logo, cache: 'force-cache' } // Ensure caching on web
                          : { uri: item.store_logo }
                      }
                      style={styles.cardimgin}
                      onError={() => handleImageError(item)}
                      resizeMode="cover"
                    />
                  )}
                </View>

                {/* Store Details Section */}
                <View style={styles.s2}>
                  <Text style={styles.txt1}>{item.store_name}</Text>
                  <Text style={styles.txt2}>{item.address}</Text>
                  <Text style={styles.txt2}>{item.county}</Text>
                  <Text style={styles.txt2}>{item.distance} km away</Text>
                </View>

                {/* Explore Store Button */}
                <TouchableOpacity style={styles.s3} onPress={() => openStoreItemPage(item)}>
                  <Text style={styles.buybtn}>Explore Store</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CardSlider;

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  cardouthead: { color: colors.text3, fontSize: 30, marginHorizontal: 10, fontWeight: '200' },
  card: { width: 300, height: 350, margin: 10, borderRadius: 10, borderWidth: 1, backgroundColor: colors.col1 },
  cardimgin: { width: '100%', height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  s1: { flex: 1 },
  s2: { paddingHorizontal: 10, paddingVertical: 10 },
  txt1: { fontSize: 18, color: colors.text3, marginHorizontal: 5 },
  txt2: { fontSize: 14, color: colors.text2, marginTop: 5 },
  s3: { alignItems: 'center', marginBottom: 10 },
  buybtn: { backgroundColor: colors.text1, color: colors.col1, padding: 10, fontSize: 16, borderRadius: 10, width: '90%', textAlign: 'center' },
  imageErrorContainer: { width: '100%', height: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' },
  imageErrorText: { fontSize: 16, color: 'red' },
});