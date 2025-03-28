import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import deliveryboylogo from '../../../assets/liqor-page2.png';
import { colors, hr80 } from '../../globals/style';

const WelcomeScreen = ({ navigation }) => {
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
    })();
  }, []);

  let locationText = 'Waiting for location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drink-Drop</Text>
      <View style={styles.logoout}>
        <Image source={deliveryboylogo} style={styles.logo} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>Craving Solved! One delivery at a time.</Text>
      <View style={hr80} />

      <Text style={styles.locationText}>Location: {locationText}</Text>
      <Text style={styles.addressText}>Address: {address}</Text>

      <View style={styles.btnout}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btn}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4242',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    color: colors.col1,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '800',
    fontFamily: 'franklin-gothic-urw',
  },
  logoout: {
    width: '75%',
    height: '40%',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    width: '80%',
    color: colors.col1,
    textAlign: 'center',
  },
  btnout: {
    flexDirection: 'row',
  },
  btn: {
    fontSize: 20,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: '700',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  locationText: {
    fontSize: 16,
    color: colors.col1,
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
    color: colors.col1,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default WelcomeScreen;