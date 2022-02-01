import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {View, Text, StyleSheet} from 'react-native';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Sharegram</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8442f5',
    padding: 5,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'cursive',
    alignSelf: 'center',
    color: 'white',
  },
});

export default Header;
