import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useNavigation } from '@react-navigation/native';

const Meal = () => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const categories = ['Chicken', 'Salad', 'Meat', 'Snack', 'Drink']; // Corrected 'Chicken' spelling
  const navigation = useNavigation();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getRecipes = async () => {
    try {
      const response = await axios.get(`http://192.168.56.1:5000/recipes/${selectedCategory}`);
      
      setRecipes(response.data); 
      console.log(recipes)
    } catch (error) {
      console.error('Error fetching recipes:', error); // Updated error handling
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      getRecipes();
    }else{
      const getRecipes = async () => {
        try {
          const response1 = await axios.get(`http://192.168.56.1:5000/recipes/chiken`);
          
          setRecipes(response1.data); 
          console.log(recipes)
        } catch (error) {
          console.error('Error fetching recipes:', error); // Updated error handling
        }
      };
      getRecipes();
    }
    
  }, [selectedCategory]);

  const renderRecipeBox = (recipe) => (
    <TouchableOpacity 
      key={recipe.uri} 
      style={[styles.recipeBox, { marginRight: 10 }]}
      onPress={() => navigation.navigate('RecipeDetail', { recipeData: recipe })} // Navigate to new screen with recipe data
    >
      <Image source={{ uri: recipe.recipe.image }} style={styles.recipeImage} />
      <Text style={styles.recipeLabel}>{recipe.recipe.label}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Open search')} style={styles.searchIcon}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Workfit Meals</Text>
      
      <View  style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryClick(category)}
            style={[
              styles.categoryButton,
              { backgroundColor: selectedCategory === category ? '#4B7B92' : 'transparent' }
              
            ]}
          >
            <Text style={[styles.categorytext,
            { color: selectedCategory === category ? 'white' : 'black' }
            ]}
            
            >{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.line} />
      <ScrollView>
        <View style={styles.recipeContainer}>
          {recipes.map((recipe, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 && <View style={styles.rowContainer}>
                {renderRecipeBox(recipe)}
                {/* Corrected index check for rendering */}
                {recipes[index + 1] && renderRecipeBox(recipes[index + 1])}
              </View>}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = (width - 50) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F7', // 1. Background color
    padding: 10,
    marginTop: 30,
    paddingTop: 30
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 40
  },
  categoryButton: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    marginRight: 15,
    height: 40,
    width: 82,
    borderColor:'gray',
    borderWidth:0.2
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginTop: 30,
    marginBottom: 10
  },
  recipeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 20
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
  },
  recipeBox: {
    width: itemWidth,
    backgroundColor: 'white', // 2. Background color
    borderRadius: 10,
    
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover', // 3. Ensure the image covers its place
  },
  recipeLabel: {
    fontSize: 16,
    fontWeight:'normal',
    textAlign: 'center',
    fontFamily: 'fantasy'
  },
  categorytext: {
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily:'cursive'
  },
  categoriesContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 10
  }
});

export default Meal;
