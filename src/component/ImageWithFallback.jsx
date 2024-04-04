import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useAuth } from "../provider/AuthProvider";
import { Placeholder } from "../Constants";

const ImageWithFallback = ({ uri, style, resizeMode }) => {
  const [imageError, setImageError] = useState(false);
  const { accessToken } = useAuth();
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <View style={style}>
      {!uri || imageError ? (
        <Image
          style={[styles.image, { resizeMode: resizeMode }]}
          source={Placeholder}
        />
      ) : (
        <Image
          style={[styles.image, { resizeMode: resizeMode }]}
          source={{
            uri,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }}
          onError={handleImageError}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageWithFallback;
