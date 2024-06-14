import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { useRecoilState } from 'recoil';
import { stringArrayState } from '../recoilStore';
import QuesBackground from '../Questions/QuesBackground'

interface GenderProps {
  navigation: any;
}

const Gender: React.FC<GenderProps> = ({ navigation }) => {
  const [stringArray, setStringArray] = useRecoilState(stringArrayState);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dashes, setDashes] = useState<JSX.Element[]>([]);

  const addString = (newString) => {
    setStringArray((prevArray) => [...prevArray, newString]);
  };

  const selectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  useEffect(() => {
    const greenDashes = stringArray.length;
    const remainingDashes = 7 - greenDashes;

    const updatedDashes: JSX.Element[] = [];

    for (let i = 0; i < greenDashes; i++) {
      updatedDashes.push(
        <Ionicons key={i} name="radio-button-on" size={24} color="#F9B500" />
      );
    }

    for (let j = 0; j < remainingDashes; j++) {
      updatedDashes.push(
        <Ionicons key={greenDashes + j} name="radio-button-off" size={24} color="#ccc" />
      );
    }

    setDashes(updatedDashes);
  }, [stringArray]);

  const handlegender = () => {
    // Check if the selected gender is already in the array
    const indexToRemove = stringArray.indexOf(selectedGender);
    if (indexToRemove !== -1) {
      // Remove the first occurrence of the selected gender from the array
      const updatedArray = [
        ...stringArray.slice(0, indexToRemove),
        ...stringArray.slice(indexToRemove + 1)
      ];
      setStringArray(updatedArray);
    }
    
    // Add the selected gender to the array
    addString(selectedGender);
    
    navigation.navigate("Goal");
  };

  return (
   <QuesBackground>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.dashesContainer}>{dashes}</View>
        <Text style={styles.welcomeText}>Welcome to WorkFit</Text>
        <Text style={styles.questionText}>What is your gender?</Text>

        <TouchableOpacity
          style={[styles.genderBox, selectedGender === 'female' && styles.selectedGender]}
          onPress={() => selectGender('female')}
        >
          <Text style={styles.genderText}>Female</Text>
          <Image source={require('../assets/girl.png')} style={styles.genderImage} />
          {selectedGender === 'female' && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.genderBox, selectedGender === 'male' && styles.selectedGender]}
          onPress={() => selectGender('male')}
        >
          <Text style={styles.genderText}>Male</Text>
          <Image source={require('../assets/male.png')} style={styles.genderImage} />
          {selectedGender === 'male' && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="small" color="#072E33" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity
            style={[styles.continueButton, selectedGender && styles.continueButtonEnabled]}
            disabled={!selectedGender}
            onPress={handlegender}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </QuesBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: 30
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  dashesContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  genderBox: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedGender: {
    borderColor: '#F9B500',
  },
  genderText: {
    fontSize: 18,
    color: 'white',
  },
  genderImage: {
    width: 90,
    height: 90,
  },
  tickImage: {
    width: 30,
    height: 30,
  },
  continueButton: {
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  continueButtonEnabled: {
    backgroundColor: '#072E33',
  },
  continueButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Gender;
