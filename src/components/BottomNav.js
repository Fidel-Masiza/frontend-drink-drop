import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { FontAwesome5 } from '@expo/vector-icons';

const BottomNav = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.btncont1}>
         <FontAwesome name="home" size={30} style={styles.icon1} onPress={()=>{navigation.navigate('Home')}}/>
      </View>


      <View style={styles.btncont2}>
        <Ionicons name='search' size={35} style={styles.icon2} onPress={()=>{navigation.navigate('Home')}}/>
      </View>

      <View style={styles.btncont1}>
         <AntDesign name="shoppingcart" size={30} style={styles.icon1} onPress={()=>{navigation.navigate('CartPage')}}/>
      </View>

      <View style={styles.btncont1}>
         <FontAwesome5 name="map-marked-alt" size={30} style={styles.icon1} onPress={()=>{navigation.navigate('trackorder')}}/>
      </View>


    </View>
  );
}

export default BottomNav

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        backgroundColor:"white",
        width:"100%",
        elevation:30,
        borderTopColors:colors.text1,
        borderTopWidth:0.5,
        borderTopStartRadius:20,
        borderTopEndRadius:20
    },
    btncont1:{
 //       alignItems:"center",
 //       backgroundColor:colors.col1,
 //       elevation:10,
 //       width:50,
 //       height:50,
 //       borderRadius:50,
 //       justifyContent:"center",
 //       alignItems:"center"
    },
    btncont2:{
        alignItems:"center",
        justifyContent:"center",
        position:"relative",
        top:-15,
        backgroundColor:colors.text1,
        width:60,
        height:60,
        borderRadius:60
    },
    icon1:{
        color:colors.text1
    },
    icon2:{
        color:"white"
    }
})