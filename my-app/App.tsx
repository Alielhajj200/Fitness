// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';


import Login from './login';
import Home from './home';
import Signup from './signup';
import User from "./user";
import Expert from "./expert";
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { Button, View } from 'react-native';
import Welcome from './welcome';
import Try from './try'
import Gender from './gender';
import Goal from './goal'
import BodyType from './bodytype';
import Age from './age';
import Weight from './weight'
import Height from './height'
import Activitylevel from './activitylevel'
import Loading from  './loading'
type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    Welcome:undefined;
    User:undefined;
    Expert:undefined;
    Try:undefined;
    Gender:undefined;
    Goal:undefined;
    BodyType:undefined;
    Age:undefined;
    Weight:undefined;
    Height:undefined;
    Activitylevel:undefined;
    Loading:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

export const Layout = () => {
    const { authState, onLogout } = useAuth();

    return (

        <RecoilRoot>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {authState?.authenticated ? (
                    <Stack.Group>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen name="User" component={User} /> 
                    <Stack.Screen name="Expert"  component={Expert} />
                    <Stack.Screen name="Try"  component={Try} />
                    </Stack.Group>
                    
                    
                ) : (
                    <Stack.Group>
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="Gender" component={Gender}/>
                        <Stack.Screen name="Goal" component={Goal}/>
                        <Stack.Screen name="BodyType" component={BodyType}/>
                        <Stack.Screen name="Age" component={Age}/>
                        <Stack.Screen name="Weight" component={Weight}/>
                        <Stack.Screen name="Height" component={Height}/>
                        <Stack.Screen name="Activitylevel" component={Activitylevel}/>
                        <Stack.Screen name="Loading" component={Loading}/>
                        </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
        </RecoilRoot>
    );
};
