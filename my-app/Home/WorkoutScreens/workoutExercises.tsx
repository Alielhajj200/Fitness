import React, { useEffect, useState, useContext } from 'react';
import { fetchData, exerciseOptions } from '../../data/fitness';
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FitnessItemsContext } from "../../Context";

const WorkoutExercises = () => {
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(FitnessItemsContext);
  const route = useRoute();

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + route.params.bodyPart, exerciseOptions);
      setExercises(exercisesData);
    };
    fetchExercises();
  }, []);

  if (!route.params) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No workout data available.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#FFFFFF", marginTop: 50 }}
      >
        <View style={{ position: 'relative', marginBottom: 10 }}>
          <Image
            style={{ width: "100%", height: 200 }}
            source={{ uri: 'https://images.pexels.com/photos/4804352/pexels-photo-4804352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
          />
          <Text style={styles.imageOverlayText}>
            {`${route.params.bodyPart} using ${route.params.Equipment}`}
          </Text>
        </View>
        <Text style={styles.smallText}>
  {"Work that " + route.params.bodyPart + " with " + route.params.Equipment + " \nto unlock your full potential!"}
</Text>


        <Text style={styles.label}>Exercise List</Text>
        {exercises.map((item, index) => (
          <Pressable
            style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
            key={index}
          >
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: item.gifUrl }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "900", width: 170, color: "#072E33" }}>
                {item.name}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 18, color: "#F9B500" }}>
                {item.target}
              </Text>
            </View>
            {completed.includes(item.name) && (
              <AntDesign
                style={{ marginLeft: 40 }}
                name="checkcircle"
                size={24}
                color="#4CAF50"
              />
            )}
          </Pressable>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => {
          navigation.navigate("FitScreen", {
            excersises: exercises,
          });
          setCompleted([]);
        }}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>Start Workout</Text>
      </Pressable>
    </>
  );
};

export default WorkoutExercises;

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#FF0000",
  },
  startButton: {
    backgroundColor: "#072E33",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    width: "85%",
    height:50,
    borderRadius: 13, // Make it rounded
  },
  startButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  imageOverlayText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  smallText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight:'600'
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
  },
});
