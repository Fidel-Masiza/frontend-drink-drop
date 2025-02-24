import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { colors, btn1, titles } from '../../globals/style';

const VerifyOTPScreen = ({ route, navigation }) => {
  const { token, email } = route.params;
  const [otp, setOtp] = useState('');
  const [customError, setCustomError] = useState('');
  const [successmsg, setSuccessMsg] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/drinks/verify-otp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Account verified successfully.');
        navigation.navigate('Login');
      } else {
        setCustomError(data.error || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.log('OTP verification error', error);
      setCustomError('Network error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.head1}>Verify OTP</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      {successmsg !== '' && <Text style={styles.successmsgtxt}>{successmsg}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="grey"
        onChangeText={(text) => setOtp(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={btn1} onPress={handleVerifyOTP}>
        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    width: '80%',
    backgroundColor: colors.col1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 17,
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
  successmsgtxt: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default VerifyOTPScreen;