import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  FlatList,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { ABOUT_US, APIMethod, APIURL, APPSTRING, BME_Logo } from "../Constants";
import { SearchBar } from "react-native-elements";
import Axios from "../api/Axios";
import Loader from "../component/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import RootComponent from "../component/RootComponent";
import PageTitle from "../navigation/PageTitle";
import AppStyles from "../config/AppStyles";
import ViewMoreButton from "../component/ViewMoreButton";
import ImageWithFallback from "../component/ImageWithFallback";
import { useNavigation } from "@react-navigation/native";
import NavigationRoute from "../navigation/NavigationRoute";

const ListItem = ({ item, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // switch (item.type) {
        //   case "companyList":
        //     navigation.navigate(NavigationRoute.COMPANY_DETAIL, { data: item });
        //     break;
        //   case "blogList":
        //     navigation.navigate(NavigationRoute.BLOG_DETAIL, { data: item });
        //     break;
        //   case "jobPostList":
        //     navigation.navigate(NavigationRoute.JOB_DETAIL, { data: item });
        //     break;
        // }
      }}
    >
      {type !== "jobPostList" && (
        <ImageWithFallback
          uri={item.image}
          style={styles.itemPhoto}
          resizeMode={"contain"}
        ></ImageWithFallback>
      )}
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentList, setContentList] = useState("");

  getPageContent = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_PAGE_CONTENT)
      .then((res) => {
        if (res.status == 200) {
          const contents = Object.keys(res.data.data).map((value, index) => {
            switch (value) {
              case "companyList":
                return {
                  title: "Vendor Directory",
                  horizontal: true,
                  data: res.data.data[value],
                  index: index,
                  type: value,
                };
              case "blogList":
                return {
                  title: "Latest News",
                  horizontal: true,
                  data: res.data.data[value],
                  index: index,
                  type: value,
                };
              case "jobPostList":
                return {
                  title: "Jobs",
                  horizontal: true,
                  data: res.data.data[value],
                  index: index,
                  type: value,
                };
              default:
                break;
            }
          });
          setContentList(contents);
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

  useEffect(() => {
    getPageContent();
  }, []);

  return (
    //
    <RootComponent
      style={AppStyles.container}
      title={PageTitle.HOME}
      isScrollrequired={false}
      back={false}
    >
      <Loader loading={loading} />
      <ScrollView>
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          containerStyle={{ backgroundColor: "transparent" }}
          inputContainerStyle={{ backgroundColor: "transparent" }}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          value={searchText}
        />
        <View style={[AppStyles.containerPadding, { gap: 5 }]}>
          <Text style={[styles.sectionHeader, AppStyles.headerText]}>
            About Company
          </Text>
          <Text style={[styles.itemText]}>
            Welcome to BME Bharat App, your ultimate companion in the world of
            biomedical engineering. We are a passionate team of professionals,
            dedicated to simplifying and enhancing the way you engage with
            biomedical engineering concepts and technologies.
          </Text>
          <ViewMoreButton
            onPress={() => {
              navigation.navigate("MyInAppWebView", {
                url: ABOUT_US,
                title: PageTitle.ABOUT_US,
              });
            }}
          ></ViewMoreButton>
        </View>

        <Image source={BME_Logo} style={AppStyles.logo} />
        <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={true}
          scrollEnabled={false}
          sections={contentList}
          renderSectionHeader={({ section }) => (
            <>
              <View style={[styles.sectionHeader]}>
                <Text style={AppStyles.headerText}>{section.title}</Text>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      switch (section.index) {
                        case 0:
                          navigation.navigate("CompanyStack");
                          break;
                        case 1:
                          navigation.navigate("LatestArticle");
                          break;
                        case 2:
                          navigation.navigate("JobStack");
                          break;
                      }
                    }}
                  >
                    {section.data.length > 1 ? (
                      <Text
                        style={[styles.viewAllButton, { textAlign: "right" }]}
                      >
                        View All
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                </View>
              </View>
              {section.horizontal && (
                <FlatList
                  horizontal
                  data={section.data}
                  renderItem={({ item }) => (
                    <ListItem item={item} type={section.type} />
                  )}
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={() =>
                    !section.data.length ? (
                      <Text style={AppStyles.emptyMessageStyle}>
                        {APPSTRING.No_Record}
                      </Text>
                    ) : null
                  }
                />
              )}
            </>
          )}
          renderItem={({ item, section }) => {
            if (section.horizontal) {
              return null;
            }
            return <ListItem item={item} />;
          }}
        />
      </ScrollView>
    </RootComponent>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: 20,
    marginBottom: 5,
    flex: 1,
    flexDirection: "row",
  },
  viewAllButton: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  item: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 8,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemPhoto: {
    width: 100,
    height: 100,
  },
  itemText: {
    color: "#000",
    textTransform: "capitalize",
    fontSize: 15,
  },
});
