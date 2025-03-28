import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Alert } from 'react-native';
import { colors, hr80, titles, btn1 } from '../../globals/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState('');

  const handleLogin = async () => {
    if (!usernameOrEmail || !password) {
      setCustomError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/drinks/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username_or_email: usernameOrEmail,
          password: password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data.user_type === 'customer') {
          navigation.navigate('Home', { 
            user_type: data.user_type,
            username: data.username
          });
        } else if (data.user_type === 'owner') {
          navigation.navigate('StoreDashboard', { 
            username: data.username
          });
        } else if (data.user_type === 'rider') {
          navigation.navigate('RiderPage', {
            rider_username: data.username,
            rider_phone: data.rider_phone,
            rider_name: data.rider_name,
            store_id: data.store_id
          });
        }
      } else {
        throw new Error(data.error || 'Login failed.');
      }
    } catch (error) {
      setCustomError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.head1}>Login</Text>
        {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

        <View style={styles.inputout}>
          <MaterialCommunityIcons name="account-outline" size={24} color={colors.text1} />
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor={'grey'}
            onChangeText={(text) => setUsernameOrEmail(text)}
          />
        </View>

        <View style={styles.inputout}>
          <MaterialCommunityIcons name="lock-outline" size={24} color={passwordFocus ? colors.text1 : colors.text2} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            onFocus={() => setPasswordFocus(true)}
            onChangeText={(text) => setPassword(text)}
          />
          <Octicons
            name={showPassword ? 'eye' : 'eye-closed'}
            size={24}
            color="black"
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>

        <TouchableOpacity style={btn1} onPress={handleLogin}>
          <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>

        <View style={hr80}></View>
        <View style={styles.signupcontainer}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signup}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default LoginScreen;