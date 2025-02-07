import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import CurrentWeather from './components/currentWeather';
import ForecastWeather from './components/forecastWeather';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const API_KEY = 'd6def4924ad5f9a9b59f3ae895b234cb';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return;
      }

      let position = await Location.getCurrentPositionAsync({});
      setLocation(position.coords);
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    })();
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeatherByCity = async () => {
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      console.log("Reponse:", geoResponse.data);

      if (geoResponse.data.length > 0) {
        const { lat, lon } = geoResponse.data[0];
        fetchWeatherByCoords(lat, lon);
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/background5.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez une ville...."
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={fetchWeatherByCity}
          >
            <FontAwesomeIcon
              icon={faSearch}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {weatherData && (
          <>
            <CurrentWeather data={weatherData} />
            <ForecastWeather data={weatherData} />
          </>
        )}
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 9,
  },
  searchButton: {
    padding: 10,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: 'white',
  },
});
