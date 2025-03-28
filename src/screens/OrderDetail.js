import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const OrderDetail = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/drinks/order/${orderId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
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
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order details not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order Details #{orderId}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items:</Text>
        {orderDetails.items?.length > 0 ? (
          orderDetails.items.map((item, index) => (
            <View key={`item-${index}`} style={styles.item}>
              <Text style={styles.itemName}>
                {item.product_name} ({item.product_brand})
              </Text>
              <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
              <Text style={styles.itemDetails}>Price: Ksh{item.price}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noItems}>No items in this order</Text>
        )}
      </View>

      <View style={styles.summary}>
        <Text style={styles.total}>Total: Ksh{orderDetails.total_amount}</Text>
        <Text style={styles.status}>Status: {orderDetails.status}</Text>
        <Text style={styles.date}>
          Ordered: {new Date(orderDetails.created_at).toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1A535C',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  item: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A535C',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  summary: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 15,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  status: {
    fontSize: 16,
    color: '#e67e22',
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noItems: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OrderDetail;