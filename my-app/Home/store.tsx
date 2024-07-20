import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { fetchData, ProductOptions } from '../utils/fetchdata';
import { useAuth } from '../app/context/AuthContext';
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

const TOKEN_KEY = 'abcd123';

const HomeScreen: React.FC = () => {
  const { authState } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const tokenResponse = await SecureStore.getItemAsync(TOKEN_KEY);
        const { token } = JSON.parse(tokenResponse || '{}');
        const productData: Product[] = await fetchData('http://192.168.56.1:3007/fyp/store/products', ProductOptions(token));
        
        // Decode base64 images asynchronously
        const productsWithImages: Product[] = await Promise.all(productData.map(async (product) => {
          const imageUrl = await decodeBase64Image(product.imageUrl);
          return { ...product, imageUrl };
        }));

        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const decodeBase64Image = async (base64String?: string): Promise<string> => {
    if (!base64String) return '';
    try {
      const fileUri = FileSystem.cacheDirectory + 'product_image_' + Math.random().toString(36).substring(7) + '.jpg';
      await FileSystem.writeAsStringAsync(fileUri, base64String, { encoding: FileSystem.EncodingType.Base64 });
      return fileUri;
    } catch (error) {
      console.error('Error decoding base64 image:', error);
      return '';
    }
  };

  const navigateToProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product, decodedImageUrl: product.imageUrl });
  };
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#FAF7F7', padding: 20, marginTop: 20 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 130, fontWeight: 'bold' }}>Search Product</Text>

          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('ShoppingCart')}>
            <MaterialCommunityIcons name="shopping-outline" size={20}></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>

        {/* Search Panel */}
        <View style={styles.searchPanel}>
          <Ionicons name="search" size={24} color="black" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Product Cards */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>
          {filteredProducts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={{ width: '50%', paddingHorizontal: 4, marginBottom: 20 }}
              onPress={() => navigateToProductDetails(product)}
            >
              <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 13 }}>
                {product.imageUrl && (
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={{ width: '100%', height: 150, resizeMode: 'cover', borderRadius: 10 }}
                  />
                )}
                <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{product.name}</Text>
                <Text>${product.price}</Text>
                <TouchableOpacity style={styles.plusButton}>
                  <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center' }}>+</Text>
                </TouchableOpacity>
                
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  searchPanel: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  plusButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'black',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default HomeScreen;
