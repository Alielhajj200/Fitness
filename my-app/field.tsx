import React from 'react';
import { TextInput } from 'react-native';

const CustomTextInput = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 10,
        paddingHorizontal: 15,
        width: '78%',
        backgroundColor: '#f0f0f0', // Set a suitable background color
        borderWidth: 1,
        borderColor: '#f0f0f0', // Set a border color
        marginBottom: 10,
        marginVertical:10
      }}
      
      
    />
  );
}

export default CustomTextInput;
