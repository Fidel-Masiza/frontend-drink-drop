import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { navbtn, navbtnin, navbtnout, colors, vegetarian, nonvegetarian,btn2, hr80, incdecbtn, incdecinput, incdecout, addonout } from '../globals/style';
import { firebase } from '../../FireBase/FirebaseConfig';

const ProductPage = ({navigation,route}) => {
    const data = route.params;
    //console.log(data)

    if(route.params === undefined){
        navigation.navigate('Home')
    }

    const [quantity,setQuantity] = useState('1');
    const [addonquantity,setAddonquantity] = useState('0')


    const addtocart = ()=>{
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

        const data1 = {data,Addonquantity : addonquantity,Foodquantity :  quantity};

        //console.log('data1',data1)

        docRef.get().then((doc)=>{
            if(doc.exists){
                docRef.update({
                    cart:  firebase.firestore.FieldValue.arrayUnion(data1)
                })
                alert("Added to cart successfully.")
            }
            else{
                docRef.set({
                    cart:[data1]
                })
                alert('Added to cart successfully.')

            }
        })
    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }

    const decreaseQuantity = () => {
        if(parseInt(quantity)>1){
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }

    const increaseAddonQuantity = () => {
        setAddonquantity((parseInt(addonquantity) + 1).toString())
    }

    const decreaseAddonQuantity = () => {
        if(parseInt(addonquantity)>0){
            setAddonquantity((parseInt(addonquantity) - 1).toString())
        }
    }

    //console.log(data.addonprice)
    //console.log();
    const cartdata = JSON.stringify({cart: [{Addonquantity: addonquantity , Foodquantity:  quantity, data}]});
    console.log(typeof (cartdata))
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name='back' size={24} color='black' style={navbtnin}/>
        </View>
      </TouchableOpacity>

      <View style={styles.container1}>
        <View style={styles.s1}>
            <Image source={{
                uri: data.foodimageurl
            }} style={styles.cardimgin}/>
        </View>
        <View style={styles.s2}>
        <View style={styles.s2in}>
            <Text style={styles.head1}>{data.foodname}</Text>
            <Text style={styles.head2}>Rs.{data.foodprice}/-</Text>
        </View>

       <View style={styles.s3}>
        <Text style={styles.head3}>About Food</Text>
        <Text style={styles.head4}>{data.fooddescription}</Text>

        <View style={styles.s3in}>
            {data.foodtype == 'veg' ? <Text style={vegetarian}></Text> : <Text style={nonvegetarian}></Text>}
            <Text style={styles.head5}>{data.foodtype}</Text>
        </View>
       </View>


       <View style={styles.contrest}>
                <Text style={styles.txt1}>Location</Text>
                <Text style={styles.txt2}>{data.restaurantname}</Text>
                <View style={styles.contrestin}>
                    <Text style={styles.txt3}>{data.restaurantaddressbuilding}</Text>
                    <View style={styles.dash}></View>
                    <Text style={styles.txt3}>{data.restaurantaddressstreet}</Text>
                    <View style={styles.dash}></View>
                    <Text style={styles.txt3}>{data.restaurantaddresscity}</Text>
                </View>
        </View>

        <View style={styles.cont3}>
            <View style={hr80}></View>
            <Text style={styles.txt5}>Food Quantity</Text>
            <View style={incdecout}>
                <TouchableOpacity onPress={()=>increaseQuantity()}>
                    <Text style={incdecbtn}>+</Text>
                </TouchableOpacity>
                <TextInput value={quantity} style={incdecinput}/>
                <TouchableOpacity onPress={()=>decreaseQuantity()}>
                    <Text style={incdecbtn}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={hr80}></View>
        </View>

            {data.addonprice != '' &&
             <View style={styles.addoncont}>
                <Text style={styles.txt5}>Add Extra</Text>
                <View style={styles.c3in}>
                    <Text style={styles.text4}>{data.addon}  <Text style={styles.text4}>Rs.{data.addonprice}/-</Text></Text>
                    
                    <View style={incdecout}>
                        <TouchableOpacity onPress={()=>increaseAddonQuantity()}>
                            <Text style={incdecbtn}>+</Text>
                        </TouchableOpacity>
                        <TextInput value={addonquantity} style={incdecinput}/>
                        <TouchableOpacity onPress={()=>decreaseAddonQuantity()}>
                            <Text style={incdecbtn}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={hr80}></View>
                </View>
                
            </View>}

      </View>
      
</View>

     <View style={styles.contprice}>
        <View style={styles.c4in}>
            <Text style={styles.txt2}>Total Price</Text>
            {data.addonprice != '' ? <Text style={styles.txt6}>
                Rs.{((parseInt(data.foodprice) * parseInt(quantity))
            + parseInt(addonquantity)*parseInt(data.addonprice)).toString()}/-
            </Text>:
            <Text style={styles.txt6}>
                Rs.{(parseInt(data.foodprice) * parseInt(quantity)).toString()}/-
            </Text>}
        </View>
        <View style={styles.line}></View>
     </View>




      <View style={styles.btncont}>
        <TouchableOpacity style={btn2} onPress={()=>addtocart()}>
            <Text style={styles.btntext}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={btn2} onPress={()=>{navigation.navigate('Placeorder',{ cartdata: JSON.parse(cartdata).cart })}}>
            <Text style={styles.btntext}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      

    </ScrollView>
  )
}

