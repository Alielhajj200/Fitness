import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, Ionicons,FontAwesome5,MaterialIcons,FontAwesome6 } from '@expo/vector-icons';
import { RecoilRoot } from 'recoil';
 

import Login from './LogReg/login';
 
import Signup from './LogReg/signup';
import Expert from "./expert";
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { Button, View } from 'react-native';
import Welcome from './LogReg/welcome';
import Try from './try'
import Gender from './Questions/gender';
import Goal from './Questions/goal'
import BodyType from './Questions/bodytype';
import Age from './Questions/age';
import Weight from './Questions/weight'
import Height from './Questions/height'
import Activitylevel from './Questions/activitylevel'
import Loading from  './loading'
import HomePage from './Home/HomePage'
import Store from './Home/store';
import Workout from './Home/workout';
import Personaltrainer from './Home/personaltrainer';
import Meal from './Home/meal';
import Profile from './Home/profile';
import Steps  from './Home/step';
import RecipeDetail from './Home/RecipeDetail';
import mealplan  from './Home/mealplan';
import { FitnessContextProvider } from "./Context";
import QuesBackground from './Questions/QuesBackground'
import WorkOutScreen from './Home/WorkoutScreens/WorkoutScreen';
import FitScreen from './Home/WorkoutScreens/FitScreen';
import RestScreen from './Home/WorkoutScreens/RestScreen';
import Equipment from './Home/WorkoutScreens/Equipment';
import workoutExercises from './Home/WorkoutScreens/workoutExercises';
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
    RecipeDetail:undefined;
    mealplan:undefined;
    WorkoutScreen:undefined;
    FitScreen:undefined;
    RestScreen:undefined;
    Equipment:undefined;
    workoutExercises:undefined;
}
 
type  RootTabParamList ={
    HomePage:undefined,
    Store:undefined,
    Workout:undefined,
    Personaltrainer:undefined,
    Meal:undefined;
    Profile:undefined;
    Steps:undefined;
    RecipeDetail:undefined;
    mealplan:undefined;
    WorkScreen:undefined;
    FitScreen:undefined;
    RestScreen:undefined;
    Equipment:undefined;
    workoutExercises:undefined;
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
 <FitnessContextProvider>
        <RecoilRoot>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomePage" >
                <Stack.Group>
                    {authState?.authenticated ? (
                        <>
                        <Stack.Screen name="Steps" component={Steps} />
                        <Stack.Screen name="mealplan" component={mealplan} />
                        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
                        <Stack.Screen name="WorkoutScreen" component={WorkOutScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="FitScreen" component={FitScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="RestScreen" component={RestScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Equipment" component={Equipment} options={{headerShown:false}}/>
                        <Stack.Screen name="workoutExercises" component={workoutExercises} options={{headerShown:false}}/>
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
                                           tabBarInactiveTintColor:'#4B7B92',
                                           tabBarActiveTintColor:"#F9B500",
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
                                           tabBarInactiveTintColor:'#4B7B92',
                                           tabBarActiveTintColor:"#F9B500",
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
                                           tabBarInactiveTintColor:'#4B7B92',
                                           tabBarActiveTintColor:"#F9B500",
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
                                           tabBarInactiveTintColor:'#4B7B92',
                                           tabBarActiveTintColor:"#F9B500",
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
                                           tabBarInactiveTintColor:'#4B7B92',
                                           tabBarActiveTintColor:"#F9B500",
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
                                           tabBarInactiveTintColor:'#4B7B92',
                                           tabBarActiveTintColor:"#F9B500",
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
    </FitnessContextProvider>
    );
};