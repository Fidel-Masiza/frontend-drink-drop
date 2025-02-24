import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import deliveryboylogo from '../../../assets/liqor-page2.png';
import { colors, hr80 } from '../../globals/style';
import { firebase } from '../../../FireBase/FirebaseConfig';

const WelcomeScreen = ({ navigation }) => {
  const [userlogged, setUserlogged] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('Fetching address...');

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserlogged(user);
        } else {
          setUserlogged(null);
          console.log('no user logged in');
        }
      });
    };
    checklogin();
  }, []);

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

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        setUserlogged(null);
        console.log('logged out');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let locationText = 'Waiting for location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Drink-Drop</Text>
      <View style={styles.logoout}>
        <Image source={deliveryboylogo} style={styles.logo} />
      </View>
      <View style={hr80} />
      <Text style={styles.text}>Craving Solved! One delivery at a time.</Text>
      <View style={hr80} />

      <Text style={styles.locationText}>Location: {locationText}</Text>
      <Text style={styles.addressText}>Address: {address}</Text>

      {userlogged == null ? 
        <View style={styles.btnout}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.btn}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btn}>Log In</Text>
          </TouchableOpacity>
        </View>
       : 
        <View style={styles.logged}>
          <Text style={styles.txtlog}>Signed in as <Text style={styles.txtlogin}>{userlogged.email}</Text></Text>
          <View style={styles.btnout}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.btn}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLogout()}>
              <Text style={styles.btn}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
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
    fontWeight: '200',
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
  logged: {
    alignItems: 'center',
  },
  txtlog: {
    fontSize: 16,
    color: colors.col1,
  },
  txtlogin: {
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
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