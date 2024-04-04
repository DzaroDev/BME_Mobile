import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../Constants';

const FloatingButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.handleButtonClick}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    right:16,
    bottom:0,
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  button: {
    backgroundColor: COLORS.DARKBLUE,
    padding: 7,
    height:40,
    width:40,
    borderRadius: 20, // Make it circular
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize:20,
    fontWeight:'500'
  },
});

export default FloatingButton;
