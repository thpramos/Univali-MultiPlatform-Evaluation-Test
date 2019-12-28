import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    flexDirection: 'column',
  },
  rowText: {
    fontSize: 14,
    color:'#838383'
  },
  rowHeading:{
    fontSize: 16,
    color: '#353535'
  }
});



const Row = (props) => (
    <View style={styles.container}>
      <Text style={styles.rowHeading}>{props.name}</Text>
      <Text style={styles.rowText}>{props.distance}m</Text>
    </View>
);

export default Row;
