import {
  View,
  Text,
  Alert,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { APIMethod, APIURL, APPSTRING } from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import RenderHTML from "react-native-render-html";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import PullToRefreshList from "../../component/PullToRefreshList";
import ImageWithFallback from "../../component/ImageWithFallback";
import { useNavigation } from "@react-navigation/native";
import NavigationRoute from "../../navigation/NavigationRoute";
import AppStyles from "../../config/AppStyles";
import FloatingButton from "../../component/FloatingButton";

const ListItem = ({ item, width }) => {
  const navigation = useNavigation();
  const { titleText, mainText, summaryText, images } = item;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate(NavigationRoute.BLOG_DETAIL, { data: item });
      }}
    >
      {images.length > 0 && (
        <ImageWithFallback
          uri={images[0].imageUrl}
          style={styles.itemPhoto}
          resizeMode={"contain"}
        ></ImageWithFallback>
      )}

      <Text style={AppStyles.headerText}>{titleText}</Text>
      <RenderHTML
        width={width}
        source={{ html: mainText }}
        style={{ pointerEvents: "none" }}
      />
      <Text style={AppStyles.headerText}>Description</Text>
      <RenderHTML
        width={width}
        source={{ html: summaryText }}
        style={{ pointerEvents: "none" }}
      />
    </TouchableOpacity>
  );
};

export default function BlogList({navigation}) {
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const { width } = useWindowDimensions();

  const getBlogsCall = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_ALL_BLOG)
      .then((res) => {
        if (res.status == 200) {
          setBlogList(res.data.data.blogs);
        } else {
          setBlogList([]);
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
    getBlogsCall();
  }, []);

  return (
    <RootComponent
      style={styles.container}
      title={PageTitle.BLOG_LIST}
      isScrollrequired={false}
    >
      <Loader loading={loading} />
      <PullToRefreshList
        data={blogList}
        renderItem={({ item }) => <ListItem item={item} width={width} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={getBlogsCall}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "gray" }} />;
        }}
      />
      <FloatingButton
        handleButtonClick={() => {
          navigation.navigate(NavigationRoute.CREATE_BLOG);
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
    width: "100%",
    height: 100,
    alignSelf: "center",
  },
  itemDescriptionText: {
    color: "#000",
    textTransform: "capitalize",
  },
});
