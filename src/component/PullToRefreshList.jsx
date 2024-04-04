import React from "react";
import { FlatList, RefreshControl, Text } from "react-native";
import { APPSTRING } from "../Constants";
import AppStyles from "../config/AppStyles";

const PullToRefreshList = ({
  onRefresh,
  refreshing,
  data,
  renderItem,
  keyExtractor,
  scrollEnabled,
  ItemSeparatorComponent
}) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={scrollEnabled}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListHeaderComponent={() =>
        !data.length ? (
          <Text style={AppStyles.emptyMessageStyle}>{APPSTRING.No_Record}</Text>
        ) : null
      }
    />
  );
};

export default PullToRefreshList;
