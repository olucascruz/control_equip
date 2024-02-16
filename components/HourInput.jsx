import React from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { View, StyleSheet } from 'react-native';

export default function HourInput({ onValueChange, placeholder }){
    const handleChange = (text) => {
        onValueChange(text);
      };
    
    return (
      <TextInputMask
        style={styles.input}
        type={'custom'}
        options={{
          mask: '99:99'
        }}
        onChangeText={handleChange}
        placeholder={placeholder || 'HH:MM'}
      />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:"#fff",
    width: "70%",
    height:50,
    borderRadius:5,
    marginTop:20,
    marginBottom:10,
    paddingHorizontal: 10,
  },
});


