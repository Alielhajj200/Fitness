import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';

const RecipeDetail = ({ route }) => {
  const { recipeData } = route.params;
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: recipeData.recipe.image }} style={styles.recipeImage} />
      <View style={styles.recipeInfoContainer}>
        <Text style={styles.recipeLabel}>{recipeData.recipe.label}</Text>
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeDetailText}>Calories: {recipeData.recipe.calories.toFixed(1)}</Text>
          <Text style={styles.recipeDetailText}>Total Weight: {recipeData.recipe.totalWeight.toFixed(1)} g</Text>
          <Text style={styles.recipeDetailText}>Total Time: {recipeData.recipe.totalTime} mins</Text>
        </View>
      </View>
      <Text style={styles.ingredientsTitleText}>Ingredients : </Text>
      <ScrollView style={styles.ingredientsContainer}>
  {recipeData.recipe.ingredients.map((ingredient, index) => (
    <View key={index} style={styles.ingredientItem}>
      <Image source={{ uri: ingredient.image }} style={styles.ingredientImage} />
      <View style={styles.ingredientInfo}>
        <Text style={styles.ingredientName}>{ingredient.text}</Text>
        <Text style={styles.ingredientQuantity}>{ingredient.quantity} {ingredient.measure}</Text>
      </View>
    </View>
  ))}
</ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Food</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F7',
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  recipeImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.41,
    resizeMode: 'cover',
  },
  recipeInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  recipeLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#4B7B92',
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 10,
    padding: 10,
  },
  recipeDetails: {
    marginBottom: 20,
  },
  recipeDetailText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#4B7B92',
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  ingredientsTitleText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft:10,
    marginBottom:15
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 60,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    justifyContent: 'center', 
    alignSelf: 'center', 
    borderColor: '#ECEFF1',
    borderWidth:3
  },
  
  ingredientImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
  },
  ingredientInfo: {
    marginLeft: 10,
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientQuantity: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4B7B92',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});

export default RecipeDetail;
