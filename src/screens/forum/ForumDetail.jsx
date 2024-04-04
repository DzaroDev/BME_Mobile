import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Keyboard,
  Alert,
  Button,
} from "react-native";
import React, { createRef, useEffect, useState } from "react";
import {
  APIMethod,
  APPSTRING,
  COLORS,
  DateTimeFormat,
} from "../../Constants";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import { format } from "date-fns";
import Comment from "./Comments";
import AppStyles from "../../config/AppStyles";
import { TextInput } from "react-native-gesture-handler";
import Axios from "../../api/Axios";
import Loader from "../../component/Loader";

export default function ForumDetail({ navigation, route }) {
  const { forumDetail } = route.params;
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  validateForm = () => {
    return true;
  };

  useEffect(() => {
    if (comment) {
    }
  }, [comment]);

  postYourComment = () => {
    setLoading(true);
    Axios.requestWithData(APIMethod.POST, `/api/forum/${forumDetail.id}/comment`, {
      content: comment,
    })
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          setComment('');
        } else {
          Alert.alert(APPSTRING.App_Name, res.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  const handleSendMessage = () => {
    if (comment.trim() === '') {
      Alert.alert(APPSTRING.ERROR, "Please enter a comment.");
      return;
    }
    postYourComment();
  };

  const renderUI = (item) => {
    return (
      <>
        <Loader loading={loading} />
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.content}</Text>
          <Text style={styles.metadata}>{`Asked by ${
            item.author.fullName
          } on ${format(item.createdAt, DateTimeFormat)}`}</Text>
        </View>
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your comment..."
            value={comment}
            onChangeText={setComment}
          />
          <Button
            style={{ color: COLORS.DARKBLUE, fontSize: 12 }}
            title="Add"
            onPress={handleSendMessage}
          />
        </View>
        <FlatList
          data={item.comments}
          renderItem={({ item }) => <Comment comment={item} />}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, backgroundColor: "darkgray" }} />;
          }}
        />
      </>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.FORUM}
      isScrollrequired={false}
    >
      {renderUI(forumDetail)}
    </RootComponent>
  );
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  item: {
    // margin: 16,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  itemText: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  metadata: {
    fontSize: 14,
  },
});
