import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../Constants";

const BottomBorder = ({ color = COLORS.BORDER, height = 1 }) => {
  return (
    <View
      style={[
        styles.border,
        { borderBottomColor: color, borderBottomWidth: height },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1, // Default border width
    borderBottomColor: "black", // Default border color
  },
});

export default BottomBorder;
