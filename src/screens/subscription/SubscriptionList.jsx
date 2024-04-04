import { View, Text, Alert, FlatList, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { APIMethod, APIURL, APPSTRING } from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import AppStyles from "../../config/AppStyles";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{`Plan - ${item.name}`}</Text>
      <Text
        style={styles.itemDescriptionText}
      >{`Description - ${item.description}`}</Text>
      <Text style={styles.itemDescriptionText}>{`Price - ₹${item.price}`}</Text>
    </View>
  );
};

export default function SubscriptionList() {
  const [loading, setLoading] = useState(false);
  const [subscriptionList, setSubscriptionList] = useState([]);

  const getSubscriptionCall = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_SUBSCRIPTION)
      .then((res) => {
        if (res.status == 200) {
          setSubscriptionList(res.data.data);
        } else {
          setJobList([]);
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
    getSubscriptionCall();
  }, []);

  return (
    <RootComponent
      style={styles.container}
      title={PageTitle.SUBSCRIPTION_LIST}
      back={false}
    >
      <Loader loading={loading} />
      <FlatList
        scrollEnabled={false}
        data={subscriptionList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() =>
          !subscriptionList.length ? (
            <Text style={AppStyles.emptyMessageStyle}>
              {APPSTRING.No_Record}
            </Text>
          ) : null
        }
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "gray" }} />;
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
  itemText: {
    color: "#000",
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  itemDescriptionText: {
    color: "#000",
    fontSize: 14,
    textTransform: "capitalize",
  },
});
