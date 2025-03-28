import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, Platform, Alert, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as DocumentPicker from 'expo-document-picker';
import { colors, titles, btn1 } from '../globals/style';

const HomegScreen = ({ navigation, route }) => {
  const { email, userType } = route.params;
  const [storeName, setStoreName] = useState('');
  const [attendantName, setAttendantName] = useState('');
  const [county, setCounty] = useState('');
  const [riders, setRiders] = useState([{ name: '', phone: '' }]);
  const [storeLogo, setStoreLogo] = useState(null);
  const [customError, setCustomError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('Fetching address...');

  // Fetch location and address
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

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

  const pickStoreLogo = async () => {
    try {
      if (Platform.OS === 'web') {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            setStoreLogo({
              uri: URL.createObjectURL(selectedFile),
              name: selectedFile.name,
              type: selectedFile.type,
            });
            setCustomError('');
          }
        };
        fileInput.click();
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: 'image/*',
          copyToCacheDirectory: false,
        });

        if (!result.canceled && result.assets[0]) {
          setStoreLogo({
            uri: result.assets[0].uri,
            name: result.assets[0].name,
            type: result.assets[0].mimeType,
          });
          setCustomError('');
        }
      }
    } catch (error) {
      console.error('Error picking file:', error);
      setCustomError('Failed to pick the file.');
    }
  };

  const handleRiderChange = (index, field, value) => {
    const updatedRiders = [...riders];
    updatedRiders[index][field] = value;
    setRiders(updatedRiders);
    
    // Add new rider fields if last rider has both name and phone
    if (index === riders.length - 1 && value && 
        ((field === 'name' && updatedRiders[index].phone) || 
         (field === 'phone' && updatedRiders[index].name))) {
      setRiders([...updatedRiders, { name: '', phone: '' }]);
    }
  };

  const handleSubmit = async () => {
    // Filter out empty riders (where both name and phone are empty)
    const validRiders = riders.filter(rider => rider.name && rider.phone);
    
    if (!storeName || !attendantName || !county || validRiders.length === 0 || !storeLogo) {
      setCustomError('Please fill in all required fields and add at least one rider.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('store_name', storeName);
    formData.append('attendant_name', attendantName);
    formData.append('county', county);
    formData.append('latitude', location?.coords.latitude);
    formData.append('longitude', location?.coords.longitude);
    formData.append('address', address);

    // Add riders to formData
    validRiders.forEach((rider, index) => {
      formData.append(`riders[${index}][name]`, rider.name);
      formData.append(`riders[${index}][phone]`, rider.phone);
    });

    if (Platform.OS === 'web') {
      const fileBlob = await fetch(storeLogo.uri).then((res) => res.blob());
      formData.append('store_logo', fileBlob, storeLogo.name);
    } else {
      formData.append('store_logo', {
        uri: storeLogo.uri,
        name: storeLogo.name,
        type: storeLogo.type || 'image/jpeg',
      });
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/drinks/store-details/', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('Store and riders registered successfully!');
        // Show rider credentials (for demo purposes)
        if (data.riders) {
          Alert.alert(
            'Rider Credentials',
            data.riders.map(r => `${r.name}: Phone ${r.phone}, Password ${r.password}`).join('\n\n'),
            [{ text: 'OK', onPress: () => navigation.navigate('CsvUpload', { email }) }]
          );
        } else {
          setTimeout(() => navigation.navigate('CsvUpload', { email }), 2000);
        }
      } else {
        setCustomError(data.error || 'Failed to save store details.');
      }
    } catch (error) {
      setCustomError('An error occurred while submitting the form.');
      console.error('Submit error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      <Text style={styles.head1}>Liquor Store Details</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      {successMsg !== '' && <Text style={styles.successmsgtxt}>{successMsg}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Store Name"
        placeholderTextColor="grey"
        value={storeName}
        onChangeText={setStoreName}
      />

      <TextInput
        style={styles.input}
        placeholder="Attendant Name"
        placeholderTextColor="grey"
        value={attendantName}
        onChangeText={setAttendantName}
      />

      <TextInput
        style={styles.input}
        placeholder="County"
        placeholderTextColor="grey"
        value={county}
        onChangeText={setCounty}
      />

      <Text style={styles.sectionTitle}>Riders Information</Text>
      {riders.map((rider, index) => (
        <View key={index} style={styles.riderContainer}>
          <TextInput
            style={styles.riderInput}
            placeholder={`Rider ${index + 1} Name`}
            placeholderTextColor="grey"
            value={rider.name}
            onChangeText={(text) => handleRiderChange(index, 'name', text)}
          />
          <TextInput
            style={styles.riderInput}
            placeholder={`Rider ${index + 1} Phone`}
            placeholderTextColor="grey"
            value={rider.phone}
            onChangeText={(text) => handleRiderChange(index, 'phone', text)}
            keyboardType="phone-pad"
          />
        </View>
      ))}

      <TouchableOpacity style={btn1} onPress={pickStoreLogo}>
        <Text style={styles.btnText}>Upload Store Logo</Text>
      </TouchableOpacity>

      {storeLogo && (
        <Text style={styles.fileName}>Selected Logo: {storeLogo.name}</Text>
      )}

      <Text style={styles.locationText}>Location: {location ? 
        `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}` : 
        'Waiting for location...'}
      </Text>
      <Text style={styles.addressText}>Address: {address}</Text>

      <TouchableOpacity style={btn1} onPress={handleSubmit}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    elevation: 20,
  },
  riderContainer: {
    width: '80%',
    marginBottom: 10,
  },
  riderInput: {
    width: '100%',
    height: 50,
    backgroundColor: colors.col1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    elevation: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text1,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  errormsg: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  successmsgtxt: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
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
  btnText: {
    color: colors.col1,
    fontSize: titles.btntxt,
    fontWeight: 'bold',
  },
  fileName: {
    fontSize: 16,
    color: colors.text1,
    marginVertical: 10,
  },
});

export default HomegScreen;