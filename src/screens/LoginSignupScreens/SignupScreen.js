import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, Alert, Picker } from 'react-native';
import { colors, hr80, titles, btn1 } from '../../globals/style';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('customer'); // Default user type

  const [customError, setCustomError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setCustomError("Passwords Don't Match");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
      password_confirm: confirmPassword,
      user_type: userType,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/drinks/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('Registration successful. Please verify your email.');
        setTimeout(() => {
          navigation.navigate('Verify'); // Redirect to VerifyScreen
        }, 2000); // Redirect after 2 seconds
      } else {
        throw new Error(data.message || 'Failed to register');
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
          <Text style={styles.head1}>Sign Up</Text>
          {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}

          {/* Username Input */}
          <View style={styles.inputout}>
            <AntDesign name="user" size={24} color={usernameFocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={'grey'}
              onFocus={() => {
                setEmailFocus(false);
                setPasswordFocus(false);
                setUsernameFocus(true);
                setShowPassword(false);
                setShowConfirmPassword(false);
                setConfirmPasswordFocus(false);
                setCustomError('');
              }}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputout}>
            <Fontisto name="email" size={24} color={emailFocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'grey'}
              onFocus={() => {
                setEmailFocus(true);
                setPasswordFocus(false);
                setUsernameFocus(false);
                setShowPassword(false);
                setShowConfirmPassword(false);
                setConfirmPasswordFocus(false);
                setCustomError('');
              }}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={passwordFocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onFocus={() => {
                setEmailFocus(false);
                setPasswordFocus(true);
                setUsernameFocus(false);
                setShowPassword(false);
                setShowConfirmPassword(false);
                setConfirmPasswordFocus(false);
                setCustomError('');
              }}
              onChangeText={(text) => setPassword(text)}
            />
            <Octicons
              name={showPassword ? 'eye' : 'eye-closed'}
              size={24}
              color="black"
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputout}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={confirmPasswordFocus ? colors.text1 : colors.text2} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              onFocus={() => {
                setEmailFocus(false);
                setConfirmPasswordFocus(true);
                setPasswordFocus(false);
                setUsernameFocus(false);
                setShowConfirmPassword(false);
                setCustomError('');
              }}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Octicons
              name={showConfirmPassword ? 'eye' : 'eye-closed'}
              size={24}
              color="black"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </View>

          {/* User Type Dropdown */}
          <View style={styles.inputout}>
            <Picker
              selectedValue={userType}
              style={styles.picker}
              onValueChange={(itemValue) => setUserType(itemValue)}
            >
              <Picker.Item label="Customer" value="customer" />
              <Picker.Item label="Liquor Store Owner" value="owner" />
            </Picker>
          </View>

          {/* Register Button */}
          <TouchableOpacity style={btn1} onPress={handleSignup}>
            <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>
          <Text style={styles.gftxt}>Sign In with</Text>

          {/* Social Icons */}
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
          <Text style={styles.successmsgtxt}>{successMsg}</Text>
          <TouchableOpacity style={btn1} onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: 'bold' }}>Sign In</Text>
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
  picker: {
    width: '100%',
    color: colors.text1,
  },
  or: {
    color: colors.text1,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  gftxt: {
    color: colors.text2,
    marginBottom: 10,
    fontSize: 25,
  },
  gf: {
    flexDirection: 'row',
  },
  gficon: {
    backgroundColor: colors.col1,
    width: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
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

export default SignupScreen;