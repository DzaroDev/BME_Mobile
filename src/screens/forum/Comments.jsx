import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { DateTimeFormat } from '../../Constants';

const Comment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.commentText}>{comment.content}</Text>
      <Text style={styles.metadata}>{`Commented by ${comment.author.fullName} on ${format(comment.createdAt, DateTimeFormat)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginBottom: 5,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 16,
  },
  metadata: {
    fontSize: 12,
    color: '#666666',
  },
});

export default Comment;
