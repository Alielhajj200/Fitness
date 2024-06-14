import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { fetchData, exerciseOptions } from '../../data/fitness';

const Equipment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { bodyPart } = route.params;
  const [equipments, setEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the equipment data
    const fetchEquipments = async () => {
      const equipmentData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/equipmentList', exerciseOptions);
      setEquipments(equipmentData);
    };

    fetchEquipments();
  }, []);

  const getImageSource = (item) => {
    switch (item) {
      case 'assisted': return require('../../assets/equipments/dumbbel.png');
      case 'band': return require('../../assets/equipments/band.png');
      case 'barbell': return require('../../assets/equipments/barbell.png');
      case 'body weight': return require('../../assets/equipments/bodyweight.png');
      case 'bosu ball': return require('../../assets/equipments/bosaball.png');
      case 'cable': return require('../../assets/equipments/cable.webp');
      case 'dumbbell': return require('../../assets/equipments/dumbbel.png');
      case 'elliptical machine': return require('../../assets/equipments/dumbbel.png');
      case 'ez barbell': return require('../../assets/equipments/dumbbel.png');
      case 'hammer': return require('../../assets/equipments/dumbbel.png');
      case 'kettlebell': return require('../../assets/equipments/dumbbel.png');
      case 'leverage machine': return require('../../assets/equipments/dumbbel.png');
      case 'medicine ball': return require('../../assets/equipments/dumbbel.png');
      case 'olympic barbell': return require('../../assets/equipments/dumbbel.png');
      case 'resistance band': return require('../../assets/equipments/dumbbel.png');
      case 'roller': return require('../../assets/equipments/dumbbel.png');
      case 'rope': return require('../../assets/equipments/dumbbel.png');
      case 'skierg machine': return require('../../assets/equipments/dumbbel.png');
      case 'sled machine': return require('../../assets/equipments/dumbbel.png');
      case 'smith machine': return require('../../assets/equipments/dumbbel.png');
      case 'stability ball': return require('../../assets/equipments/dumbbel.png');
      case 'stationary bike': return require('../../assets/equipments/dumbbel.png');
      case 'stepmill machine': return require('../../assets/equipments/dumbbel.png');
      case 'tire': return require('../../assets/equipments/dumbbel.png');
      case 'trap bar': return require('../../assets/equipments/dumbbel.png');
      case 'upper body ergometer': return require('../../assets/equipments/dumbbel.png');
      case 'weighted': return require('../../assets/equipments/dumbbel.png');
      case 'wheel roller': return require('../../assets/equipments/dumbbel.png');
      default: return null;
    }
  };

  const renderEquipmentItem = ({ item }) => (
    <Pressable 
    onPress={() => navigation.navigate("workoutExercises", { bodyPart: bodyPart,Equipment:item })}
    style={styles.card}>
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={getImageSource(item)}
      />
      <Text style={styles.cardText}>{item}</Text>
    </View>
    </Pressable>
  );

  const filteredEquipments = equipments.filter(equipment =>
    equipment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.question}>
        Which equipment do you want to use for the 
        <Text style={styles.bodyPart}> {bodyPart} </Text> workout?
      </Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="grey" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search equipment"
          placeholderTextColor="grey"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredEquipments}
        renderItem={renderEquipmentItem}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F7',
    padding: 16,
    marginTop: 15
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  question: {
    marginTop: 60,
    fontSize: 24, // Increased font size for more impact
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Changed color for better contrast
    textShadowColor: '#aaa', // Added text shadow for depth
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  cardContainer: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 5,
    flex: 1,
  },
  image: {
    width: 140,
    height: 130,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16, // Slightly increased font size for better readability
    fontWeight: 'bold',
    color: '#444', // Changed color for better contrast
    textAlign: 'center', // Centered the text
    marginTop: 10, // Added some margin at the top for spacing
    textTransform: 'uppercase', // Transformed text to uppercase for a bolder look
    letterSpacing: 1, // Added letter spacing for better readability
  },
  bodyPart: {
    color: '#F9B500', // Different color to make it stand out
    textShadowColor: '#333', // Added a darker shadow for better contrast
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
