import * as React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationHeader from "./NavigationHeader";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

/**
 * Root component for screen managing safe area view and keyboard avoiding view
 */
const RootComponent = (props) => {
  const { style, children, navHeader, title, back, isScrollrequired } = props;
  const navigation = useNavigation();

  renderUI = () => {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ flexGrow: 1 }}
      >
        <>
          {navHeader && (
            <NavigationHeader
              title={title}
              goBack={back ? () => navigation.goBack() : false}
            />
          )}
          <View style={[{ flexGrow: 1, paddingVertical: 12 }, style]}>
            {children}
          </View>
        </>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      forceInset={{ top: "never" }}
    >
      {isScrollrequired ? (
        <KeyboardAwareScrollView
          // keyboardShouldPersistTaps={"always"}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {renderUI()}
        </KeyboardAwareScrollView>
      ) : (
        renderUI()
      )}
    </SafeAreaView>
  );
};

export default RootComponent;

RootComponent.propTypes = {
  navHeader: PropTypes.bool,
  back: PropTypes.bool,
  isScrollrequired: PropTypes.bool,
};
RootComponent.defaultProps = {
  navHeader: true,
  back: true,
  isScrollrequired: true,
};
