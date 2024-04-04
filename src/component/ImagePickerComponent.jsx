import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "react-native-image-picker";
import { BottomSheet, ListItem } from "@rneui/themed";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../Constants";
import { useAuth } from "../provider/AuthProvider";

const ImagePickerComponent = ({ onSelect, uri }) => {
  const includeExtra = true;

  const { accessToken } = useAuth();
  const [response, setResponse] = React.useState({
    uri: uri,
  });
  const [isVisible, setIsVisible] = useState(false);

  const selectImage = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const onButtonPress = React.useCallback(async (type, options) => {
    if (type === "capture") {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          const data = response.assets[0];
          setResponse(data);
          onSelect(data);
          closeModal();
        }
      });
    }
    setIsVisible(false);
  }, []);

  renderImagePicker = () => {
    const list = [
      {
        title: "Take Image",
        onPress: () =>
          onButtonPress("capture", {
            saveToPhotos: true,
            mediaType: "photo",
            includeBase64: false,
            includeExtra,
            maxHeight: 200,
            maxWidth: 200,
          }),
      },
      {
        title: "Select Image",
        onPress: () =>
          onButtonPress("library", {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: "photo",
            includeBase64: false,
            includeExtra,
          }),
      },
      {
        title: "Cancel",
        containerStyle: { backgroundColor: "red" },
        titleStyle: { color: "white" },
        onPress: () => setIsVisible(false),
      },
    ];
    return (
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
  };

  renderProfileImage = () => {
    return (
      <View style={[AppStyles.inputMainView, { alignItems: "center" }]}>
        <TouchableOpacity onPress={selectImage}>
          {response.uri ? (
             <Image
             source={{
               uri: response.uri,
               headers: {
                 Authorization: `Bearer ${accessToken}`,
               },
             }}
             resizeMode="cover"
             style={{ width: 120, height: 120, borderRadius: 60 }}
           />
          ) : (
            <FontAwesome name="user-circle" color={COLORS.BLACK} size={120} />
          )}
          {/* <FontAwesome
            name="edit"
            color={COLORS.BLACK}
            size={24}
            style={{
              position: "absolute",
              bottom: -8,
              right: -8,
            }}
          /> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderImagePicker()}
      {renderProfileImage()}
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ImagePickerComponent;
