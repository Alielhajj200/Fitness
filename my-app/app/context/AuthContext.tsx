
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import JWT from 'expo-jwt';
import * as Crypto from 'expo-crypto';
import jwtDecode from 'jwt-decode';




interface AuthProps {
    authState?: { token: string | null; authenticated: boolean };
    onRegister?: (email:string,password:string,gender: string,goal:string,bodyType:string,age: number,weight:number,height:number,avtivityLevel:string,bmi:number) => Promise<any>;
    onchech_Register?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const API_URL_login = 'http://192.168.56.1:3007/fyp/users/signin';
const API_URL_Register = 'http://192.168.56.1:3007/fyp/users/signup';
const API_URL_Register_check='http://192.168.56.1:3007/fyp/users/check-email/'
const TOKEN_KEY = 'abcd123';
const ROLE_KEY="abcd12"
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children ,navigation}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
       
    }>({
        token: null,
        authenticated: null,
        
    });
    
    
    useEffect(() => {
        const loadTokenAndRole = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            
            if (token) { // Check both token and role existence
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
                setAuthState({
                    token: token,
                    authenticated: true,
                    
                });
            }
        };
        loadTokenAndRole();
    }, []);

    const register = async (
        email: string,
        password: string,
        gender: string,
        goal: string,
        bodyType: string,
        age: number,
        weight: number,
        height: number,
        activityLevel: string,
        bmi: number
      ) => {
        try {
          console.log("register func");
          const response = await fetch(API_URL_Register, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              gender,
              goal,
              bodyType,
              age,
              weight,
              height,
              activityLevel,
              bmi,
            }),
          });
      
          
          if (!response.ok) {
            const errorMessage = await response.json();
           console.log(errorMessage)
          }
      
          const result = await response.json();
            
            
            
            
          setAuthState({
              token: result.token,
              authenticated: true    
          });
  
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
  
          const serialized = JSON.stringify(result);
          await SecureStore.setItemAsync(TOKEN_KEY, serialized);
        } catch (error) {
          console.error("An error occurred:", error);
          return { error: true, msg: "An error occurred while registering." };
        }
      };
      
      
    



    const check_register = async (email: string, password: string) => {
        const api = API_URL_Register_check + email;
        console.log(api);
        try {
            console.log("register func")
            const response = await fetch(api, {
                method: 'GET', // Corrected method name to uppercase 'GET'
                
            });
    
            if (!response.ok) {
                const errorMessage = await response.json();
                return { error: true, msg: errorMessage.msg };
            } else {
                return await response.json();
            }
        } catch (e) {
            return { error: true, msg: 'An error occurred while registering.' };
        }
    };

  


    const login = async (email: string, password: string) => {
        try {
            
            const response = await fetch(API_URL_login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    
                })
            });
    
            
            if (!response.ok) {
                
                throw new Error('Network response was not ok');
            }
            
            
            const result = await response.json();
            
            
            
            
            setAuthState({
                token: result.token,
                authenticated: true    
            });
    
            
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
    
            const serialized = JSON.stringify(result);
            await SecureStore.setItemAsync(TOKEN_KEY, serialized);
            
    
            
            const token = result.token;
            const data = JWT.decode(token, TOKEN_KEY);
           
            /* Ensure data and data.exp exist before accessing data.exp
            if (data && typeof data.exp === 'number') {
                const expirationTime = data.exp * 1000; // Convert expiration time from seconds to milliseconds
                const currentTime = Date.now();
    
                const logoutTimer = setTimeout(() => {
                    logout();
                    console.log("Token expired. Logging out...");
                }, expirationTime - currentTime);
            } else {
                console.error("Invalid or missing expiration time in JWT token");
            }*/
    
            
            return null; 
        } catch (error) {
            
            return { error: true, msg: error.message };
        }
    };
    


    

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: null,
            authenticated: false,
            
        });
        navigation.navigate("Welcome"); // Assuming 'Welcome' is the name of your welcome screen

        
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onchech_Register:check_register,
        authState,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    
};
