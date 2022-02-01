import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';

function Comment({comments}) {
  const [bw, setBW] = useState(0);

  useEffect(() => {
    if (comments.length !== 0) setBW(1);
    else setBW(0);
  }, [comments]);

  return (
    <FlatList
      style={(styles.commentBox, {borderWidth: bw})}
      horizontal
      data={comments}
      renderItem={({item}) => <Text style={styles.comment}>{item}</Text>}
    />
  );
}
const styles = StyleSheet.create({
  commentBox: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  comment: {
    fontSize: 20,
    color: 'white',
    borderWidth: 1,
    padding: 3,
    margin: 3,
  },
});

export default Comment;
