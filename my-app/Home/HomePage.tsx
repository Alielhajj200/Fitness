import React, { useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import Ionicons and MaterialCommunityIcons from Expo
import { Pedometer } from 'expo-sensors';
import base64 from "react-native-base64";
import { useAuth } from '../app/context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
interface HomepageProps {
    navigation: any;
}
const HomePage: React.FC<HomepageProps> = ({ navigation }) => {
    const { onLogout } = useAuth();
    
    const [goalCalories, setGoalCalories] = useState(null);
    const [foodCalories, setFoodCalories] = useState(1200);
    const [token, setToken] = useState<string | null>(null);
    const [steps, setSteps] = useState(0);
    const [datatoken, setdatatoken] = useState(null);
    const remainingCalories = goalCalories - foodCalories;
    const TOKEN_KEY = 'abcd123';
    const data=[ {value:remainingCalories,color:'#F9B500'}, {value:foodCalories,color:'#4B7B92'} ]

    useEffect(() => {
       
        const calculateGoalCalories = () => {
            if (datatoken && datatoken.user) {
                const maleGoalcalories = (10 * datatoken.user.weight) + (6.25 * datatoken.user.height) - (5 * datatoken.user.age) + 5;
                const femaleGoalCalories = (10 * datatoken.user.weight) + (6.25 * datatoken.user.height) - (5 * datatoken.user.age) - 161;
                if (datatoken.user.gender === 'male') {
                    setGoalCalories(maleGoalcalories);
                } else {
                    setGoalCalories(femaleGoalCalories);
                }
            }
        };
    
        calculateGoalCalories();
    }, [datatoken]);
    
    useEffect(() => {
    const fetchData = async () => {
        try {
          const token = await SecureStore.getItemAsync(TOKEN_KEY);
          const tokenObject = JSON.parse(token);
          const tokenvalue = tokenObject.token;
          setToken(tokenvalue);
           const payloadresult =await decodeJWT(tokenvalue)
           setdatatoken(payloadresult)
        }
          catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
          fetchData();
        }, [token]);
    

    useEffect(() => {
        // Subscribe to pedometer updates
        const subscribe = Pedometer.watchStepCount(result => {
            setSteps(result.steps);
        });
 
        // Unsubscribe when component unmounts
        return () => {
            subscribe.remove();
        };
    }, []);

    const decodeJWT = async(token: string) => {
        if (token.length === 0) {
          return null;
        }
        const headerPart = sanitizeJson(base64.decode(token.split(".")[0]));
        const payloadPart = sanitizeJson(base64.decode(token.split(".")[1]));
    
        const header = JSON.parse(headerPart);
        const payload = JSON.parse(payloadPart);
        return payload;
        
        
        
      };
      const sanitizeJson = (json: string) => {
        return json.replace(/[\u0000]+/g, "");
      };
    const handleplus = ()=>{
        //handlepus
    }
    return (
        <ScrollView style={styles.all}>
            <SafeAreaView style={styles.containerhome}>
                {/* Profile Image */}
                <TouchableOpacity onPress={onLogout}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../assets/male.png')}
                            style={styles.profileImage}
                        />
                    </View>
                </TouchableOpacity>
 
                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Work<Text style={styles.fitText}>Fit</Text>
                    </Text>
                </View>
                {/* Notification Icon */}
                <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                    style={styles.notificationIcon}
                />
            </SafeAreaView>
 
            {/* Additional Boxes */}
            <View style={styles.additionalContainer}>
                {/* Steps Box */}
                <View style={styles.box}>
                <TouchableOpacity onPress={() => navigation.navigate('Steps')}>
               
                    <Text style={styles.boxTitle}>Steps</Text>
                    <View style={styles.boxContent}>
                        <MaterialCommunityIcons name="shoe-print" size={24} color="orange" />
                        <Text style={styles.counter}>{steps}</Text>
                    </View>
                    <Text style={styles.goalText}>Goal: 10,000 steps</Text>
               
                </TouchableOpacity>
                </View>
                {/* Exercise Box */}
                <View style={styles.box}>
                    <Text style={styles.boxTitle}>Exercise</Text>
                    <TouchableOpacity style={styles.plusIconContainer} onPress={handleplus}>
                        <Ionicons name="add" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={styles.boxContent}>
                        <MaterialCommunityIcons name="fire" size={24} color="red" />
                        <Text style={styles.counter}>0</Text>
                        <Text style={styles.calText}>cal</Text>
                    </View>
                    <View style={styles.boxContent}>
                        <MaterialCommunityIcons name="clock" size={24} color="orange" />
                        <Text style={styles.counter}>0:00</Text>
                        <Text style={styles.hrText}>hr</Text>
                    </View>
                </View>
            </View>
 
            {/* Calories Box */}
            <View style={styles.newbox}>
                <Text style={styles.boxTitle}>Calories</Text>
                <Text style={styles.textFormula}>Remaining = Goal - Food</Text>
                <View style={styles.inputRow}>
                <PieChart data = {data} strokeWidth={1} radius={50} focusOnPress
      showValuesAsLabels
      showTextBackground
      textBackgroundRadius={26}/>
                <View style={styles.texts}>
                <View style={styles.goalContainer}>
                    <Ionicons name="flag-outline" size={24} color="#F9B500" />
                    <Text style={styles.goalText}>Goal : </Text>
                    <Text style={styles.caloriesNumber}>{goalCalories}</Text>
                    <TouchableOpacity style={styles.editIcon}>
                        <Ionicons name="pencil-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.foodContainer}>
                    <MaterialCommunityIcons name="food" size={24} color="#F9B500" />
                    <Text style={styles.foodText}>Food : </Text>
                    <Text style={styles.caloriesNumber}>{foodCalories}</Text>
                    <TouchableOpacity style={styles.editIcon}>
                        <Ionicons name="pencil-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                </View>
                </View>
            </View>
 
            {/* Title: Quick Home Workout Plan */}
      <Text style={styles.quickWorkoutTitle}>Quick Home Workout Plan</Text>
 
{/* Horizontal ScrollView for clickable rectangles */}
<ScrollView horizontal style={styles.rectanglesContainer}>
  <TouchableOpacity style={styles.rectangle} onPress={() => {/* Handle rectangle 1 click */}}>
    <Image source={require('../assets/abs1.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>ABS</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rectangle} onPress={() => {/* Handle rectangle 1 click */}}>
    <Image source={require('../assets/cardio.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>Cardio</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rectangle} onPress={() => {/* Handle rectangle 1 click */}}>
    <Image source={require('../assets/back.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>Back</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rectangle} onPress={() => {/* Handle rectangle 1 click */}}>
    <Image source={require('../assets/arms.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>Arms</Text>
  </TouchableOpacity>
</ScrollView>
 
<Text style={styles.quickWorkoutTitle}>Meal Plans</Text>
<ScrollView horizontal style={styles.rectanglesContainer}>
<TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate("mealplan", { mealType: "protein shakes", foodItem: "protein" })}>

<Image source={require('../assets/shakes.jpg')} style={styles.rectangleImage} />
<Text style={styles.rectangleText}>Shakes</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate("mealplan", { mealType: "high protein", foodItem: "chicken" })}>

    <Image source={require('../assets/highprotein.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>High Protein</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate("mealplan", { mealType: "Healthy Fats", foodItem: "fats" })}>
    <Image source={require('../assets/healthyfats.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>Healthy Fats</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate("mealplan", { mealType: "Low Carbs", foodItem: "carbs" })}>
    <Image source={require('../assets/lowcarbs.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>Low Carb</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate("mealplan", { mealType: "Low Protein & High Carbs", foodItem: "salad" })}>
    <Image source={require('../assets/lowprotein.jpg')} style={styles.rectangleImage} />
    <Text style={styles.rectangleText}>Low Protein</Text>
  </TouchableOpacity>
</ScrollView>
        </ScrollView>
    );
};
 
const styles = StyleSheet.create({
    all: {
        backgroundColor: '#FAF7F7'
    },
    containerhome: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#072E33', // Set color for "Work"
    },
    fitText: {
        color: '#072E33', // Set color for "Fit"
    },
    notificationIcon: {
        marginLeft: 'auto',
    },
    additionalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        width: '45%',
    },
    boxTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    boxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    plusIconContainer: {
        alignItems: 'flex-end',
    },
    counter: {
        marginLeft: 5,
    },
    goalText: {
        color: 'black',
    },
    calText: {
        marginLeft: 5,
    },
    hrText: {
        marginLeft: 5,
    },
    newbox: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '95%',
        marginTop:15,
        marginLeft:12
    },
    textFormula: {
        fontSize: 12,
        color: 'gray',
        marginBottom: 10,
    },
    circularGraph: {
        width: 100, // Adjust according to your design
        aspectRatio: 1,
        borderWidth: 5,
        borderColor: '#F9B500', // Add your desired border color
        borderRadius: 1000, // Large enough to make it a circle
        marginBottom: 10,
    },
    goalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    foodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foodText: {
        marginLeft: 5,
        marginRight: 'auto',
    },
    caloriesNumber: {
        marginRight: 5,
    },
    editIcon: {
        marginLeft: 'auto',
    },
    inputRow:{
        flexDirection:'row',
       
    },
    texts:{
        paddingLeft:100,
        paddingTop:10
    },
    graphtext:{
        paddingLeft:16,
        paddingTop:26,
        fontSize:20,
        fontWeight:'bold'
    },
    profileContainer: {
        borderRadius: 40,
        overflow: 'hidden',
        borderColor:'gray',
        borderWidth:1,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
 
 
 
    quickWorkoutTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#072E33',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      rectanglesContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      rectangle: {
        width: 120, // Adjust width as needed
        height: 160, // Adjust height as needed
        marginRight: 10, // Spacing between rectangles
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Rounded corners
       
      },
     
        rectangleText: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
            color: 'white',
            fontSize: 14,
            padding: 5,
            textAlign: 'center',
          },
     
      rectangleImage: {
        width: 120, // Adjust size as needed
        height: 160, // Adjust size as needed
        resizeMode: 'cover', // Ensure the image fits inside the rectangle
        borderRadius:10
      },
});
 
export default HomePage;