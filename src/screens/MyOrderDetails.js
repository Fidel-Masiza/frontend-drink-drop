import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { colors } from '../globals/style';

const MyOrderDetails = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/drinks/order/${orderId}/`);
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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
      <Text style={styles.title}>Order Details #{orderId}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items:</Text>
        {orderDetails.items?.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>
              {item.product_name} ({item.product_brand})
            </Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemText}>Price: ${item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Store: {orderDetails.store?.store_name}</Text>
        {orderDetails.store?.address && (
          <Text style={styles.storeAddress}>Location:{orderDetails.store.address}</Text>
        )}
        <Text style={styles.summaryText}>Total: ${orderDetails.total_amount}</Text>
        <Text style={styles.summaryText}>Status: {orderDetails.status}</Text>
        <Text style={styles.date}>
          Ordered: {new Date(orderDetails.created_at).toLocaleString()}
        </Text>
      </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text1,
    marginBottom: 10,
  },
  item: {
    backgroundColor: colors.col2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text1,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: colors.text3,
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: colors.text2,
    paddingTop: 15,
  },
  summaryText: {
    fontSize: 16,
    color: colors.text1,
    marginBottom: 8,
  },
  storeAddress: {
    fontSize: 14,
    color: colors.text2,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.text2,
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MyOrderDetails;