import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

// Importações de imagens aqui...

const WeatherPesq = ({ cidade, estado, lat, long }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (lat && long) {
      fetchWeather();
    }
  }, [lat, long]); // Dependências do useEffect

  const fetchWeather = async () => {
    // Configurações da API aqui...
    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Erro ao obter dados da API de previsão do tempo', error);
    }
  };

  const getWeatherImage = (weatherCondition) => {
    // Sua lógica de seleção de imagem aqui...
  };
  
  if (!weatherData) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.square}>
      <View style={styles.weatherContainer}>
        <Text style={styles.cityText}>
          {cidade}, {estado}, Brasil
        </Text>
        <Image source={getWeatherImage(weatherData.current.condition.text)} style={{ width: 100, height: 100 }} />
        <Text style={styles.tempText}>
          {weatherData.current.temp_c}°C
        </Text>
        <Text style={styles.weatherText}>
          {weatherData.current.condition.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0
  },
  weatherText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  tempText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
    cityText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  square: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 60,
},
});

export default WeatherPesq;
