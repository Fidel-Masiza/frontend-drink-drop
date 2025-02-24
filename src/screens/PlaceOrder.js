import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { navbtn, navbtnin, navbtnout, colors, hr80, btn2, btn1 } from '../globals/style';
import { firebase } from '../../FireBase/FirebaseConfig';

const PlaceOrder = ({ navigation,route }) => { 
  const { cartdata } = route.params;
  const [orderdata, setOrderData] = useState([]);
  const [totalcost, setTotalCost] = useState('0');

  useEffect(() => {
    setOrderData(cartdata);
  }, [cartdata]);

  useEffect(() => {
    if (cartdata != null) {
      const fooodprice = cartdata;
      let totalfoodprice = 0;
  
      fooodprice.map((item) => {
        const foodPrice = parseInt(item.data.foodprice) * parseInt(item.Foodquantity);
        const addonPrice = item.Addonquantity > 0 ? (parseInt(item.data.addonprice) * parseInt(item.Addonquantity)) : 0;
        
        totalfoodprice = foodPrice + addonPrice + totalfoodprice;
      });
  
      setTotalCost(totalfoodprice);
    }
  }, [cartdata]);

  const [userloggeduid, setUserloggeduid] = useState(null);
 const [userdata, setuserdata] = useState(null);
  
    useEffect(() => {
      const checklogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUserloggeduid(user.uid);
          } else {
            setUserloggeduid(null);
            //navigation.navigate('Home')
          }
        });
      };
      checklogin();
    }, []);
  
  //console.log(userlogged?.uid);

  useEffect(()=>{
    const getuserdata = async  () => {
      const docRef = firebase.firestore().collection('UserData').where('uid','==',userloggeduid)
      const doc = await docRef.get();
      if(!doc.empty){
        doc.forEach((doc)=>{
          //console.log(doc.data())
          setuserdata(doc.data())
        })
      }
      else{
        //navigation.navigate('Login')
        console.log('no such document')
      }
    }
    getuserdata()

  },[userloggeduid])

  console.log(userdata)

  const placenow = () => {
    const docRef = firebase.firestore().collection('UserOrder').doc(new Date().getTime().toString());
    docRef.set({
      orderid: docRef.id,
      orderdata: orderdata,
      orderstatus: 'pending',
      ordercost: totalcost,
      orderdate: firebase.firestore.FieldValue.serverTimestamp(),
      orderaddress: userdata.address,
      ordername: userdata.name,
      orderemail: userdata.email,
      orderuserid: userloggeduid,
      orderpayment: 'online',
      paymenttotal: 'paid'
    }).then(()=>{
      alert('Order is Placed Successfully.')
    })
  }




  return (
    <View style={styles.containerout}>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <View style={navbtn}>
          <AntDesign name='back' size={24} color='black' style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.head1}>Your Order Summary</Text>
        
        {/* Using FlatList without ScrollView */}
        <FlatList 
          style={styles.c1} 
          data={orderdata} 
          keyExtractor={(item, index) => index.toString()} // Use keyExtractor for FlatList
          renderItem={({ item }) => {
            return (
              <View style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.Foodquantity}</Text>
                    <Text style={styles.title}>{item.data.foodname}</Text>
                    
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalprice}>
                      Rs.{parseInt(item.Foodquantity) * parseInt(item.data.foodprice)}/-
                    </Text>
                  </View>
                </View>

                {item.Addonquantity > 0 && (
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{item.Addonquantity}</Text>
                      <Text style={styles.title1}>{item.data.addon}</Text>
                      
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalprice}>
                        Rs.{parseInt(item.Addonquantity) * parseInt(item.data.addonprice)}/-
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />

      </View>
      <View style={styles.dash}></View>


      <View style={styles.row}>
        <View style={styles.left1}>
          <Text style={styles.title}>Order Total:</Text>
        </View>
        <View style={styles.left2}>
          <Text style={styles.totalprice}>Rs.{totalcost}/-</Text>
        </View>
      </View>

      <View style={styles.dash}></View>

      <View style={styles.userdataout}>
        <Text style={styles.head1}>Your Details:</Text>
        <View style={styles.row}>
          <View style={styles.lefttitle}>
            <Text style={styles.title}>Name: </Text>
          </View>
          <View style={styles.leftname}>
            <Text style={styles.title}>{userdata?.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.lefttitle}>
            <Text style={styles.title}>Email: </Text>
          </View>
          <View style={styles.leftname}>
            <Text style={styles.title}>{userdata?.email}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.lefttitle}>
            <Text style={styles.title}>Address: </Text>
          </View>
          <View style={styles.leftname}>
            <Text style={styles.title}>{userdata?.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.dash}></View>

      <View style={styles.btncont}>
      <TouchableOpacity style={styles.btnpayment} onPress={()=>placenow()}>
                <Text style={styles.btntext}>Proceed to Payment</Text>
          </TouchableOpacity>

      </View>


    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  containerout: {
   // up:100
  },
  head1: {
    fontSize:30,
    fontWeight:"200",
    color:colors.text1,
    margin:10,
    textAlign:"center"
  },
  container: {
    flexDirection:"column",
    alignItems:"center",
    marginTop:-20
  },
  rowin: {},
  rowout: {
    flexDirection:"column",
    margin:10,
    elevation:10,
    backgroundColor:colors.col1,
    padding:10,
    borderRadius:10,
  },
  left: {
    flexDirection:"row",
    alignItems:"center"
  },
  qty: {
    width:40,
    height:30,
    backgroundColor:colors.text1,
    borderRadius:10,
    textAlign:"center",
    textAlignVertical:"center",
    marginRight:10,
    color:colors.col1,
    fontSize:17,
    fontWeight:'bold'
  },
  title: {
    fontSize:17,
    fontWeight:'bold',
    marginRight:10
  },
  price1: {
    fontSize:15,
    fontWeight:'bold',
    marginRight:20,
    color:colors.text1
  },
  totalprice: {
    fontSize:17,
    fontWeight:'bold',
    borderColor:colors.text1,
    borderWidth:1,
    borderRadius:10,
    padding:5,
   // marginRight:-20
  },
  right: {
    flexDirection:'row',
    alignItems:'center'
  },
  c1: {},
  row:{
    flexDirection:"row",
    alignItems:"center",
    marginVertical:5,
    justifyContent:"space-between"
  },
  dash:{
    width:"85%",
    borderBottomColor:"#E0E0E0",
    borderBottomWidth:1,
    marginHorizontal:26,
    marginVertical:16
    
  },
  title1: {
    fontSize:15,
    fontWeight:'bold',
    marginRight:10
  },
  left1:{
    marginLeft:20
  },
  left2:{
    marginRight:20
  },
  lefttitle:{
    marginLeft:60
  },
  leftname:{
    marginRight:60
  },
  btntext:{
    fontSize:20,
    color:colors.col1,
    fontWeight:'bold',
    margin:10
  },
  btncont:{
    flexDirection:"row",
    alignItems:"center",
    alignSelf:"center",
    justifyContent:"center"
  },
  btnpayment:{
    width:"60%",
    backgroundColor: 'red',
    height:50,
    borderRadius: 10,
    elevation:10,
    alignItems:"center",
    justifyContent:"center",
    color:"white",
    //marginBottom:-5
},
});
