import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { colors, hr80, titles, btn1 } from '../../globals/style';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const [showpassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerror, setCustomError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setCustomError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/drinks/login/', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        navigation.navigate('Home'); // Redirect to Home
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.error === 'User does not exist.') {
          setCustomError('User does not exist.');
        } else if (error.response.data.error === 'Your account is deactivated. Contact support.') {
          setCustomError('Your account is deactivated. Contact support.');
        } else if (error.response.data.error === 'Your account is not verified. Please verify your email.') {
          setCustomError('Your account is not verified. Please verify your email.');
        } else if (error.response.data.error === 'Incorrect password.') {
          setCustomError('Incorrect password.');
        } else {
          setCustomError('Something went wrong. Please try again later.');
        }
      } else {
        setCustomError('Network error. Please check your internet connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Sign In</Text>

      {customerror !== '' && <Text style={styles.errormsg}>{customerror}</Text>}

      <View style={styles.inputout}>
        <AntDesign name="user" size={24} color={emailfocus === true ? colors.text1 : colors.text2} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          onFocus={() => {
            setEmailFocus(true);
            setPasswordFocus(false);
          }}
          onChangeText={(text) => {
            setEmail(text);
            setCustomError('');
          }}
        />
      </View>

      <View style={styles.inputout}>
        <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus === true ? colors.text1 : colors.text2} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={showpassword === false ? true : false}
          onFocus={() => {
            setEmailFocus(false);
            setPasswordFocus(true);
          }}
          onChangeText={(text) => {
            setPassword(text);
            setCustomError('');
          }}
        />
        <Octicons
          name={showpassword === false ? 'eye-closed' : 'eye'}
          size={24}
          color="black"
          onPress={() => {
            setShowPassword(!showpassword);
          }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={btn1} onPress={handleLogin}>
          <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Sign in</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.forgot}>Forgot Password?</Text>
      <Text style={styles.or}>OR</Text>
      <Text style={styles.gftxt}>Sign In with</Text>

      <View style={styles.gf}>
        <TouchableOpacity>
          <View style={styles.gficon}>
            <AntDesign name="google" size={24} color="#EA4335" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.gficon}>
            <FontAwesome5 name="facebook-f" size={24} color="#4267B2" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={hr80}></View>
      <View style={styles.signupcontainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signup}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
