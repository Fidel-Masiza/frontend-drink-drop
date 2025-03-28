import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { colors, hr80, titles, btn1 } from '../../globals/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const VerifyScreen = ({ navigation, route }) => {
  const [code, setCode] = useState('');
  const [codeFocus, setCodeFocus] = useState(false);
  const [customError, setCustomError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Get user_type from route params
  const { userType,email } = route.params;

  const handleVerify = async () => {
    if (code.length !== 6) {
      setCustomError('Please enter a valid 6-digit code.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/drinks/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('Email verified successfully!');
        setTimeout(() => {
          // Redirect based on user type and pass user_type to HomegScreen
          if (userType === 'customer') {
            navigation.navigate('Home'); // Redirect to HomeScreen for customers
          } else if (userType === 'owner') {
            navigation.navigate('Homeg', { userType , email}); // Pass user_type to HomegScreen
          }
        }, 2000); // Redirect after 2 seconds
      } else {
        throw new Error(data.error || 'Verification failed.');
      }
    } catch (error) {
      setCustomError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      {successMsg === '' ? (
        <View style={styles.container}>
          <Text style={styles.head1}>Verify Your Email</Text>
          {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

          {/* Verification Code Input */}
          <View style={styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={codeFocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder="Enter 6-digit code"
              placeholderTextColor={'grey'}
              keyboardType="numeric"
              maxLength={7}
              onFocus={() => {
                setCodeFocus(true);
                setCustomError('');
              }}
              onChangeText={(text) => setCode(text)}
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity style={btn1} onPress={handleVerify}>
            <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Verify</Text>
          </TouchableOpacity>

          <View style={hr80}></View>
          <View style={styles.signupcontainer}>
            <Text>Didn't receive the code?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signup}> Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cont1}>
          <Text style={styles.successmsgtxt}>{successMsg}</Text>
          <TouchableOpacity style={btn1} onPress={() => navigation.navigate('Home')}>
            <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      )}
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
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  signup: {
    color: colors.text1,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  signupcontainer: {
    flexDirection: 'row',
    marginVertical: 10,
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
  cont1: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
});

export default VerifyScreen;