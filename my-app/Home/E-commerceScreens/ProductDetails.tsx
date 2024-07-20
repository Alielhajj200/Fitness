import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import * as FileSystem from 'expo-file-system';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Assuming imageUrl contains base64-encoded image data
  quantity: number;
  category: string;
}

interface ProductDetailsProps {
  navigation: any;
  route: any;
}

const TOKEN_KEY = 'abcd123';

const ProductDetails: React.FC<ProductDetailsProps> = ({ navigation, route }) => {
  const { product, decodedImageUrl } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToCart = async () => {
    try {
      const tokenResponse = await SecureStore.getItemAsync(TOKEN_KEY);
      const { token } = JSON.parse(tokenResponse || '{}');

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1, // Default quantity
        }),
      };

      const response = await fetch('http://192.168.56.1:3007/fyp/store/cart', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      console.log('Product added to cart:', product.name);
      navigation.navigate('ShoppingCart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle error, show user feedback, etc.
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>Product details</Text>
        {/* Favorite Icon */}
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : 'black'} />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: decodedImageUrl }} style={styles.image} />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.lowerContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
  imageContainer: {
    backgroundColor: 'white',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  lowerContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 20,
    width: windowWidth * 1, // 90% of the screen width
    height: windowHeight * 0.5,
    alignSelf: 'center', // center the container horizontally
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 70,
  },
  addToCartButton: {
    backgroundColor: '#F9B500',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    width: 200,
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#072E33',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
