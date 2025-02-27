import { StyleSheet, Text, View, TextInput, StatusBar, ScrollView, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style';
import CardSlider from '../components/CardSlider';
import BottomNav from '../components/BottomNav';
import deliveryboylogo from '../../assets/liqor-page2.png';



export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');

  // Static data
  const staticFoodData = [
    {
      id: 1,
      foodname: "Chrome-Gin",
      foodprice: "200",
      foodtype: "gin",
      foodimage: require('../../assets/chrome-gin.jpeg'), // Local image
      fooddescription: "Smooth and easy to drink ",
      restaurantname: "Kwa Msoo",
      restaurantaddressbuilding: "123 Main St",
      restaurantaddressstreet: "Runda",
      restaurantaddresscity: "Nairobi",
      addon: "Water",
      addonprice: "2",
    },
    {
      id: 2,
      foodname: "Gilbeys",
      foodprice: "1200",
      foodtype: "non-veg",
      foodimage: require('../../assets/gilbo.jpeg'), // Local image
      foodimageurl: deliveryboylogo,
      fooddescription: "Easy Drinking with friends",
      restaurantname: "Burger King",
      restaurantaddressbuilding: "456 Elm St",
      restaurantaddressstreet: "Uptown",
      restaurantaddresscity: "Kiambu",
      addon: "Bacon",
      addonprice: "3",
    },
    {
      id: 3,
      foodname: "KC-whiskey",
      foodprice: "1000",
      foodtype: "non-veg",
      foodimage: require('../../assets/kc-whiskey.jpeg'), // Local image
      foodimageurl: deliveryboylogo,
      fooddescription: "Middle-class alcohol",
      restaurantname: "Burger King",
      restaurantaddressbuilding: "456 Elm St",
      restaurantaddressstreet: "Uptown",
      restaurantaddresscity: "Kericho",
      addon: "soda",
      addonprice: "3",
    },
   
    {
      id: 4,
      foodname: "Konyagi",
      foodprice: "1000",
      foodtype: "non-veg",
      foodimage: require('../../assets/konyagi.jpeg'), // Local image
      foodimageurl: deliveryboylogo,
      fooddescription: "Middle-class alcohol",
      restaurantname: "Burger King",
      restaurantaddressbuilding: "456 Elm St",
      restaurantaddressstreet: "Uptown",
      restaurantaddresscity: "Webuye",
      addon: "soda",
      addonprice: "3",
    },
    {
      id: 5,
      foodname: "County-brandy",
      foodprice: "600",
      foodtype: "non-veg",
      foodimage: require('../../assets/county-brandy.jpeg'), // Local image
      foodimageurl: deliveryboylogo,
      fooddescription: "Comrades oeee!",
      restaurantname: "Burger King",
      restaurantaddressbuilding: "456 Elm St",
      restaurantaddressstreet: "Uptown",
      restaurantaddresscity: "Nairobi CBD",
      addon: "Nothing",
      addonprice: "3",
    },
    {
      id: 6,
      foodname: "Black and White",
      foodprice: "1600",
      foodtype: "non-veg",
      foodimage: require('../../assets/black&white.jpeg'), // Local image
      foodimageurl: deliveryboylogo,
      fooddescription: "Quality drink!",
      restaurantname: "Burger King",
      restaurantaddressbuilding: "456 Elm St",
      restaurantaddressstreet: "Uptown",
      restaurantaddresscity: "Nairobi CBD",
      addon: "Nothing",
      addonprice: "3",
    },
    {
      id: 7,
      foodname: "Red-label",
      foodprice: "1600",
      foodtype: "non-veg",
      foodimage: require('../../assets/red-label.jpeg'), // Local image
      foodimageurl: deliveryboylogo,
      fooddescription: "Quality drink!",
      restaurantname: "Burger King",
      restaurantaddressbuilding: "456 Elm St",
      restaurantaddressstreet: "Uptown",
      restaurantaddresscity: "Nairobi CBD",
      addon: "Nothing",
      addonprice: "3",
    },
  ];


  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchbox}>
          <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
          <TextInput placeholder=' Search' style={styles.input} onChangeText={(text) => { setSearch(text) }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {search !== '' && (
          <View style={styles.searchresultouter}>
            <FlatList
              style={styles.searchresultsinner}
              data={staticFoodData}
              renderItem={({ item }) => {
                if (item.foodname.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <View style={styles.searchresult}>
                      <AntDesign name="arrowright" size={24} color="black" />
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
        <CardSlider title={"Near You"} data={staticFoodData} navigation={navigation} />
        <CardSlider title={"Today's Special"} data={staticFoodData} navigation={navigation} />
        <CardSlider title={"Most Popular"} data={staticFoodData} navigation={navigation} />

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
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
    paddingVertical: 10,
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
    borderColor: 'red',
    borderWidth: 1,
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
  searchresultouter: {
    width: "100%",
    backgroundColor: colors.col1,
    paddingHorizontal: 30,
  },
  searchresultsinner: {
    width: "100%",
  },
  searchresult: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
  },
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20,
  },
});
