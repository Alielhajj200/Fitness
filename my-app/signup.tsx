import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Background from './background';
import { useAuth } from './app/context/AuthContext';
import CustomAlert from './CustomAlertProps';
import { useRecoilState } from 'recoil';
import { stringArrayState,credentials } from './recoilStore';

interface RegisterProps {
  navigation: any;
}

const Signup: React.FC<RegisterProps> = ({ navigation }) => {
  const { onRegister, onchech_Register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [stringArray, setStringArray] = useRecoilState(stringArrayState);
  const [emailpass, setemailpass] = useRecoilState(credentials);
  const [alertMessage, setAlertMessage] = useState('');


  

  const handleSignup = async () => {
    addString(email);
    addString(password);
    setStringArray([]);
    console.log(stringArray)
    if (!email.trim() || !password.trim() || !cpassword.trim()) {
      setAlertMessage('Please fill in all fields!');
      setAlertVisible(true);
      return;
    }
  
    if (password !== cpassword) {
      setAlertMessage('Password and confirm password do not match!');
      setAlertVisible(true);
      return;
    }
  
    const result = await onchech_Register(email, password);
  
    if (result.available) {
      navigation.navigate('Gender');
    } else {
      setAlertMessage('Email is taken! Please try another one.');
      setAlertVisible(true);
    }
  };
  const addString = (newString) => {
    setemailpass((prevArray) => [...prevArray, newString]);
};

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>Create Account</Text>
          <Text style={styles.description}>Create a new account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(text) => setcPassword(text)}
          />

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Signup</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginText, { color: '#39FF14', marginLeft: 5 }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {alertVisible && <CustomAlert message={alertMessage} onClose={() => setAlertVisible(false)} />}
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    marginTop: 100,
    borderRadius: 30,
    padding: 30,
    width: '80%',
    alignItems: 'center',
    opacity: 1,
    borderWidth: 3,
    borderColor: 'white',
  },
  subtitle: {
    fontSize: 30,
    color: '#39FF14',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
  },
  signupButton: {
    backgroundColor: '#39FF14',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Signup;
