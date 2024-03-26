import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity,StyleSheet,TextInput } from 'react-native';
import Background from './background';
import Field from '../field';
import Btn from '../btn';
import { useAuth } from '../app/context/AuthContext';
import CustomAlert from '../CustomAlertProps';


interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  
  const {onLogin,onLogout,onRegister}=useAuth();
  const [email,setemail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const login = async () => {

    if (!email.trim() || !password.trim() ) {
      setAlertMessage('Please fill in all fields!');
      setAlertVisible(true);
      return;
    }
    try {
      const result = await onLogin!(email, password);
  
     
      if (result && result.error) {
        
        setAlertMessage('Invalid username or password');
      setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Error while logging in: ' + error.message);
      setAlertVisible(true);
    }
  };
  
  

 

  return (
    <Background>
    <View style={styles.container}>
   
    <View style={styles.formContainer}>
      <Text style={styles.subtitle}>Welcome Back</Text>
      <Text style={styles.description}>Login to your account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email / Username"
        placeholderTextColor={'grey'}
        onChangeText={(text) => setemail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'grey'}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={[styles.signupText, { color: '#39FF14', marginLeft: 5 }]}>Signup</Text>
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
title: {
  color: 'white',
  fontSize: 54,
  fontWeight: 'bold',
  marginBottom: 20,
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
  color:'white'
},
forgotPassword: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 16,
  alignSelf: 'flex-end',
  marginBottom: 20,
},
loginButton: {
  backgroundColor: '#39FF14',
  borderRadius: 10,
  paddingVertical: 12,
  paddingHorizontal: 50,
  marginBottom: 20,
},
loginButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 18,
},
signupContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
signupText: {
  fontSize: 16,
  fontWeight: 'bold',
  color:'white'
},
});

export default Login;
