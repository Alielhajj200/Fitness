import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import base64 from "react-native-base64";
import { LineChart,BarChart ,PieChart} from "react-native-gifted-charts";

const Step = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(require('../assets/male.png'));
  const [fullName, setFullName] = useState('John Doe');
  const [fullDate, setFullDate] = useState<string>();
  const [goalSteps, setGoalSteps] = useState(3000);
  const [currentSteps, setCurrentSteps] = useState(1500);
  const [data, setData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [url, setUrl] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const TOKEN_KEY = 'abcd123';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        const tokenObject = JSON.parse(token);
        const tokenvalue = tokenObject.token;
        setToken(tokenvalue);

        const emailFromToken = decodeJWT(tokenvalue);
        if (!emailFromToken) {
          throw new Error('Email not found in token');
        }

        const url = 'http://192.168.56.1:3007/fyp/users/progress/' + emailFromToken;
        setUrl(url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenvalue}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        const lastFiveSteps = responseData.progress.slice(-6).map(item => ({
          value: item.steps,
          date: new Date(item.currentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
        setData(lastFiveSteps);

        if (responseData.progress.length > 0) {
          const lastProgress = responseData.progress[responseData.progress.length - 1];
          const date = new Date(lastProgress.currentDate);
          const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
          setFullDate(formattedDate);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const decodeJWT = (token: string) => {
    if (token.length === 0) {
      return null;
    }
    const headerPart = sanitizeJson(base64.decode(token.split(".")[0]));
    const payloadPart = sanitizeJson(base64.decode(token.split(".")[1]));

    const header = JSON.parse(headerPart);
    const payload = JSON.parse(payloadPart);
    const email = payload.user.email;
    setEmail(email);
    return email;
  };

  const sanitizeJson = (json: string) => {
    return json.replace(/[\u0000]+/g, "");
  };

  const handleNextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
  };

  const percentage = (currentSteps / goalSteps) * 100;

  const images = [
    { id: '1', imageUrl: require('../assets/step1.jpg') },
    { id: '2', imageUrl: require('../assets/step2.jpg') },
    { id: '3', imageUrl: require('../assets/abs.jpg') },
    // Add more images as needed
  ];

  const renderItem = ({ item }) => (
    <Image source={item.imageUrl} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profileImageUrl} style={styles.profileImage} />
        <Text style={styles.fullName}>{fullName}</Text>
      </View>
      <Text style={styles.fullDate}>{fullDate}</Text>
      <TouchableOpacity style={styles.alarmIconContainer} onPress={() => console.log('Alarm clicked')}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        </View>
        <View style={styles.iconContainer}>
          <Ionicons name="walk-outline" size={24} color="#4B7B92" />
          <Text style={styles.stepsText}>{currentSteps} steps of {goalSteps}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {data !== null ? (
          <BarChart
            data={data.map(item => ({ value: item.value }))}
            showFractionalValues
            showYAxisIndices
            showXAxisIndices
            hideRules
            noOfSections={5}
            yAxisOffset={1000}
            xAxisLabelTexts={data.map(item => item.date)}
            xAxisLabelTextStyle={{
              letterSpacing: -1.6,
            }}
            frontColor={'#4B7B92'}
            barBorderTopLeftRadius={10}
            barBorderTopRightRadius={10}
            gradientColor={'#FFEEFE'}
            backgroundColor={'#F9B500'}
            width={305}
            isAnimated
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 30,
    height:250
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FAF7F7'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  fullDate: {
    marginTop: 10,
    fontSize: 14,
    color: 'black',
  },
  alarmIconContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    paddingTop: 10
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBackground: {
    backgroundColor: '#ccc',
    height: 15,
    borderRadius: 5,
  },
  progressBar: {
    backgroundColor: '#4B7B92',
    height: 15,
    borderRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  stepsText: {
    marginLeft: 5,
    color: 'black',
  },
  carouselContainer: {
    flex: 1,
    height: 100,
    paddingTop: 20,
    borderRadius: 40,
    position: 'relative',
  },
  image: {
    width: 370,
    height: 200,
    resizeMode: 'cover',
    borderRadius:10
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
});

export default Step;
