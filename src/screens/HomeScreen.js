import { StyleSheet, Text, View, TextInput, StatusBar, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { firebase } from '../../FireBase/FirebaseConfig';
import CardSlider from '../components/CardSlider';
import ProductPage from './ProductPage';
import BottomNav from '../components/BottomNav';

export default function HomeScreen({navigation}) {
  const [foodData, setfoodData] = useState([]);
  const foodRef = firebase.firestore().collection('FooodData');
  const [vegetarian, setVegetarianData] = useState([]);
  const [nonvegetarian, setNonVegetarianData]= useState([]);
  
  // Fetch food data from Firestore
  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setfoodData(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  // Filter food data based on types
  useEffect(() => {
    setVegetarianData(foodData.filter(item => item.foodtype === 'veg'));
    setNonVegetarianData(foodData.filter(item=>item.foodtype === 'non-veg'));
  }, [foodData]);

  const [search,setSearch] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation}/>
      
      {/* Sticky search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchbox}>
          <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
          <TextInput placeholder=' Search' style={styles.input} onChangeText={(text)=>{setSearch(text)}}/>
        </View>
      </View>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {search !== '' && (
          <View style={styles.searchresultouter}>
            <FlatList
              style={styles.searchresultsinner}
              data={foodData}
              renderItem={({item}) => {
                if(item.foodname.toLowerCase().includes(search.toLowerCase())){
                  return(
                    <View style={styles.searchresult}>
                      <AntDesign  name="arrowright" size={24} color="black" />
                      <Text style={styles.searchresulttext}>{item.foodname}</Text>
                    </View>
                  );
                }
              }}
            />
          </View>
        )}
        
        <Categories />
        <OfferSlider />
        {/* Display food data */}
        <CardSlider title={"Today's Special"} data={foodData} navigation={navigation}/>
        <CardSlider title={"Carnivore's Choice"} data={nonvegetarian} navigation={navigation}/>
        <CardSlider title={"Herbivore's Haven"} data={vegetarian} navigation={navigation}/>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 10,
    paddingVertical: 10, // Ensure padding for better spacing
  },
  searchicon: {
    color: colors.text1,
  },
  searchbox: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 20,
    elevation: 10,
    borderColor: 'red', // Applied red border color
    borderWidth: 1, // Added border width for visibility
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 18,
   
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  searchresultouter:{
    width: "100%",
    backgroundColor: colors.col1,
    paddingHorizontal: 30,
  },
  searchresultsinner:{
    width: "100%",
  },
  searchresult:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  searchresulttext:{
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
  bottomnav:{
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  }
});
