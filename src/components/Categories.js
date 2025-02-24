import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { colors } from '../globals/style';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity>
        <View style={styles.box}>
          <MaterialIcons name="breakfast-dining" size={24} color={colors.primary} style={styles.icon}/>
          <Text style={styles.text}>Breakfast</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.box}>
          <MaterialCommunityIcons name="food-drumstick" size={24} color={colors.primary} style={styles.icon}/>
          <Text style={styles.text}>Starters</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.box}>
          <MaterialCommunityIcons name="noodles" size={24} color={colors.primary} style={styles.icon}/>
          <Text style={styles.text}>Dinner</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.box}>
          <Ionicons name="fast-food" size={24} color={colors.primary} style={styles.icon} />
          <Text style={styles.text}>American</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.box}>
          <FontAwesome6 name="bowl-rice" size={24} color={colors.primary} style={styles.icon}/>
          <Text style={styles.text}>Pakistani</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.box}>
          <MaterialCommunityIcons name="bottle-soda" size={24} color="black" />
          <Text style={styles.text}>Soda</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View style={styles.box}>
          <MaterialCommunityIcons name="cupcake" size={24} color={colors.primary} style={styles.icon} />
          <Text style={styles.text}>Desserts</Text>
        </View>
        </TouchableOpacity>

        
      </ScrollView>



    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container:{
    backgroundColor:colors.col1,
    width:"100%",
    elevation:10,
    borderRadius:10
  },
  head:{
    color:colors.text1,
    fontSize:25,
    margin:10,
    fontWeight:"300",
    alignSelf:"center",
    paddingBottom:5,
    borderBottomColor:colors.text1,
    borderBottomWidth:1
  },
  box:{
    backgroundColor:colors.col1,
    elevation:20,
    margin:10,
    padding:10,
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  icon:{
    marginRight:10,
    color:colors.text3
  },
  text:{
    color:colors.text3
  },
})