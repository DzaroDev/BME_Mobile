import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "./src/provider/AuthProvider";
import { AuthStackNavigator } from "./src/navigation/StackNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import Icon from "react-native-vector-icons/AntDesign";

function AppRoot() {
  const { isLoggedIn } = useAuth();
  //const [checking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    Icon.loadFont();
    // const checkIfUserIsLoggedIn = async () => {
    //   const item = await getItem();
    //   if (item !== null) {
    //       setIsLoggedIn(true);
    //   }
    //    setIsChecking(false);
    // };
    // checkIfUserIsLoggedIn();
  }, []);

  // {
  //   (checking) &&
  //     <View style={AppStyles.container}>
  //       <Loader loading={checking}></Loader>
  //     </View>

  // }

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default AppRoot;
