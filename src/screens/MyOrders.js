import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../globals/style';

const MyOrders = ({ navigation, route }) => {
  const { username } = route.params;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/drinks/orders/user/${username}/`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>No orders found</Text>
      ) : (
        orders.map(order => (
          <TouchableOpacity 
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('MyOrderDetails', { orderId: order.id })}
          >
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <Text style={styles.store}>Store: {order.store?.store_name}</Text>
           <Text style={styles.storeAddress}>Location:{order.store?.address}</Text>
            <Text style={styles.status}>Status: {order.status}</Text>
            <Text style={styles.total}>Total: ${order.total_amount}</Text>
            <Text style={styles.date}>{new Date(order.created_at).toLocaleDateString()}</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.col1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text1,
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: colors.col2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text1,
    marginBottom: 5,
  },
storeAddress: {
    fontSize: 14,
    color: colors.text2,
    marginBottom: 3,
  },
  store: {
    fontSize: 16,
    color: colors.text3,
    marginBottom: 3,
  },
  status: {
    fontSize: 16,
    color: colors.text3,
    marginBottom: 3,
  },
  total: {
    fontSize: 16,
    color: colors.text1,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: colors.text2,
    marginTop: 5,
  },
  noOrders: {
    fontSize: 16,
    color: colors.text2,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MyOrders;