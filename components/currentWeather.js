import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShowIcon from './showIcon';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWind, faTint, faCloudRain } from '@fortawesome/free-solid-svg-icons';

export default function CurrentWeather({ data }) {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (data && data.list) {
      const firstWeather = data.list[0];
      setCurrentWeather({
        city: data.city.name,
        date: new Date(firstWeather.dt * 1000).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long'
        }),
        icon: firstWeather.weather[0].icon,
        temp: Math.round(firstWeather.main.temp),
        description: firstWeather.weather[0].description,
        windSpeed: firstWeather.wind.speed, // 🌬️ Vitesse du vent en m/s
        humidity: firstWeather.main.humidity, // 💧 Humidité en %
        pressure: firstWeather.main.pressure, // 📏 Pression en hPa
        rain: firstWeather.rain ? firstWeather.rain["3h"] : 0 // 🌧️ Volume de p
      });
    }
  }, [data]);

  if (!currentWeather) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.cityText}>{currentWeather.city}</Text>
      <Text style={styles.dateText}>{currentWeather.date}</Text>
      <ShowIcon
        icon={currentWeather.icon}
        resolution="@2x"
        size={100}
      />
      <Text style={styles.tempText}>{currentWeather.temp}°C</Text>
      <Text style={styles.descText}>{currentWeather.description}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailBlock}>
          <FontAwesomeIcon icon={faWind} size={15} color="gray" />
          <Text style={styles.detailText}>{currentWeather.windSpeed} m/s</Text>
        </View>

        <View style={styles.detailBlock}>
          <FontAwesomeIcon icon={faTint} size={15} color="#5ba0f5" />
          <Text style={styles.detailText}>{currentWeather.humidity}%</Text>
        </View>

        <View style={styles.detailBlock}>
          <FontAwesomeIcon icon={faCloudRain} size={15} color="gray" />
          <Text style={styles.detailText}>{currentWeather.rain} mm</Text>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  dateText: {
    fontSize: 18
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold'
  },
  descText: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  detailText: {
    fontSize: 16,
    marginTop: 10,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '500',

  },
  detailsContainer: {
    backgroundColor: 'rgba(200,200,200,0.9)',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 190,
  },
  detailBlock: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 5,

  },


});