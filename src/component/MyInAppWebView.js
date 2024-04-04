import React, { useState } from "react";
import { WebView } from "react-native-webview";
import RootComponent from "./RootComponent";
import Loader from "./Loader";

const MyInAppWebView = ({ route, navigation }) => {
  const {url, title} = route.params
  const [loading, setLoading] = useState(true);

  const handleLoadProgress = ({ nativeEvent }) => {
    setLoading(nativeEvent.progress !== 1);
  };
  return (
    <RootComponent title={title} style={{padding: 10,}}>
      <Loader loading={loading} />
      <WebView source={{ uri: url }} onLoadProgress={handleLoadProgress} />
    </RootComponent>
  );
};

export default MyInAppWebView;
