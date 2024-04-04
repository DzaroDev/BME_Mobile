import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../Constants";
import Ionicons from "react-native-vector-icons/Ionicons";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const NavigationHeader = ({ goBack, title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 42,
        alignItems: "center",
        paddingHorizontal: 12,
      }}
    >
      {!!goBack ? (
        <SimpleLineIcons
          onPress={!!goBack ? goBack : () => navigation.goBack()}
          name="arrow-left"
          color={COLORS.BLACK}
          size={20}
        />
      ) : (
        <Ionicons
          onPress={() => {
            navigation.openDrawer();
          }}
          name="menu"
          color={COLORS.BLACK}
          size={28}
        />
      )}
      <Text
        style={{
          color: COLORS.BLACK,
          fontWeight: "500",
          fontSize: 18,
        }}
      >
        {title}
      </Text>
      <Text />
    </View>
  );
};

export default NavigationHeader;
