import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const AllRiders = ({ navigation, route }) => {
  const { username } = route.params;
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/drinks/store-riders/${username}/`);
        const data = await response.json();
        
        if (response.ok) {
          setRiders(data);
        } else {
          throw new Error(data.error || 'Failed to fetch riders');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, [username]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Store Riders</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {riders.length > 0 ? (
          riders.map((rider, index) => (
            <View key={index} style={styles.riderCard}>
              <Text style={styles.riderName}>{rider.name}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Phone:</Text>
                <Text style={styles.detailValue}>{rider.phone}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailLabel}>Password:</Text>
                <Text style={styles.detailValue}>{rider.password}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noRidersText}>No riders registered for this store</Text>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A535C',
    padding: 15,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    padding: 15,
  },
  riderCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A535C',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  noRidersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default AllRiders;