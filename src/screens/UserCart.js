import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { firebase } from '../../FireBase/FirebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { navbtn, navbtnin, navbtnout, colors, btn2 } from '../globals/style';
import BottomNav from '../components/BottomNav';

const UserCart = ({navigation}) => {
    const [cartdata,setCartData] = useState(null);
    const [totalcost,setTotalCost] = useState('0');

    const getCartData = async () =>{
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid) 
        docRef.get().then((doc)=>{
            if(doc.exists){
               // console.log('data exists')
               const data = JSON.stringify(doc.data());
              // console.log(data);
               setCartData(data);
            }
            else{
                console.log('no such document')
            }
        }).catch((error)=>{
            console.log('error getting documents: ', error)
        })
    }

    useEffect(()=>{
        getCartData();
    },[])

    useEffect(() => {
      if (cartdata != null) {
        const fooodprice = JSON.parse(cartdata).cart;
        let totalfoodprice = 0;
    
        fooodprice.map((item) => {
          const foodPrice = parseInt(item.data.foodprice) * parseInt(item.Foodquantity);
          const addonPrice = item.Addonquantity > 0 ? (parseInt(item.data.addonprice) * parseInt(item.Addonquantity)) : 0;
          
          totalfoodprice = foodPrice + addonPrice + totalfoodprice;
        });
    
        setTotalCost(JSON.stringify(totalfoodprice));
      }
    }, [cartdata]);
    
   //console.log(cartdata)
  
  const deleteItem = (item) => {
    const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
    docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(item)
    })
    
    getCartData();
  }

  

   // console.log(cartdata)
  return (
    <View style={styles.containerout}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name='back' size={24} color='black' style={navbtnin}/>
        </View>
      </TouchableOpacity>

      <View style={styles.bottomnav}>
          <BottomNav navigation={navigation}/>
      </View>

      <View style={styles.container}>
        <Text style={styles.head1}>Your Cart</Text>
        {cartdata == null || JSON.parse(cartdata).cart.length == 0 ? 
        <Text style={styles.head2}>Your Cart is Empty.</Text> 
        : 
        <FlatList style={styles.cardlist} data={JSON.parse(cartdata).cart}
        renderItem={({item})=>{
          return(
            //<Text>{item.data.foodname}</Text>
            <View style={styles.cartcard}>
              <Image source={{ uri:item.data.foodimageurl}} style={styles.cartimg}/>
              <View style={styles.cartcardin}>
                <View style={styles.c1}>
                  <Text style={styles.txt1}>{item.Foodquantity}&nbsp;{item.data.foodname}</Text>
                  <Text style={styles.txt2}> Rs.{item.data.foodprice}/-</Text>
                </View>
                {item.Addonquantity > 0 && <View style={styles.c2}>
                <Text style={styles.txt3}>{item.Addonquantity}&nbsp;{item.data.addon}</Text>
                <Text style={styles.txt3}>Rs.{item.data.addonprice}/-</Text></View>}
                <TouchableOpacity style={styles.c4} onPress={()=>deleteItem(item)}>
                  <Text style={styles.txt1}>Delete</Text>
                  <AntDesign name='delete' size={24} color='black' style={styles.del}/>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}/>
        }
        <View style={styles.btncont}>
          <View style={styles.c3}>
            <Text style={styles.txt5}>Total</Text>
            <Text style={styles.txt6}> Rs.{totalcost}/-</Text>
          </View>
          <TouchableOpacity style={btn2} onPress={()=>navigation.navigate('Placeorder', { cartdata: JSON.parse(cartdata).cart })}>
                <Text style={styles.btntext}>Place Order</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default UserCart

const styles = StyleSheet.create({
  containerout: {},
  bottomnav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: colors.col1,
    zIndex: 20
  },
  containerout: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
  },
  head1: {
    fontSize: 40,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "200",
    color: colors.text1
  },
  head2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "200",
    marginVertical: 20,
    elevation: 10,
    backgroundColor: colors.col1,
    width: "90%",
    height: "50%",
    alignSelf: "center",
    paddingVertical: 25,
    borderRadius: 10
  },
  cardlist: {
    width: "100%"
  },
  cartimg: {
    width: 150,
    height: 100,
    borderRadius: 10
  },
  cartcard: {
    flexDirection: "row",
    backgroundColor: colors.col1,
    marginVertical: 5,
    borderRadius: 10,
    width: "97%",
    alignSelf: "center",
    elevation: 10,
    alignItems: "center"
  },
  cartcardin: {
    flexDirection: "column",
    margin: 5,
    width: "54%", // Reduced width to fit contents better
    alignItems: "center",
    justifyContent: "center"
  },
  c1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.col1,
    borderRadius: 10,
    padding: 5
  },
  c2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%", // Changed width to 90% to prevent overflow
    backgroundColor: colors.text1,
    borderRadius: 10,
    padding: 5,
    alignItems: "center"
  },
  txt1:{
    fontSize:15.5,
    color:colors.text1,
    width:"67%",
    fontWeight:"bold"
  },
  txt2:{
    fontSize:14,
    color:colors.text3,
    //width:"60%",
    fontWeight:"bold",
  },
  txt3:{
    fontSize:12,
    color:colors.col1
  },
  del:{
    color:colors.text1
  },
  c4:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    width:100,
    borderRadius:10,
    borderColor: colors.text1,
    borderWidth:1,
    marginVertical:10,
    padding:5
  },
  btncont:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    marginTop:0,
    flexDirection:"row",
    marginBottom:80,
    borderTopColor:colors.text3,
    borderTopWidth:0.2
  },
  btntext:{
    backgroundColor:colors.text1,
    color:colors.col1,
    paddingVertical:5,
    paddingHorizontal:10,
    fontSize:20,
    borderRadius:10,
    width:"90%",
    textAlign:"center"
  },
  txt5:{
    fontSize:20,
    color:colors.text3,
    marginHorizontal:5
  },
  c3:{
    flexDirection:"row",
    alignItems:"center"
  },
  txt6:{
    fontSize:25,
    color:colors.text3,
    marginHorizontal:5,
    fontWeight:"bold"
  },
});
