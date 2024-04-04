import { View, Text, Alert, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  APIMethod,
  APIURL,
  APPSTRING,
  COLORS,
  DateTimeFormat,
  dateTimeFormat,
} from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import { useAuth } from "../../provider/AuthProvider";
import AppStyles from "../../config/AppStyles";
import FloatingButton from "../../component/FloatingButton";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import NavigationRoute from "../../navigation/NavigationRoute";
import { format } from "date-fns";
import Comment from "./Comments";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import PullToRefreshList from "../../component/PullToRefreshList";

const ListItem = ({ item }) => {
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(NavigationRoute.FORUM_DETAIL, {
          forumDetail: item,
        });
      }}
    >
      <View style={styles.item}>
        <Text style={AppStyles.headerText}>{item.content}</Text>
        <Text style={styles.metadata}>{`Asked by ${
          item.author.fullName
        } on ${format(item.createdAt, DateTimeFormat)}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function ForumList({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [forumList, setForumList] = useState([]);
  const { back } = route.params;

  const getForumCall = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_ALL_FORUM)
      .then((res) => {
        if (res.status == 200) {
          setForumList(res.data.data.posts);
        } else {
          setForumList([]);
          Alert.alert(APPSTRING.App_Name, res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  useEffect(() => {
    getForumCall();
  }, []);

  return (
    <RootComponent
      style={styles.container}
      title={PageTitle.FORUM}
      back={back}
      isScrollrequired={false}
    >
      <Loader loading={loading} />
      <PullToRefreshList
        data={forumList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={getForumCall}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "gray" }} />;
        }}
      />
      <FloatingButton
        handleButtonClick={() => {
          navigation.navigate(NavigationRoute.POST_YOUR_QUESTION);
        }}
      />
    </RootComponent>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "start",
    flexDirection: "column",
    gap: 0,
  },
  item: {
    margin: 16,
  },
  itemPhoto: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  itemDescriptionText: {
    color: "#000",
    textTransform: "capitalize",
  },
  metadata: {
    fontSize: 14,
  },
});
