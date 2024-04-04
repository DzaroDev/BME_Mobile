import React from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import your desired icon library
import AppStyles from "../config/AppStyles";

const TextInputWithCalendarIcon = ({ onIconPress, ...rest }) => {
  return (
    <View style={[AppStyles.inputText, {flexDirection:'row'}]}>
      <TextInput style={AppStyles.inputText} {...rest} />
      <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
        <Icon name="calendar" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default TextInputWithCalendarIcon;
