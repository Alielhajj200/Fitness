import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';

interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground source={require("../assets/question2.jpeg") as ImageSourcePropType} style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Background;
