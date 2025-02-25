import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { colors, hr80, titles, btn1 } from '../../globals/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';

const RegisterLiquorStoreScreen = ({ navigation }) => {
  const [storeName, setStoreName] = useState('');
  const [riderName, setRiderName] = useState('');
  const [riderNumber, setRiderNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [customError, setCustomError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('Fetching address...');
  const [errorMsg, setErrorMsg] = useState(null);

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

      // Reverse geocoding to get address
      const { latitude, longitude } = location.coords;
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results[0]) {
          setAddress(data.results[0].formatted_address);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
      }
    })();
  }, []);

  const handleRegisterStore = async () => {
    if (!storeName || !riderName || !riderNumber || !ownerName) {
      setCustomError('Please fill in all fields.');
      return;
    }

    if (!location) {
      setCustomError('Location not available. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/drinks/liquor-stores/', {
        name: storeName,
        rider_name: riderName,
        rider_number: riderNumber,
        owner: ownerName,
        address_name: address,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Store registered successfully!');
        navigation.navigate('LiquorDashboard'); // Redirect to Liquor Dashboard
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        setCustomError('Something went wrong. Please try again later.');
      } else {
        setCustomError('Network error. Please check your internet connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Register Your Liquor Store</Text>

      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

      {/* Owner Name Input */}
      <View style={styles.inputout}>
        <MaterialCommunityIcons name="account" size={24} color={colors.text1} />
        <TextInput
          style={styles.input}
          placeholder="Owner Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setOwnerName(text);
            setCustomError('');
          }}
        />
      </View>

      {/* Store Name Input */}
      <View style={styles.inputout}>
        <MaterialCommunityIcons name="store" size={24} color={colors.text1} />
        <TextInput
          style={styles.input}
          placeholder="Store Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setStoreName(text);
            setCustomError('');
          }}
        />
      </View>

      {/* Rider Name Input */}
      <View style={styles.inputout}>
        <MaterialCommunityIcons name="account" size={24} color={colors.text1} />
        <TextInput
          style={styles.input}
          placeholder="Rider Name"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setRiderName(text);
            setCustomError('');
          }}
        />
      </View>

      {/* Rider Number Input */}
      <View style={styles.inputout}>
        <MaterialCommunityIcons name="phone" size={24} color={colors.text1} />
        <TextInput
          style={styles.input}
          placeholder="Rider Number"
          placeholderTextColor="grey"
          keyboardType="phone-pad"
          onChangeText={(text) => {
            setRiderNumber(text);
            setCustomError('');
          }}
        />
      </View>

      {/* Display Location and Address */}
      <Text style={styles.locationText}>Latitude: {location ? location.coords.latitude : 'Fetching...'}</Text>
      <Text style={styles.locationText}>Longitude: {location ? location.coords.longitude : 'Fetching...'}</Text>
      <Text style={styles.addressText}>Address: {address}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={btn1} onPress={handleRegisterStore}>
          <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Register Store</Text>
        </TouchableOpacity>
      )}

      <View style={hr80}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputout: {
    flexDirection: 'row',
    width: '80%',
    marginVertical: 10,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: 'center',
    elevation: 20,
  },
  input: {
    fontSize: 17,
    marginLeft: 10,
    width: '80%',
  },
  errormsg: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  locationText: {
    fontSize: 16,
    color: colors.text1,
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
    color: colors.text1,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default RegisterLiquorStoreScreen;