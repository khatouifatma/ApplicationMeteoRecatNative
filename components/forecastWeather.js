import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Weather from './weather';

export default function ForecastWeather({ data }) {
  const [forecastsGrouped, setForecastsGrouped] = useState([]);

  useEffect(() => {
    if (data && data.list) {
      const forecastsData = data.list.map(forecast => {
        let forecastDate = new Date(forecast.dt_txt);
        return ({
          date: forecastDate,
          hour: forecastDate.getHours(),
          day: forecastDate.toLocaleDateString('fr-FR', {
            weekday: "long", 
            day: 'numeric', 
            month: "long"
          }),
          temp: forecast.main.temp,
          icon: forecast.weather[0].icon,
        });
      });

      const daysGrouped = [...new Set(forecastsData.map(forecast => forecast.day))];

      const groupedForecasts = daysGrouped.map(day => {
        const forecasts = forecastsData.filter(forecast => forecast.day === day);
        return { 
          day: day === daysGrouped[0] ? "Aujourd'hui" : day, 
          data: forecasts 
        };
      });

      setForecastsGrouped(groupedForecasts);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastsGrouped.map((dayGroup, index) => (
          <View key={index} style={[
            styles.dayContainer, 
            index > 0 ? styles.grayBackground : null
          ]}>
            <Text style={styles.dayText}>{dayGroup.day}</Text>
            <ScrollView horizontal>
              {dayGroup.data.map((forecast, idx) => (
                <Weather key={idx} forecast={forecast} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  dayContainer: {
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(200,200,200,0.9)',
    // alignItems:'center'
  },
  grayBackground: {
    backgroundColor: 'rgba(200,200,200,0.9)',
    borderRadius:5

  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});