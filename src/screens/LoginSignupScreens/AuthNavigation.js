import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './WelcomeScreen';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from '../HomeScreen';
import HomegScreen from '../HomegScreen';
import UserProfile from './UserProfile';
import VerifyScreen from './VerifyScreen'; 
import SubscriptionPage from '../SubscriptionPage'; 
import StoreDashboard from '../StoreDashboard'; 
import OrderDetail from '../OrderDetail'; 
import MyOrders from '../MyOrders'; 
import MyOrderDetails from '../MyOrderDetails'; 
import ProductPage from '../ProductPage';
import  RiderPage from '../RiderPage';
import  AllRiders from '../AllRiders';
import BottomNav from '../../components/BottomNav';
import PlaceOrder from '../PlaceOrder';
import CartPage from '../CartPage';
import Track from '../Track';
import CsvUpload from '../CsvUpload';
import StoreCSVContent from '../StoreCSVContent';




const  Stack = createNativeStackNavigator();


const AuthNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Homeg" component={HomegScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="user-profile" component={UserProfile} options={{headerShown:false}}/>
        <Stack.Screen name="SubscriptionPage" component={SubscriptionPage}  options={{headerShown:false}}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail}  options={{headerShown:false}}/>
        <Stack.Screen name="MyOrders" component={MyOrders}  options={{headerShown:false}}/>
        <Stack.Screen name="MyOrderDetails" component={MyOrderDetails}  options={{headerShown:false}}/>
        <Stack.Screen name="StoreDashboard" component={StoreDashboard}  options={{headerShown:false}}/>
        <Stack.Screen name="RiderPage" component={RiderPage}  options={{headerShown:false}}/>
        <Stack.Screen name="AllRiders" component={AllRiders}  options={{headerShown:false}}/>
        <Stack.Screen name="ProductPage" component={ProductPage}  options={{headerShown:false}}/>
        <Stack.Screen name="bottomnav" component={BottomNav}  options={{headerShown:false}}/>
        <Stack.Screen name='CartPage' component={CartPage}  options={{headerShown:false}}/>
        <Stack.Screen name='Placeorder' component={PlaceOrder}  options={{headerShown:false}}/>
        <Stack.Screen name="Track" component={Track}   options={{headerShown:false}}/>
        <Stack.Screen name="StoreCSVContent" component={StoreCSVContent}   options={{headerShown:false}}/>
        <Stack.Screen name="CsvUpload" component={CsvUpload}   options={{headerShown:false}}/>

      </Stack.Navigator>
  )
}

export default AuthNavigation