import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from '../HomeScreen';
import LiquorDashboard from '../LiqourDashboard';
import UserProfile from './UserProfile';
import VerifyScreen from './VerifyScreen'; 
import RegisterLiqorStore from './RegisterLiqorStoreScreen';
import ProductPage from '../ProductPage';
import BottomNav from '../../components/BottomNav';
import UserCart from '../UserCart';
import PlaceOrder from '../PlaceOrder';
import TrackOrder from '../TrackOrder';



const  Stack = createNativeStackNavigator();


const AuthNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="RegisterLiqorScreen" component={RegisterLiqorStore} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="LiqourDashboard" component={LiquorDashboard} options={{headerShown:false}}/>
        <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="user-profile" component={UserProfile} options={{headerShown:false}}/>
        <Stack.Screen name="ProductPage" component={ProductPage}  options={{headerShown:false}}/>
        <Stack.Screen name="bottomnav" component={BottomNav}  options={{headerShown:false}}/>
        <Stack.Screen name="Cart" component={UserCart}   options={{headerShown:false}}/>
        <Stack.Screen name='Placeorder' component={PlaceOrder}  options={{headerShown:false}}/>
        <Stack.Screen name="trackorder" component={TrackOrder}   options={{headerShown:false}}/>
      </Stack.Navigator>
  )
}

export default AuthNavigation