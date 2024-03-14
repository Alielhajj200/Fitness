import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Btn = ({ bgColor, btnLabel, textColor , onpress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: "78%",
      }}
      onPress={onpress}
    >
      <Text style={{ color: textColor, fontSize: 22, fontWeight: 'bold' }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}

export default Btn;
