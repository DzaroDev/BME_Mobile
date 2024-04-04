import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your desired icon library

const TextInputWithIcon = ({ icon, onIconPress, ...rest }) => {
  return (
    <View style={styles.container}>
      <TextInput {...rest} />
      <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
        <Icon name={icon} size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default TextInputWithIcon;
