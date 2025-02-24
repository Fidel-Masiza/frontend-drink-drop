import { StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import BottomNav from '../components/BottomNav';
import { colors } from '../globals/style';
import { firebase } from '../../FireBase/FirebaseConfig';

const TrackOrder = ({navigation}) => {

    const [orders,setOrders] = useState([]);

    const  getOrders = async () => {
        const ordersRef = firebase.firestore().collection('UserOrder').where("orderuserid", '==', firebase.auth().currentUser.uid);
        ordersRef.onSnapshot(snapshot=>{
            setOrders(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(()=>{
        getOrders();
    },[])

    //console.log(orders);


    const convertDate = (date) => {
        let newDate = new Date(date.seconds * 1000)
        return newDate.toDateString()
    }

    const cancelOrder = (orderitem)=>{
        const ordersRef = firebase.firestore().collection('UserOrder')
        .doc(orderitem.orderid);
        ordersRef.update({
            orderstatus: 'cancelled'
        })
        getOrders();
    }

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation}/>
      
        <View style={styles.bottomnav}>
          <BottomNav navigation={navigation}/>
        </View>

        <ScrollView style={styles.containerin}>
            <Text style={styles.head1}>Track Orders</Text>
            {orders.sort(
                (a,b)=>{
                    b.orderdate.seconds - a.orderdate.seconds
                }
            ).map((order,index)=>{
                return(
                    <View style={styles.ordercard} key={index}>
                        <Text style={styles.orderindex}>{index + 1}</Text>
                        <Text style={styles.ordertxt2}>order id: {order.orderid}</Text>
                        <Text style={styles.ordertxt2}>order date: {convertDate(order.orderdate)}</Text>
                        {order.orderstatus == 'ontheway' && <Text style={styles.orderotw}>Your order is on the way.</Text>}
                        {order.orderstatus == 'delivered' && <Text style={styles.orderdelivered}>Your order is delivered.</Text>}
                        {order.orderstatus == 'cancelled' && <Text style={styles.ordercancelled}>Your order is cancelled.</Text>}
                        {order.orderstatus == 'pending' && <Text style={styles.orderpending}>Your order is pending.</Text>}


                        <View style={styles.row1}>
                            <Text style={styles.ordertxt1}>Delivery Agent Name & Contact:</Text>
                            {order.deliveryboy_name ? <Text style={styles.ordertxt2}>{order.deliveryboy_name}</Text>
                            : <Text style={styles.ordertxt2}>Not Assigned.</Text>}
                            {order.deliveryboy_phoneno ? <Text style={styles.ordertxt2}>{order.deliveryboy_phoneno}</Text> : null}
                        </View>

                        <FlatList 
          style={styles.c1} 
          data={order.orderdata} 
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

        <Text style={styles.txt6}>Total: Rs.{order.ordercost}/-</Text>

            {order.orderstatus === 'delivered' ? <Text style={styles.ordertxt3}>Thank You for ordering.</Text> : null}
            {order.orderstatus === 'cancelled' ? <Text style={styles.ordertxt3}>Your order was cancelled.</Text> : null}

            {order.orderstatus != 'cancelled' && order.orderstatus != 'delivered' ? <TouchableOpacity style={styles.cancelbtn} 
            onPress={() => cancelOrder(order)}>
                <Text style={styles.cancelbtnin}>Cancel Order</Text>
            </TouchableOpacity> : null}


            </View>
        )
    })
}
        </ScrollView>



    </View>
  )
}

export default TrackOrder

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.col1,
        width:"100%",
        height:"100%",
    },
    bottomnav:{
        position:"absolute",
        bottom:0,
        width:"100%",
        backgroundColor:colors.col1,
        zIndex:20
    },
    containerin:{
        marginTop:10,
        flex:1,
        width:"100%",
        height:"100%",
        backgroundColor:colors.col1,
        marginBottom:100
    },
    head1:{
        fontSize:30,
        color:colors.text1,
        textAlign:"center",
        marginVertical:20
    },
    rowout: {
        flexDirection:"column",
        margin:10,
        elevation:10,
        backgroundColor:colors.col1,
        padding:10,
        borderRadius:10,
      },
      row:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:5,
        justifyContent:"space-between"
      },
      row1:{
        flexDirection:"column",
        margin:10,
        backgroundColor:colors.col1,
        padding:10,
        borderRadius:10,
        justifyContent:"center",
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
      right: {
        flexDirection:'row',
        alignItems:'center'
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
      ordertxt1:{
        fontSize:20,
        color:colors.text1,
        textAlign:"center",
        marginVertical:10
      },
      ordertxt2:{
        fontSize:17,
        fontWeight:"bold",
        marginVertical:5,
        color:colors.text3,
        textAlign:"center"
      },
      orderindex:{
        fontSize:20,
        color:colors.col1,
        backgroundColor:colors.text1,
        textAlign:"center",
        borderRadius:30,
        padding:5,
        width:30,
        position:"absolute",
        top:10,
        left:10
      },
      ordertxt3:{
        fontSize:17,
        color:colors.text3,
        textAlign:"center",
        marginVertical:5,
        borderColor:colors.text1,
        borderWidth:1,
        borderRadius:10,
        padding:5,
        fontWeight:"400"
      },
      cancelbtn:{
        alignSelf:"center",
        backgroundColor:colors.text1,
        padding:10,
        borderRadius:10,
        marginVertical:10,
      },
      cancelbtnin:{
        fontSize:20,
        color:colors.col1,
        textAlign:"center",
        fontWeight:"bold"
      },
      orderotw:{
        fontSize:20,
        backgroundColor:"orange",
        color:"white",
        textAlign:"center",
        borderRadius:10,
        padding:5,
        marginVertical:10,
        paddingHorizontal:20,
        alignSelf:"center"
      },
      orderdelivered:{
        fontSize:20,
        backgroundColor:"green",
        color:"white",
        textAlign:"center",
        borderRadius:10,
        padding:5,
        marginVertical:10,
        paddingHorizontal:20,
        alignSelf:"center"
      },
      ordercancelled:{
        fontSize:20,
        backgroundColor:"red",
        color:"white",
        textAlign:"center",
        borderRadius:10,
        padding:5,
        marginVertical:10,
        paddingHorizontal:20,
        alignSelf:"center"
      },
      orderpending:{
        fontSize:20,
        backgroundColor:"yellow",
        color:"black",
        textAlign:"center",
        borderRadius:10,
        padding:5,
        marginVertical:10,
        paddingHorizontal:20,
        alignSelf:"center"
      },
      title1: {
        fontSize:15,
        fontWeight:'bold',
        marginRight:10
      },
      txt6:{
        fontSize:20,
        color:colors.text3,
        marginHorizontal:5,
        fontWeight:"bold",
        paddingBottom:10,
        textAlign:"left",
        alignSelf:"flex-end"
      },
})