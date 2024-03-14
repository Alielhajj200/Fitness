import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from './app/context/AuthContext';
import User from './user';
import Expert from './expert';

import { useRecoilState } from 'recoil';

const Home = ({navigation}) => {
   
    const { authState } = useAuth(); // Get authentication state from context
    
      
    return (
        <View style={styles.container}>
            { /*{role === "admin" && <Expert />}*/}
            <User navigation={navigation} />
             
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
});

export default Home;
