import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React , {useEffect,useState} from "react";
import fitness from "../data/fitness";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchData,exerciseOptions } from "../data/fitness";





const FitnessCards: React.FC = () => {
  const navigation =useNavigation();
  const  [BodyParts, setBodyParts] = useState([])


  const getImageSource = (item) => {
    switch (item) {
      case 'back': return require('../assets/back3.webp');
      case 'cardio': return require('../assets/abs1.jpg');
      case 'chest': return require('../assets/chest.jpg');
      case 'lower arms': return require('../assets/lowerArms.webp');
      case 'lower legs': return require('../assets/back.jpg');
      case 'neck': return require('../assets/back.jpg');
      case 'shoulders': return require('../assets/back.jpg');
      case 'upper arms': return require('../assets/back.jpg');
      case 'upper legs': return require('../assets/back.jpg');
      case 'waist': return require('../assets/back.jpg');
      default: return null;
    }
  };


  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyParts([ ...bodyPartsData]);
      console.log(BodyParts)
    };
    
    fetchExercisesData();
  }, []);




  return (
    <View>
      {BodyParts.map((item, key) => (
        <Pressable
        onPress={() => navigation.navigate("Equipment", { bodyPart: item })}
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image
            style={{ width: "95%", height: 140, borderRadius: 7 }}
            source={getImageSource(item)}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 26,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item}
          </Text>
          <MaterialCommunityIcons
            style={{ position: "absolute", color: "white", bottom: 15, left: 20 }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});
