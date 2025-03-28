import { StyleSheet, Text, View, TextInput, StatusBar, ScrollView, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style';
import CardSlider from '../components/CardSlider';
import BottomNav from '../components/BottomNav';
import * as Location from 'expo-location';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('Fetching address...');
  const [stores, setStores] = useState([]);
  const [storeError, setStoreError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch location and address
  useEffect(() => {
    (async () => {
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocoding to get address using Nominatim
      const { latitude, longitude } = location.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.display_name) {
          setAddress(data.display_name);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
      }

      // Fetch nearest stores
      fetchNearestStores(latitude, longitude);
    })();
  }, []);

  // Fetch nearest stores from the backend
  const fetchNearestStores = async (latitude, longitude) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/drinks/nearest-stores/', {
        latitude: latitude,
        longitude: longitude,
      });
      if (response.data.length === 0) {
        setStoreError('No stores found near you.');
      } else {
        setStores(response.data);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      setStoreError('Error fetching stores. Please try again later.');
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    setSearch(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/drinks/search-stores/', {
        query: query,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching stores:', error);
      setSearchResults([]);
    }
  };

  let locationText = 'Waiting for location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />

      {/* Location and Address (Sticky) */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Location: {locationText}</Text>
        <Text style={styles.addressText}>Address: {address}</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchbox}>
          <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
          <TextInput
            placeholder="Search by address or store name"
            style={styles.input}
            onChangeText={handleSearch}
            value={search}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {storeError && <Text style={styles.errorText}>{storeError}</Text>}

        <Categories />
        <OfferSlider />

        {/* Display search results */}
        {searchResults.length > 0 && (
          <CardSlider title={"Search Results"} data={searchResults} navigation={navigation} />
        )}

        {/* Display nearest stores */}
        {stores.length > 0 && <CardSlider title={"Stores Near You"} data={stores} navigation={navigation} />}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  locationContainer: {
    backgroundColor: colors.col1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  locationText: {
    fontSize: 14,
    color: colors.text1,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 12,
    color: colors.text1,
    marginTop: 5,
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 10,
    paddingVertical: 10,
  },
  searchicon: {
    color: colors.text1,
  },
  searchbox: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    elevation: 10,
    borderColor: 'red',
    borderWidth: 1,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 18,
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});