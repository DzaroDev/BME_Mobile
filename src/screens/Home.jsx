import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import { APIMethod, APIURL, BME_Logo } from '../Constants';
import { SearchBar } from 'react-native-elements';
import Axios from '../api/Axios';
import Loader from '../component/Loader';

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      {(item.uri) &&
        <Image
          source={{
            uri: item.uri,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
      }

      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

export default () => {

  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false);
  const [contentList, setContentList] = useState('');

  getPageContent = () => {
    setLoading(true)
    var contents = []
    Axios.request(APIMethod.GET, APIURL.GTE_PAGE_CONTENT).then((res) => {
      console.log(JSON.stringify(res.data.data))
      if (res.status == 200) {
        Object.keys(res.data.data).forEach(value => {
          switch (value) {
            case 'companyList':
              contents.push({
                title: 'Vendor Directory',
                horizontal: true, data: res.data.data[value]
              })
              break
            case 'blogList':
              contents.push({
                title: 'Latest News',
                horizontal: true, data: res.data.data[value]
              })
              break
            case 'jobPostList':
              contents.push({
                title: 'Jobs',
                horizontal: true, data: res.data.data[value]
              })
              break
            default:
              break
          }
        })

        setContentList(contents);
      } else {
        Alert.alert(APPSTRING.App_Name, res.message)
      }
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
      Alert.alert(APPSTRING.App_Name, error.data.message)
    })
  }

  useEffect(() => {
    getPageContent();
  }, [])

  return (
    //
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <ScrollView>
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        onChangeText={(text) => {
          setSearchText(text)
        }}
        value={searchText}
      />
      <Text style={[styles.sectionHeader, { paddingHorizontal: 16 }]}>About Company</Text>
      <Text style={[styles.itemText, { paddingHorizontal: 16 }]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>

      <Image
        source={BME_Logo}
        style={styles.logo} />
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        stickySectionHeadersEnabled={false}
        scrollEnabled={false}
        sections={contentList}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            {section.horizontal ? (
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            ) : null}
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
    </SafeAreaView>
  );
};

// const SECTIONS = [
//   {
//     title: 'Vendor Directory',
//     horizontal: true,
//     data: [
//       {
//         key: '1',
//         text: 'Compnay 1',
//         uri: 'https://picsum.photos/id/1/200',
//       },
//       {
//         key: '2',
//         text: 'Compnay 2',
//         uri: 'https://picsum.photos/id/10/200',
//       },

//       {
//         key: '3',
//         text: 'Compnay 3',
//         uri: 'https://picsum.photos/id/1002/200',
//       },
//       {
//         key: '4',
//         text: 'Compnay 4',
//         uri: 'https://picsum.photos/id/1006/200',
//       },
//       {
//         key: '5',
//         text: 'Item text 5',
//         uri: 'https://picsum.photos/id/1008/200',
//       },
//     ],
//   },
//   {
//     title: 'Latest News',
//     horizontal: true,
//     data: [
//       {
//         key: '1',
//         text: 'Article 1',
//       },
//       {
//         key: '2',
//         text: 'Article 2',
//       },

//       {
//         key: '3',
//         text: 'Article 3',
//       },
//       {
//         key: '4',
//         text: 'Article 4',
//       },
//       {
//         key: '5',
//         text: 'Article 5',
//       },
//     ],
//   }
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'start',
    flexDirection: 'column',
    padding: 16,
    gap: 0
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'center',
    alignSelf: 'center'
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#000',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    margin: 10
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  itemText: {
    color: '#000',
    textTransform: 'capitalize'
  },
});