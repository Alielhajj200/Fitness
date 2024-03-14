import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
  const translateY = useRef(new Animated.Value(-100)).current; // Initial translateY position

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0, // Final translateY position (drop down)
      duration: 500, // Animation duration in milliseconds
      easing: Easing.bezier(0.17, 0.67, 0.83, 0.67), // Custom easing function for a smooth drop effect
      useNativeDriver: true, // Enable native driver for better performance
    }).start(); // Start the animation
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.alert}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, // Drop from the top
    left: 0,
    right: 0,
    zIndex: 999, // Ensure the alert is above other components
    alignItems: 'center', // Center horizontally
  },
  alert: {
    backgroundColor: '#39FF14', // Oval container color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50, // Make it oval-shaped
    flexDirection: 'row', // Align text and close button horizontally
    alignItems: 'center', // Center vertically
    width: '80%',
    marginTop:80
  },
  message: {
    color: 'black', // Text color
    fontWeight: 'bold',
    flex: 1, // Expand to fill available space
    textAlign: 'center', // Center the text horizontally
  },
  closeButton: {
    backgroundColor: '#ff14af', // Close button background color
    padding: 5,
    borderRadius: 20, // Make it circular
  },
  closeButtonText: {
    color: 'white', // Close button text color
    fontWeight: 'bold',
  },
});

export default CustomAlert;
