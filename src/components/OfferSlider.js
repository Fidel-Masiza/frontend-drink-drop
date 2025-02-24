import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import Swiper from 'react-native-swiper';
import { colors } from '../globals/style';



{/*  const carouseldata = [
    {
      id: 1,
      image: require('../../assets/biryani.png'),
    },

    {
      id: 2,
      image: require('../../assets/burger.png'),
    },

    {
      id: 3,
      image: require('../../assets/chicken.png'),
    },

    {
      id: 4,
      image: require('../../assets/fries.png'),
    },

    {
      id: 5,
      image: require('../../assets/noodles.png'),
    },
  ]
*/}


const OfferSlider = () => {
  return (
    <View>
      <View style={styles.OfferSlider}>
        <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true} 
        dotColor={colors.text2} activeDotColor={colors.text1}
        nextButton={<Text style={styles.btnText}>{'>'}</Text>}
        prevButton={<Text style={styles.btnText}>{'<'}</Text>}>
              <View style={styles.slide}>
                <Image source={require('../../assets/biryanii.png')} style={styles.image} />
              </View>

              <View style={styles.slide}>
                <Image source={require('../../assets/burger.png')} style={styles.image} />
              </View>

              <View style={styles.slide}>
                <Image source={require('../../assets/chickie.png')} style={styles.image} />
              </View>

              <View style={styles.slide}>
                <Image source={require('../../assets/pizza.png')} style={styles.image} />
              </View>

              <View style={styles.slide}>
                <Image source={require('../../assets/chowmein.jpg')} style={styles.image} />
              </View>


        </Swiper>
      </View>
    </View>
  )
}

export default OfferSlider

const styles = StyleSheet.create({
  image:{
    width:"100%",
    height:"100%",
    resizeMode:"cover"
  },
  OfferSlider:{
    width:"100%",
    height:200,
    backgroundColor:colors.col1,
    paddingHorizontal:10,
    justifyContent:"center",
    alignItems:"center",
    marginVertical:10,
    borderRadius:20
  },
  slide:{
    width:"100%",
    height:200,
    backgroundColor:colors.text3,
    justifyContent:"center",
    alignItems:"center"
  },
  btnText:{
    color:colors.text1,
    fontSize:25,
    fontWeight:"bold",
    backgroundColor:"white",
    borderRadius:20,
    width:30,
    height:30,
    textAlign:"center",
    lineHeight:30
  }
})