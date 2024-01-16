import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/provider/AuthProvider';
import { AuthStackNavigator } from './src/navigation/StackNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import Loader from './src/component/Loader';
import { LocalStorage } from './src/Constants';
import AppStyles from './src/config/AppStyles';
import Icon from 'react-native-vector-icons/AntDesign';

// function HomeScreen() {
//   const { setIsLoggedIn } = React.useContext(AuthContext);
//   const logout = async () => {
//     await AsyncStorage.removeItem('@token');
//     setIsLoggedIn(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Home Screen</Text>
//       <Text>User is logged in!</Text>
//       <Button onPress={logout} title="LOGOUT" />
//     </View>
//   );
// }

const Stack = createStackNavigator();
function AppRoot() {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const { getItem } = useAsyncStorage(LocalStorage.AccessToken);
  const [checking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    Icon.loadFont();
    const checkIfUserIsLoggedIn = async () => {
      const item = await getItem();
      // user is logged in
      if (item !== null) {
          setIsLoggedIn(true);
      }
       setIsChecking(false);
    };
    checkIfUserIsLoggedIn();
  }, []);

  {
    (checking) &&
      <View style={AppStyles.container}>
        <Loader loading={checking}></Loader>
      </View>

  }

  return (
    <NavigationContainer>
      {isLoggedIn ?
        <DrawerNavigator />
        :
        <AuthStackNavigator />
      }
    </NavigationContainer>
  );
}

export default AppRoot;