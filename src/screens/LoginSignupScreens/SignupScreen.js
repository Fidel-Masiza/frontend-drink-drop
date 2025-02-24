import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Picker, ActivityIndicator, Alert } from 'react-native';
import { colors, hr80, titles, btn1 } from '../../globals/style';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import axios from 'axios';

const SignupScreen = ({ navigation }) => {
  const [namefocus, setNameFocus] = useState(false);
  const [emailfocus, setEmailFocus] = useState(false);
  const [passwordfocus, setPasswordFocus] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [cpasswordfocus, setcPasswordFocus] = useState(false);
  const [showcpassword, setShowcPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('customer'); // Default to 'customer'

  const [customError, setCustomError] = useState('');
  const [successmsg, setSuccessMsg] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== cpassword) {
      setCustomError("Passwords Don't Match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/drinks/register/', {
        email,
        username,
        password,
        user_type: userType,
      });

      if (response.status === 201) {
        setToken(response.data.token);
        setSuccessMsg('OTP sent successfully. Please verify your email.');
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.data.error) {
          setCustomError(error.response.data.error);
        } else {
          setCustomError('Registration failed. Please try again.');
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
      <StatusBar />
      {successmsg === '' ? (
        <View style={styles.container}>
          <Text style={styles.head1}>Sign Up</Text>
          {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

          <View style={styles.inputout}>
            <AntDesign name="user" size={24} color={namefocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder='Username'
              placeholderTextColor={'grey'}
              onFocus={() => {
                setEmailFocus(false);
                setPasswordFocus(false);
                setNameFocus(true);
                setShowPassword(false);
                setShowcPassword(false);
                setcPasswordFocus(false);
                setCustomError('');
              }}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          <View style={styles.inputout}>
            <Fontisto name="email" size={24} color={emailfocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor={'grey'}
              onFocus={() => {
                setEmailFocus(true);
                setPasswordFocus(false);
                setNameFocus(false);
                setShowPassword(false);
                setShowcPassword(false);
                setcPasswordFocus(false);
                setCustomError('');
              }}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View style={styles.inputout}>
            <MaterialCommunityIcons name='lock-outline' size={24} color={passwordfocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={!showpassword}
              onFocus={() => {
                setEmailFocus(false);
                setPasswordFocus(true);
                setNameFocus(false);
                setShowPassword(false);
                setShowcPassword(false);
                setcPasswordFocus(false);
                setCustomError('');
              }}
              onChangeText={(text) => setPassword(text)}
            />
            <Octicons name={showpassword ? "eye" : "eye-closed"} size={24} color="black" onPress={() => setShowPassword(!showpassword)} />
          </View>

          <View style={styles.inputout}>
            <MaterialCommunityIcons name='lock-outline' size={24} color={cpasswordfocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder='Confirm Password'
              secureTextEntry={!showcpassword}
              onFocus={() => {
                setEmailFocus(false);
                setcPasswordFocus(true);
                setPasswordFocus(false);
                setNameFocus(false);
                setShowcPassword(false);
                setCustomError('');
              }}
              onChangeText={(text) => setcPassword(text)}
            />
            <Octicons name={showcpassword ? "eye" : "eye-closed"} size={24} color="black" onPress={() => setShowcPassword(!showcpassword)} />
          </View>

          <View style={styles.inputout}>
            <Text style={styles.label}>User Type</Text>
            <Picker
              selectedValue={userType}
              style={styles.picker}
              onValueChange={(itemValue) => setUserType(itemValue)}
            >
              <Picker.Item label="Customer" value="customer" />
              <Picker.Item label="Liquor Store Owner" value="owner" />
            </Picker>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={btn1} onPress={handleSignup}>
              <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Register</Text>
            </TouchableOpacity>
          )}

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
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signup}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cont1}>
          <Text style={styles.successmsgtxt}>{successmsg}</Text>
          <TouchableOpacity style={btn1} onPress={() => navigation.navigate('VerifyOTP', { token, email })}>
            <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
    marginBottom: 20,
  },
  picker: {
    width: '80%',
    marginLeft: 10,
  },
  label: {
    fontSize: 17,
    color: colors.text2,
  },
  // ... (rest of your styles)
});

export default SignupScreen;