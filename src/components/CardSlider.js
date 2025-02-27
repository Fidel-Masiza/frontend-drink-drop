import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { colors, vegetarian, nonvegetarian } from '../globals/style';

const CardSlider = ({title,data,navigation}) => {
//console.log(title)
//console.log(data)
const openProductPage = (item) => {
  //console.log(item);
  navigation.navigate('ProductPage',item);
}
  return (
    <View style={styles.container}>
      <Text style={styles.cardouthead}>
        {title}
      </Text>

        <FlatList style={styles.cardsout}
          horizontal 
          showsHorizontalScrollIndicator={false}
          data={data} 
          renderItem={({item}) =>(
            <TouchableOpacity key={item.index} onPress={()=>{
              openProductPage(item);
            }}>
              <View style={styles.card}>
              <View style={styles.s1}>
              <Image source={item.foodimage} style={styles.cardimgin} />

            </View>

            <View style={styles.s2}>
                <Text style={styles.txt1}>{item.foodname}</Text>
                <View style={styles.s2in}>
                    <Text style={styles.txt2}>Ksh.{item.foodprice}/-</Text>
                    {/*  */}
                    {item.foodtype === 'veg' ? <Text style=
                    {vegetarian}></Text> : <Text style={nonvegetarian}>
                    </Text>}
                </View>
            </View>

            <TouchableOpacity style={styles.s3}>
            <View style={styles.s3}>
              <Text style={styles.buybtn}>Buy</Text>
            </View>
            </TouchableOpacity>


        </View>
            </TouchableOpacity>
      )}/>
    </View>
  )
}

export default CardSlider

const styles = StyleSheet.create({
  container: {
    marginVertical:20,
  },
  cardouthead:{
    color:colors.text3,
    fontSize:30,
    width:"90%",
    borderRadius:10,
    marginHorizontal:10,
    fontWeight:"200"
  },
  cardsout:{
    width:"100%",
    //backgroundColor:"red"
  },
  card:{
    width:300,
    height:300,
    margin:10,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#E8E8E8",
    backgroundColor:colors.col1
  },
  cardimgin:{
    width:"100%",
    height:200,
    borderRadius:10
  },
  s2:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",

  },
  txt1:{
    fontSize:18,
    color:colors.text3,
    marginHorizontal:5,
    width:150
  },
  txt2:{
    fontSize:20,
    color:colors.text2,
    marginRight:10
  },
  s2in:{
    marginHorizontal:10,
    alignItems:"center",
    flexDirection:"row"
  },
  s3:{
    alignItems:"center",
    position:"absolute",
    bottom:1,
    width:"100%"
  },
  buybtn:{
    backgroundColor:colors.text1,
    color:colors.col1,
    paddingHorizontal:10,
    paddingVertical:5,
    fontSize:20,
    borderRadius:10,
    width:"90%",
    textAlign:"center"
  },
})