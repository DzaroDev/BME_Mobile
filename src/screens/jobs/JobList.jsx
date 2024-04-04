import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { APIMethod, APIURL, APPSTRING } from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import FloatingButton from "../../component/FloatingButton";
import RootComponent from "../../component/RootComponent";
import NavigationRoute from "../../navigation/NavigationRoute";
import PageTitle from "../../navigation/PageTitle";
import { useNavigation } from "@react-navigation/native";
import PullToRefreshList from "../../component/PullToRefreshList";
import AppStyles from "../../config/AppStyles";

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(NavigationRoute.JOB_DETAIL, { data: item });
      }}
      style={styles.item}
    >
      <Text style={AppStyles.headerText}>{item.jobTitle}</Text>
      <Text style={styles.itemDescriptionText}>{item.jobDescription}</Text>
    </TouchableOpacity>
  );
};

export default function JobList({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const { back } = route.params;

  const getJobCall = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_ALL_JOB)
      .then((res) => {
        if (res.status == 200) {
          setJobList(res.data.data.jobPostings);
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
    getJobCall();
  }, []);

  return (
    <RootComponent
      style={styles.container}
      title={PageTitle.JOB_LIST}
      isScrollrequired={false}
      back={back}
    >
      <Loader loading={loading} />
      <PullToRefreshList
        data={jobList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={getJobCall}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "gray" }} />;
        }}
      />
      <FloatingButton
        handleButtonClick={() => {
          navigation.navigate(NavigationRoute.CREATE_JOB);
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
});
