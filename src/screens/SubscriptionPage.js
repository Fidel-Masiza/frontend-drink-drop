import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const SubscriptionPage = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Function to handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    console.log(`Selected Plan: ${plan}`);
  };

  // Function to handle subscription
  const handleSubscribe = (plan) => {
    alert(`Subscribed to ${plan} plan!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Choose Your Plan</Text>
      <View style={styles.cardsContainer}>
        {/* Monthly Plan Card */}
        <TouchableOpacity
          style={[
            styles.card,
            selectedPlan === 'monthly' && styles.selectedCard,
          ]}
          onPress={() => handlePlanSelect('monthly')}
        >
          <MaterialIcons name="date-range" size={40} color="#FF6B6B" />
          <Text style={styles.cardTitle}>Monthly Plan</Text>
          <Text style={styles.cardPrice}>Ksh 600/month</Text>
          <Text style={styles.cardDescription}>
            Perfect for short-term commitments. Cancel anytime.
          </Text>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => handleSubscribe('monthly')}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Yearly Plan Card */}
        <TouchableOpacity
          style={[
            styles.card,
            selectedPlan === 'yearly' && styles.selectedCard,
          ]}
          onPress={() => handlePlanSelect('yearly')}
        >
          <FontAwesome name="calendar-check-o" size={40} color="#4ECDC4" />
          <Text style={styles.cardTitle}>Yearly Plan</Text>
          <Text style={styles.cardPrice}>Ksh 5000/year</Text>
          <Text style={styles.cardDescription}>
            Best value! Save 30% compared to monthly plans.
          </Text>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => handleSubscribe('yearly')}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7FFF7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1A535C',
    marginBottom: 30,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '90%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 400, // Ensures cards don't get too wide on large screens
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedCard: {
    borderColor: '#4ECDC4',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A535C',
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF6B6B',
    marginVertical: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SubscriptionPage;