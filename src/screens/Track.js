import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { colors } from '../globals/style';

const Track = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Track Your Order</Text>

      {/* Item List Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Item List</Text>
        <Text style={styles.placeholderText}>Your items will appear here once ordered.</Text>
      </View>

      {/* Total Price */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Price</Text>
        <Text style={styles.placeholderText}>Ksh 0.00</Text>
      </View>

      {/* Rider Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rider Information</Text>
        <View style={styles.riderInfo}>
          <FontAwesome name="user" size={20} color={colors.text1} />
          <Text style={styles.placeholderText}>Rider Name: Not Assigned</Text>
        </View>
        <View style={styles.riderInfo}>
          <FontAwesome name="phone" size={20} color={colors.text1} />
          <Text style={styles.placeholderText}>Rider Number: Not Assigned</Text>
        </View>
      </View>

      {/* Tracking Progress Flow */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.progressFlow}>
          {/* Order in Progress */}
          <View style={styles.progressStep}>
            <MaterialIcons name="local-shipping" size={30} color={colors.text1} />
            <Text style={styles.progressText}>Order in Progress</Text>
          </View>

          {/* Order Delivered */}
          <View style={styles.progressStep}>
            <MaterialIcons name="check-circle" size={30} color="green" />
            <Text style={[styles.progressText, { color: 'green', fontWeight: 'bold' }]}>
              Order Delivered
            </Text>
          </View>
        </View>
      </View>

      {/* Time and Distance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estimated Time & Distance</Text>
        <View style={styles.timeDistance}>
          <MaterialIcons name="access-time" size={20} color={colors.text1} />
          <Text style={styles.placeholderText}>Time: 20 mins</Text>
        </View>
        <View style={styles.timeDistance}>
          <MaterialIcons name="place" size={20} color={colors.text1} />
          <Text style={styles.placeholderText}>Distance: 5 km</Text>
        </View>
      </View>

      {/* Call Rider Button */}
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>Call Rider</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.col1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text1,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text1,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.text3,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressFlow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: colors.text1,
    marginTop: 5,
  },
  timeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: colors.text1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40, // Added margin to ensure button is visible
  },
  callButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.col1,
  },
});