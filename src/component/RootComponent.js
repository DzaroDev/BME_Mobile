import * as React from "react"
import { View, TouchableWithoutFeedback, Keyboard } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { SafeAreaView } from "react-native-safe-area-context"

/**
 * Root component for screen managing safe area view and keyboard avoiding view
 */
const RootComponent = (props) => {
  const { style, children } = props

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}} forceInset={{'top': 'never'}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{
          flexGrow: 1 // this will fix scrollview scroll issue by passing parent view width and height to it
        }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flexGrow: 1 }}
        >
          <View style={[style, { flexGrow: 1, padding: 16 }]}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    // </SafeAreaView>
  )
}

export default RootComponent;