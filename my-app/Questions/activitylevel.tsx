import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { useRecoilState } from 'recoil';
import { stringArrayState } from '../recoilStore';

interface ActivitylevelProps {
  navigation: any;
}

const Gender: React.FC<ActivitylevelProps> = ({ navigation }) => {
  const [selectedActivitylevel, setSelectedActivitylevel] = useState(null);
  const [stringArray, setStringArray] = useRecoilState(stringArrayState);
  const selectActivitylevel = (level) => {
    setSelectedActivitylevel(level);
  };

  const isActiveSelected = selectedActivitylevel === 'Active';
  const isNot_ActiveSelected = selectedActivitylevel === 'Not Active';
  const addString = (newString) => {
    setStringArray((prevArray) => [...prevArray, newString]);
  };

  const handlepress = () => {
    addString(selectedActivitylevel);
    console.log(
      stringArray[0] +
        stringArray[1] +
        stringArray[2] +
        stringArray[3] +
        stringArray[4] +
        stringArray[5]
    );
    navigation.navigate('Loading');
  };

  const renderDashes = () => {
    const greenDashes = stringArray.length;
    const remainingDashes = 7 - greenDashes;

    const dashes = [];

    for (let i = 0; i < greenDashes; i++) {
      dashes.push(<Ionicons key={i} name="radio-button-on" size={24} color="#39FF14" />);
    }

    for (let j = 0; j < remainingDashes; j++) {
      dashes.push(<Ionicons key={greenDashes + j} name="radio-button-off" size={24} color="#ccc" />);
    }

    return dashes;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.dashesContainer}>{renderDashes()}</View>

      <Text style={styles.questionText}>What is your Activity Level?</Text>

      <TouchableOpacity
        style={[styles.genderBox, isNot_ActiveSelected && styles.selectedGender]}
        onPress={() => selectActivitylevel('Not Active')}
      >
        <Text style={styles.genderText}>Not Active</Text>
        <Image source={require('../assets/Sleepy.png')} style={styles.genderImage} />
        {isNot_ActiveSelected && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.genderBox, isActiveSelected && styles.selectedGender]}
        onPress={() => selectActivitylevel('Active')}
      >
        <Text style={styles.genderText}>Active</Text>
        <Image source={require('../assets/male.png')} style={styles.genderImage} />
        {isActiveSelected && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.continueButton, selectedActivitylevel && styles.continueButtonEnabled]}
        disabled={!selectedActivitylevel}
        onPress={handlepress}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
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
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  genderBox: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedGender: {
    borderColor: '#39FF14',
  },
  genderText: {
    fontSize: 18,
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
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  continueButtonEnabled: {
    backgroundColor: '#39FF14',
  },
  continueButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Gender;