export default ProductPage

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        width:"100%"
    },
    container1:{
        //position:"absolute",
        //top:0,
        flex:1,
        backgroundColor:"#fff",
       // alignItems:"center",
       // justifyContent:"center"
    },
    cardimgin:{
        width:"100%",
        height:"100%"
    },
    s1:{
        width:"100%",
        height:300,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
    },
    s2:{
        width:"100%",
        padding:20
    },
    s2in:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:10
    },
    head1:{
        fontSize:25,
        fontWeight:"500",
        color:colors.text1,
        width:200,
        marginRight:10
    },
    head2:{
        fontSize:25,
        fontWeight:"300",
        color:colors.text3
    },
    s3:{
        backgroundColor:colors.text1,
        padding:20,
        borderRadius:20
    },
    head3:{
        fontSize:30,
        fontWeight:"200",
        color:colors.col1
    },
    head4:{
        marginVertical:10,
        fontSize:20,
        fontWeight:"400",
        color:colors.col1
    },
    s3in:{
        backgroundColor:colors.col1,
        padding:10,
        borderRadius:10,
        width:130,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    head5:{
        color:colors.text3,
        fontSize:20,
        fontWeight:"200",
        marginLeft:10,
        top:-2
    },
    btncont:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        marginTop:-5,
        flexDirection:"row",
        backgroundColor:colors.col1
    },
    btntext:{
        backgroundColor:colors.text1,
        color:colors.col1,
        paddingHorizontal:10,
        paddingVertical:5,
        fontSize:20,
        borderRadius:10,
        width:"90%",
        textAlign:"center"
    },
    contrest:{
        width:"90%",
        padding:20,
        backgroundColor:colors.col1,
        borderRadius:20,
        alignSelf:"center",
        marginVertical:10,
        elevation:10,
        alignItems:"center"
    },
    txt1:{
        color:colors.text1,
        fontSize:20,
        fontWeight:"200",
    },
    txt2:{
        color:colors.text3,
        fontSize:30,
        fontWeight:"200",
        marginVertical:10
    },
    contrestin:{
        flexDirection:"row",
        alignItems:"center"
    },
    txt3:{
        fontSize:16,
        color:colors.text1,
        width:"30%",
        textAlign:"center"
    },
    dash:{
        width:1,
        height:20,
        backgroundColor:colors.text1,
        marginHorizontal:10
    },
    cont3:{
        width:"90%",
        alignItems:"center",
        alignSelf:"center"
    },
    txt5:{
        fontSize:16,
        color:colors.text1,
        //width:"30%",
        textAlign:"center"
    },
    c3in:{
        width:"90%",
        alignItems:"center",
        alignSelf:"center"
    },
    text4:{
        color:colors.text3,
        fontSize:20,
        marginHorizontal:10
    },
    contprice:{
        width:"90%",
        alignItems:"center",
        alignItems:"center"
    },
    c4in:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        width:"100%",
        alignItems:"center"
    },
    txt6:{
        fontSize:25,
        color:"green",
        //width:"30%",
        textAlign:"center",
        left:20,
        top:1
    },
    line:{
        width:"75%",
       borderBottomColor:"#E0E0E0",
       borderBottomWidth:1,
       marginVertical:20,
       left:16
    },
})