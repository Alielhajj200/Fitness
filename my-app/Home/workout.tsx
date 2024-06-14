import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import FitnessCards from "../components/FitnessCard";
import { FitnessItemsContext } from "../Context";

// Define the shape of the context data
interface FitnessContextType {
  minutes: number;
  calories: number;
  workout: number;
}

const HomeScreen: React.FC = () => {
  const { minutes, calories, workout } = useContext<FitnessContextType>(FitnessItemsContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HOME WORKOUT</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{workout}</Text>
            <Text style={styles.statLabel}>WORKOUTS</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>{calories}</Text>
            <Text style={styles.statLabel}>KCAL</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statValue}>{minutes}</Text>
            <Text style={styles.statLabel}>MINS</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              require("../assets/fitnesssection.jpg")
            }
          />
        </View>
        
       
      </View>
      <FitnessCards/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#072E33",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#F5F5F5",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#F5F5F5",
    fontSize: 20,
  },
  statLabel: {
    color: "#F5F5F5",
    fontSize: 17,
    marginTop: 6,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  image: {
    width: "90%",
    height: 150,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;
