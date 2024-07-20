import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const Checkout = () => {
  const TOKEN_KEY = 'abcd123';
  const navigation = useNavigation();
  const route = useRoute();
  const total = route.params.total;

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleCheckout = async () => {
    try {
      const requestBody = {
        street,
        city,
        state,
        zip
      };

      // Replace 'YOUR_API_ENDPOINT' with your actual backend endpoint
      const tokenResponse = await SecureStore.getItemAsync(TOKEN_KEY);
      const { token } = JSON.parse(tokenResponse || '{}');
      const response = await axios.post('http://192.168.56.1:3007/fyp/store/checkout', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
console.log(response.status)
   
      console.log('Checkout successful:', response.data.url);
      console.log(response.config.data.url)
      Linking.openURL(response.data.url);
  
      Alert.alert('Success', 'Checkout successful!');
      navigation.navigate('HomePage'); 

    } catch (error) {
      console.error('Error during checkout:', error);

      Alert.alert('Error', 'Checkout failed. Please try again.');
    }
  };

  // Function to determine if checkout button should be disabled
  const isCheckoutDisabled = () => {
    return !street || !city || !state || !zip;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Blue Gradient Background */}
      <View style={styles.blueContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Make The Payment</Text>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('ShoppingCart')}>
            <MaterialCommunityIcons name="shopping-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Total Amount Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${total}</Text>
        </View>
      </View>

      {/* Lower Body */}
      <View style={styles.lowerBody}>
        {/* Form */}
        <View style={styles.formField}>
          <Text style={styles.label}>Street</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your street"
              placeholderTextColor="#999"
              value={street}
              onChangeText={(text) => setStreet(text)}
            />
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>City</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              placeholderTextColor="#999"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>State</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your state"
              placeholderTextColor="#999"
              value={state}
              onChangeText={(text) => setState(text)}
            />
          </View>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Zip</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your zip code"
              placeholderTextColor="#999"
              value={zip}
              onChangeText={(text) => setZip(text)}
            />
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: isCheckoutDisabled() ? '#ccc' : '#072E33' }]}
          disabled={isCheckoutDisabled()}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  blueContainer: {
    height: '35%',
    backgroundColor: '#072E33',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  backIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  totalSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalLabel: {
    color: 'white',
    fontSize: 28,
    marginTop: 15,
  },
  totalAmount: {
    color: 'white',
    fontSize: 50,
    fontWeight: '300',
    marginTop: 5,
  },
  lowerBody: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  formField: {
    marginBottom: 35,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  checkoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 15,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;
