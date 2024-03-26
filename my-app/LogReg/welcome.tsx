import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from './background';

interface HomeProps {
  navigation: any; // You might want to replace 'any' with the correct type for your navigation prop
}

const Welcome: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
       
        <Text style={styles.appName}>Workfit App</Text>
        <Text style={styles.subtitle}> Keep Your Body Fit</Text>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOutline}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center',
    paddingTop: 390, // Adjust the top padding to move text higher
  },
  title: {
    color: '#39FF14', // Slightly darker gray
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appName: {
    color: 'white',
    fontSize: 50, // Increase the font size for a bold appearance
    fontWeight: 'bold',
    letterSpacing: 2, // Increase letter spacing
    marginBottom: 15, // Increase the margin for better separation
    
  },
  subtitle: {
    color: '#ff14af',
    fontSize: 40, // Increase the font size for a bold appearance
    fontWeight: 'bold',
    letterSpacing: 2, // Increase letter spacing
    marginBottom: 15,
  },
  btns: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#39FF14', // Orange border color
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  btnText: {
    color: '#39FF14', // Orange text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;
