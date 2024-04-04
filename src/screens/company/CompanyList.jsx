import { View, Text, Alert, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { APIMethod, APIURL, APPSTRING } from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import AppStyles from "../../config/AppStyles";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import PullToRefreshList from "../../component/PullToRefreshList";
import ImageWithFallback from "../../component/ImageWithFallback";
import { TouchableOpacity } from "react-native-gesture-handler";
import NavigationRoute from "../../navigation/NavigationRoute";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate(NavigationRoute.COMPANY_DETAIL, { data: item });
    }} style={styles.item}>
      <ImageWithFallback
        uri={item.logoImage}
        style={styles.itemPhoto}
        resizeMode={"contain"}
      ></ImageWithFallback>
      <View style={{ flexDirection: "column", alignSelf: "center" }}>
        <Text style={AppStyles.headerText}>{item.name}</Text>
        <Text style={styles.itemDescriptionText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function CompanyList({ route, navigation }) {
  const { back } = route.params;
  const [loading, setLoading] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getCompanyCall();
  }, []);

  const getCompanyCall = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_ALL_COMPANY)
      .then((res) => {
        if (res.status == 200) {
          setCompanyList(res.data.data);
        } else {
          Alert.alert(APPSTRING.App_Name, res.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  return (
    <RootComponent
      style={styles.container}
      title={PageTitle.COMPANY_LIST}
      isScrollrequired={false}
      back={back}
    >
      <Loader loading={loading} />
      <PullToRefreshList
        data={companyList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={getCompanyCall}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "darkgray" }} />;
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
  },
  item: {
    flexDirection: "row",
    borderColor: "gray",
    padding: 8,
    gap: 5,
  },
  itemPhoto: {
    width: 100,
    height: 100,
  },
  itemDescriptionText: {
    color: "#000",
    textTransform: "capitalize",
  },
});
