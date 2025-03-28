import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import { colors } from '../globals/style';

const RiderPage = ({ navigation, route }) => {
  const { rider_name, rider_phone } = route.params;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('Fetching address...');

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
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setAddress(data.display_name || 'Address not found');
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Error fetching address');
      }
    })();
  }, []);

  let locationText = 'Waiting for location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude.toFixed(6)}, Longitude: ${location.coords.longitude.toFixed(6)}`;
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.header}>Rider Dashboard</Text>
      
      <View style={styles.profileSection}>
        <Text style={styles.profileText}>Name: {rider_name}</Text>
        <Text style={styles.profileText}>Phone: {rider_phone}</Text>
      </View>

      <View style={styles.locationSection}>
        <Text style={styles.sectionTitle}>Current Location</Text>
        <Text style={styles.locationText}>{locationText}</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: colors.text1,
  },
  profileSection: {
    backgroundColor: colors.col1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.text1,
  },
  locationSection: {
    backgroundColor: colors.col1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text1,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 5,
    color: colors.text1,
  },
  addressText: {
    fontSize: 14,
    marginVertical: 5,
    color: colors.text1,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#ff4242',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RiderPage;