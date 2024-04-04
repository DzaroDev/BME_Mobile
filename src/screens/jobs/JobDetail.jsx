import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import ImageWithFallback from '../../component/ImageWithFallback';
import AppStyles from '../../config/AppStyles';

const JobDetail = ({ route }) => {
  const { jobTitle, jobDescription } = route.params.data;
  return (
    <RootComponent title={PageTitle.JOB_DETAIL}>
      <View style={styles.container}>
      <Text style={AppStyles.headerText}>{jobTitle}</Text>
      <Text style={styles.description}>{jobDescription}</Text>
      </View>
    </RootComponent>
  );
};

export default JobDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / 0.6,
  }
});
