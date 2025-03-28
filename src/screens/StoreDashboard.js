import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  ActivityIndicator,
  Alert 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import deliveryboylogo from '../../assets/liqor-page2.png';

const StoreDashboard = ({ navigation, route }) => {
  const { username } = route.params;
  const [storeData, setStoreData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const statusColors = {
    pending: '#f1c40f',
    in_progress: '#2ecc71',
    completed: '#3498db',
    cancelled: '#e74c3c',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeRes, ordersRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/drinks/store/${username}/`),
          fetch(`http://127.0.0.1:8000/drinks/orders/${username}/`)
        ]);
        
        const storeData = await storeRes.json();
        const ordersData = await ordersRes.json();
        
        setStoreData(storeData);
        setOrders(ordersData);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/drinks/orders/${orderId}/update-status/`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            status: newStatus,
            username: username
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Status update failed');
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderStatusButtons = (order) => {
    const buttonConfig = {
      pending: [
        { label: 'Start Order', status: 'in_progress', color: '#2ecc71' },
        { label: 'Reject', status: 'cancelled', color: '#e74c3c' }
      ],
      in_progress: [
        { label: 'Complete', status: 'completed', color: '#3498db' }
      ],
      completed: [],
      cancelled: []
    };

    // Add fallback for unknown statuses
    const buttons = buttonConfig[order.status] || [];
    
    return buttons.map((btn) => (
      <TouchableOpacity
        key={btn.status}
        style={[styles.statusButton, { backgroundColor: btn.color }]}
        onPress={() => handleStatusUpdate(order.id, btn.status)}
      >
        <Text style={styles.buttonText}>{btn.label}</Text>
      </TouchableOpacity>
    ));
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => setIsSidebarOpen(!isSidebarOpen)} style={styles.sidebarToggle}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.storeInfo}>
          <Image 
            source={storeData?.store_logo ? { uri: storeData.store_logo } : deliveryboylogo} 
            style={styles.storeLogo} 
          />
          <View>
            <Text style={styles.storeName}>{storeData?.store_name || 'My Store'}</Text>
            <Text style={styles.storeAddress}>{storeData?.address}</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('AllRiders', { username })}
          style={styles.ridersButton}
        >
          <Feather name="users" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dashboard Content */}
      <ScrollView contentContainerStyle={styles.dashboardContent}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        
        {orders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>
                {new Date(order.created_at).toLocaleDateString()}
              </Text>
            </View>
            
            <Text style={styles.orderUser}>Customer: {order.username}</Text>
            <Text style={styles.orderAmount}>Total: Ksh{order.total_amount}</Text>
            
            <View style={styles.statusContainer}>
              <Text style={[
                styles.statusText,
                { color: statusColors[order.status] || '#666' }
              ]}>
                {order.status?.toUpperCase() || 'UNKNOWN STATUS'}
              </Text>
              <View style={styles.buttonContainer}>
                {renderStatusButtons(order)}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A535C',
    padding: 15,
    paddingTop: 40,
  },
  sidebarToggle: {
    padding: 5,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    flex: 1,
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  storeAddress: {
    fontSize: 12,
    color: 'white',
  },
  ridersButton: {
    marginLeft: 15,
    padding: 5,
  },
  dashboardContent: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A535C',
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A535C',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderUser: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default StoreDashboard;