import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { useAuth } from './app/context/AuthContext';
import { useRecoilState } from 'recoil';
import { stringArrayState,credentials } from './recoilStore';


interface LoadingProps {
  navigation: any;
}

const Loading: React.FC<LoadingProps> = ({ navigation }) => {
  const {onLogin,onLogout,onRegister}=useAuth();
  const [stringArray, setStringArray] = useRecoilState(stringArrayState);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [emailpass, setemailpass] = useRecoilState(credentials);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleRegister = () => {
    const weight = parseFloat(stringArray[4]); // Convert weight string to a floating-point number
const height = parseFloat(stringArray[5])/100;
 // Convert height string to a floating-point number

// Calculate BMI
const BMI = weight / (height * height);

    console.log(
      stringArray[0] +
        stringArray[1] +
        stringArray[2] +
        stringArray[3] +
        stringArray[4] +
        stringArray[5] +
        stringArray[6]
    );
    console.log(weight);
    console.log(height)
    console.log(BMI)
    onRegister(emailpass[0], emailpass[1],stringArray[0] ,stringArray[1] ,stringArray[2] ,stringArray[3] ,stringArray[4] ,stringArray[5] ,stringArray[6],BMI);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analyzing Your Data</Text>

      <View style={styles.loadingContainer}>
        {!loadingComplete ? (
          <ActivityIndicator size={200} color="#39FF14" />
        ) : (
          <Ionicons name="checkmark-circle" size={200} color="#39FF14" />
        )}
        {!loadingComplete && <Text style={styles.loadingText}>This will take a while!</Text>}
        {loadingComplete && <Text style={styles.loadingText}>Ready to Go</Text>}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, loadingComplete && styles.continueButtonEnabled]}
        disabled={!loadingComplete}
        onPress={handleRegister}
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  continueButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
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

export default Loading;
