import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItemsContext } from "../../Context";
import Equipment from "./Equipment";
import { AntDesign } from '@expo/vector-icons';

const FitScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(30); // Initial timer value in seconds
  const excersise = route.params.excersises;
  const current = excersise[index];
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'Instructions' | 'Target' | 'Timer'>('Timer');

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItemsContext);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval!); // Stop the timer when it reaches 1 second
            handleDone();
            return 0;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval!);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, index]); // Include index as a dependency to handle exercise change
  
  const handleDone = () => {
    setIsRunning(false); // Pause the timer
    navigation.navigate("RestScreen");
    setCompleted([...completed, current.name]);
    setWorkout(workout + 1);
    setMinutes(minutes + 0.5);
    setCalories(calories + 6);
  
    setTimeout(() => {
      if (index + 1 >= excersise.length) {
        navigation.navigate("Workout");
      } else {

        setIndex(index + 1);
        setTimer(32); // Reset timer for the next exercise
        setIsRunning(true); // Resume the timer
      }
    }, 2000);
  };

  const handleSkip = () => {
    if (index + 1 >= excersise.length) {
      navigation.navigate("Workout");
    } else {
      navigation.navigate("RestScreen");
      setIndex(index + 1);
      setTimer(34); // Reset timer for the next exercise
    }
  };
  
  

  if (!current) {
    return null; // or any other fallback UI if needed
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => {
          navigation.navigate("RestScreen");
          setIndex(index - 1);
          setTimer(30); // Reset timer when navigating back
        }}
        style={styles.iconContainer}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </View>
        </Pressable>
        <Pressable onPress={() => {/* handle menu press */}} style={styles.iconContainer}>
          <View style={styles.circle}>
            <Ionicons name="menu" size={24} color="white" />
          </View>
        </Pressable>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: current.gifUrl }} />
        </View>

        {/* Navbar for Instructions, Target, and Timer */}
        <View style={styles.navbar}>
        <Pressable
            style={[styles.tab, activeTab === 'Timer' && styles.activeTab]}
            onPress={() => setActiveTab('Timer')}
          >
            <Text style={styles.tabText}>Timer</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'Target' && styles.activeTab]}
            onPress={() => setActiveTab('Target')}
          >
            <Text style={styles.tabText}>Target</Text>
          </Pressable>
      
          <Pressable
            style={[styles.tab, activeTab === 'Instructions' && styles.activeTab]}
            onPress={() => setActiveTab('Instructions')}
          >
            <Text style={styles.tabText}>Instructions</Text>
          </Pressable>
        </View>

        {/* Content based on active tab */}
        <View style={styles.detailsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {activeTab === 'Instructions' && (
              <>
                <Text style={styles.label}>Instructions:</Text>
                {current.instructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionContainer}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}
              </>
            )}
            {activeTab === 'Target' && (
  <View style={styles.targetcontainer}>
  <Text style={styles.sectionTitle}>PRIMARY MUSCLE GROUPS</Text>
  <Text style={styles.muscleItem}>{current.target}</Text>
  <View style={styles.line} />
  <Text style={styles.sectionTitle}>SECONDARY MUSCLE GROUPS</Text>
  {current.secondaryMuscles.map((muscle, index) => (
    <Text key={index} style={styles.muscleItem}>{muscle}</Text>
  ))}
</View>
)}

            {activeTab === 'Timer' && (
              <View style={styles.detailsContainer}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={{flexDirection:'row',marginBottom:10}}>
                <Text style={styles.Timer}>{timer}<Text style={{fontSize:30}}>s</Text></Text>
                <Pressable onPress={() => setIsRunning(!isRunning)} style={{marginTop:10}}>
        <View style={styles.circle}>
          {isRunning ? (
            <AntDesign name="pausecircleo" size={44} color="white" />
          ) : (
            <AntDesign name="playcircleo" size={44} color="white" />
          )}
        </View>
      </Pressable>
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'80%'}}>
                <Text style={styles.title}>{current.name}</Text>
                <Text style={styles.subtitle}>Equipment: {current.equipment}</Text>
                </View>
                <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
              <View style={styles.circle}>
                <Ionicons name="play-skip-forward-circle-outline" size={50} color="white"  onPress={handleSkip}/>
              </View>
            </Pressable>
            </View>
               {/* <Text style={styles.label}>Instructions:</Text>
                {current.instructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionContainer}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}*/}
              </ScrollView>
              
            </View>
              
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 15,
  },
  iconContainer: {
    padding: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  imageContainer: {
    height: '62%',
    backgroundColor: '#fff',
  },
  image: {
    width: "100%",
    height: '100%',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,

  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "900",
    color: '#F9B500',
    marginBottom: 20,
    marginRight: 80,
    
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
  },
  instructionNumber: {
    width: 30,
    height: 30,
    backgroundColor: '#F9B500',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  instructionNumberText: {
    fontSize: 20,
    color: 'black',
  },
  instructionText: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight:'500'
  },
  Timer:{
    fontSize: 50,
    marginRight:40,
    fontWeight:'800',
    },




    targetcontainer: {
      
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    line: {
      width: '100%',
      height: 2,
      backgroundColor: '#000000',
      marginTop: 10,
      marginBottom: 10,
    },
    muscleItem: {
      fontSize: 18,
      marginTop: 10,
    },
});

export default FitScreen;
