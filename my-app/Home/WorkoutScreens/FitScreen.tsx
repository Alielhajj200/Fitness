import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItemsContext } from "../../Context";
import Equipment from "./Equipment";

const FitScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState<number>(0);
  const excersise = route.params.excersises;
  const current = excersise[index];

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

  if (!current) {
    return null; // or any other fallback UI if needed
  }

  const handleDone = () => {
    navigation.navigate("RestScreen");
    setCompleted([...completed, current.name]);
    setWorkout(workout + 1);
    setMinutes(minutes + 2.5);
    setCalories(calories + 6.3);
    setTimeout(() => {
      setIndex(index + 1);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: current.gifUrl }} />
        </View>

        <View style={styles.detailsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>{current.name}</Text>
            <Text style={styles.subtitle}>Equipment: {current.equipment}</Text>
            <Text style={styles.label}>Instructions:</Text>
            {current.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionContainer}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable
              disabled={index === 0}
              onPress={() => {
                navigation.navigate("RestScreen");
                setTimeout(() => {
                  setIndex(index - 1);
                }, 2000);
              }}
              style={styles.navButton}
            >
              <Text style={styles.buttonText}>PREV</Text>
            </Pressable>
            <Pressable
              onPress={handleDone}
              style={styles.navButton}
            >
              <Text style={styles.buttonText}>DONE</Text>
            </Pressable>
            {index + 1 >= excersise.length ? (
              <Pressable
                onPress={() => {
                  navigation.navigate("HomePage");
                }}
                style={styles.navButton}
              >
                <Text style={styles.buttonText}>SKIP</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  navigation.navigate("RestScreen");
                  setTimeout(() => {
                    setIndex(index + 1);
                  }, 2000);
                }}
                style={styles.navButton}
              >
                <Text style={styles.buttonText}>SKIP</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9B500',
  },
  innerContainer: {
    flex: 1,
  },
  imageContainer: {
    height: '52%',
    backgroundColor: '#fff',
  },
  image: {
    width: "100%",
    height: '100%',
  },
  detailsContainer: {
    height: '48%',
    backgroundColor: '#333333',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    marginBottom: 20,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
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
    fontSize: 16,
    color: 'white',
  },
  instructionText: {
    flex: 1,
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#F9B500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

export default FitScreen;
