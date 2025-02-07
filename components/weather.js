import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './showIcon';

export default function Weather({ forecast }) {
  return (
    <View style={styles.container}>
      <Text>{forecast.hour}h</Text>
      <ShowIcon 
        icon={forecast.icon} 
        resolution="@2x" 
        size={50} 
      />
      <Text>{Math.round(forecast.temp)}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
  }
});