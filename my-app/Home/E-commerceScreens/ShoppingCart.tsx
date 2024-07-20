import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, Entypo, Feather,MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const ShoppingCart = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const TOKEN_KEY = 'abcd123';
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const tokenResponse = await SecureStore.getItemAsync(TOKEN_KEY);
        const { token } = JSON.parse(tokenResponse || '{}');

        if (token) {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await fetch('http://192.168.56.1:3007/fyp/store/usercart', requestOptions);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          if (responseData.items) {
            setCartItems(responseData.items);
            calculateSubtotal(responseData.items);
          }
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }

    fetchCartItems();
  }, []);

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    setSubtotal(total.toFixed(2));
  };

  const handleClearCart = async () => {
    try {
      const tokenResponse = await SecureStore.getItemAsync(TOKEN_KEY);
      const { token } = JSON.parse(tokenResponse || '{}');
console.log(token)
      if (token) {
        const requestOptions = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete('http://192.168.56.1:3007/fyp/store/cart', requestOptions);
        if (response.status === 200) {
          // Cart cleared successfully
          setCartItems([]); // Clear local cart items
          setSubtotal(0); // Reset subtotal
          console.log("succ cleared")
        } else {
          throw new Error(`Failed to clear cart. Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      console.log("succ cleared")
    }
  };

  
  const renderProduct = (item, index) => {
    return (
      <View key={index} style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.product.imageUrl }} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{item.product.name}</Text>
            <TouchableOpacity style={styles.actionIcon}>
              <Feather name="x" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.counterContainer}>
            <Text style={styles.productPrice}>${(item.product.price * item.quantity).toFixed(2)}</Text>
            <TouchableOpacity style={styles.counterButton}>
              <Feather name="minus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.counterNumber}>{item.quantity}</Text>
            <TouchableOpacity style={styles.counterButton}>
              <Feather name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>Shopping Cart</Text>
        {/* Favorite Icon */}
        <TouchableOpacity style={styles.circleButton} onPress={handleClearCart}>
          <MaterialIcons name="clear"></MaterialIcons>
        </TouchableOpacity>
      </View>

      {/* Products */}
      <ScrollView>
        <View style={styles.productsContainer}>
          {cartItems.map((item, index) => (
            renderProduct(item, index)
          ))}
        </View>
      </ScrollView>

      {/* Subtotal and Checkout */}
      <View style={styles.subtotalContainer}>
        <View style={styles.subtotalText}>
          <Text style={styles.subtotalLabel}>Subtotal:</Text>
          <Text style={styles.subtotalAmount}>${subtotal}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={()=>{navigation.navigate("Checkout",{total:subtotal})}}>
          <Text style={styles.checkoutText}>Checkout for ${subtotal}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  productsContainer: {
    flex: 0.7, // 70% of page height
    marginTop: 20,
    height: '70%',
  },
  productContainer: {
    width: '90%', // 90% width of container
    alignSelf: 'center', // center align
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },
  productImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F9B500',
    justifyContent: 'center',
  },
  productImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
  },
  actionIcon: {
    padding: 5,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 90,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  counterButton: {
    borderWidth: 1,
    borderColor: '#F9B500',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  counterNumber: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  subtotalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    backgroundColor: 'white', // Example background color
    height: 100, // Example height, adjust as needed
    width: '100%', // Ensure full width
    borderRadius:20
  },
  
  subtotalText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight:210,
  },
  subtotalAmount: {
    fontSize: 18,
    marginLeft: 10,
  },
  checkoutButton: {
    backgroundColor: '#072E33',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    marginTop:20,
    height:60
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ProductView: {
    height: '80%',
  },
});

export default ShoppingCart;
