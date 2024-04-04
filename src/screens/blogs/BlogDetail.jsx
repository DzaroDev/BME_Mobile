import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import ImageWithFallback from "../../component/ImageWithFallback";
import RenderHTML from "react-native-render-html";
import AppStyles from "../../config/AppStyles";
import BottomBorder from "../../component/BottomBorder";

const BlogDetail = ({ route }) => {
  const { width } = useWindowDimensions();
  const { titleText, mainText, summaryText, images } = route.params.data;
  return (
    <RootComponent title={PageTitle.BLOG_DETAIL}>
      <View style={styles.container}>
        {images.length > 0 && (
          <ImageWithFallback
            uri={images[0].imageUrl}
            style={styles.image}
            resizeMode={"contain"}
          />
        )}
        <Text style={[AppStyles.headerText]}>{titleText}</Text>
        <RenderHTML width={width} source={{ html: mainText }} />
        <Text style={AppStyles.headerText}>Description</Text>
        <RenderHTML width={width} source={{ html: summaryText }} />
      </View>
    </RootComponent>
  );
};

export default BlogDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 5,
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
