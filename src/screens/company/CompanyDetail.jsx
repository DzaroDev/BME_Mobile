import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import ImageWithFallback from "../../component/ImageWithFallback";
import AppStyles from "../../config/AppStyles";

const CompanyDetail = ({ route }) => {
  const { name, description, logoImage } = route.params.data;
  return (
    <RootComponent title={PageTitle.COMPANY_DETAIL}>
      <View style={styles.container}>
        <ImageWithFallback
          uri={logoImage}
          style={styles.image}
          resizeMode={"contain"}
        />
        <Text style={AppStyles.headerText}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </RootComponent>
  );
};

export default CompanyDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 0.6,
  },
});
