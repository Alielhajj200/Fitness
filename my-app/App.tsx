// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, Ionicons,FontAwesome5,MaterialIcons,FontAwesome6 } from '@expo/vector-icons';
import { RecoilRoot } from 'recoil';


import Login from './login';
import Home from './home';
import Signup from './signup';
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
import HomePage from './HomePage'
import Store from './store';
import Workout from './workout';
import Personaltrainer from './personaltrainer';
import Meal from './meal';
import Profile from './profile';
import Steps  from './step';
type RootStackParamList = {

    Login: undefined;
    Signup: undefined;
    Welcome:undefined;
    Gender:undefined;
    Goal:undefined;
    BodyType:undefined;
    Age:undefined;
    Weight:undefined;
    Height:undefined;
    Activitylevel:undefined;
    Loading:undefined;
    User:undefined;
    Expert:undefined;
    Try:undefined;
    Steps:undefined;
    HomePage:undefined,
}

type  RootTabParamList ={
    HomePage:undefined,
    Store:undefined,
    Workout:undefined,
    Personaltrainer:undefined,
    Meal:undefined;
    Profile:undefined;
    Steps:undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab =createBottomTabNavigator<RootTabParamList>();
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
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage" >
                <Stack.Group>
                    {authState?.authenticated ? (
                        <>
                        <Stack.Screen name="Steps" component={Steps} />
                        <Stack.Screen name="HomePage" >
                            {() => (
                                <Tab.Navigator  screenOptions={{ headerShown: true }} >
                                          <Tab.Screen
                                           name="HomePage"
                                           component={HomePage}
                                           options={{
                                           title: 'Home',
                                           tabBarShowLabel: true,
                                           headerShown: false,
                                           tabBarInactiveTintColor:'#FF14AF',
                                           tabBarActiveTintColor:"#39FF14",
                                           tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
                                           }}
                                            />
                                    <Tab.Screen
                                           name="Store"
                                           component={Store}
                                           options={{
                                           title: 'Store',
                                           tabBarShowLabel: true,
                                           headerShown: false,
                                           tabBarInactiveTintColor:'#FF14AF',
                                           tabBarActiveTintColor:"#39FF14",
                                           tabBarIcon: ({ color }) => <FontAwesome5 name="store" size={24} color={color} />,
                                           }}
                                            /> 
                                    <Tab.Screen
                                           name="Workout"
                                           component={Workout}
                                           options={{
                                           title: 'Workout',
                                           tabBarShowLabel: true,
                                           headerShown: false,
                                           tabBarInactiveTintColor:'#FF14AF',
                                           tabBarActiveTintColor:"#39FF14",
                                           tabBarIcon: ({ color }) => <MaterialIcons name="fitness-center" size={24} color={color} />,
                                           }}
                                            /> 
                                    <Tab.Screen
                                           name="Personaltrainer"
                                           component={Personaltrainer}
                                           options={{
                                           title: 'Personaltrainer',
                                           tabBarShowLabel: true,
                                           headerShown: false,
                                           tabBarInactiveTintColor:'#FF14AF',
                                           tabBarActiveTintColor:"#39FF14",
                                           tabBarIcon: ({ color }) => <FontAwesome6 name="person-running" size={24} color={color} />,
                                           }}
                                            /> 
                                            <Tab.Screen
                                           name="Meal"
                                           component={Meal}
                                           options={{
                                           title: 'Meal',
                                           tabBarShowLabel: true,
                                           headerShown: false,
                                           tabBarInactiveTintColor:'#FF14AF',
                                           tabBarActiveTintColor:"#39FF14",
                                           tabBarIcon: ({ color }) => <Ionicons name="fast-food" size={24} color={color} />,
                                           }}
                                            /> 
                                            <Tab.Screen
                                           name="Profile"
                                           component={Profile}
                                           options={{
                                           title: 'Profile',
                                           tabBarShowLabel: true,
                                           headerShown: false,
                                           tabBarInactiveTintColor:'#FF14AF',
                                           tabBarActiveTintColor:"#39FF14",
                                           tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
                                           }}
                                            />
                                </Tab.Navigator>
                                 
                            )}
                            
                        </Stack.Screen>
                        
                        </>
                    ) : (
                        <>
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
                            
                        </>
                    )}
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    </RecoilRoot>
    );
};
