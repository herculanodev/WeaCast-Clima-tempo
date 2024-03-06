import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExibirDadosDoAsyncStorage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const dadosSalvos = await AsyncStorage.multiGet(keys);
        
        // Armazenar os dados em um array para exibição
        setData(dadosSalvos);
      } catch (error) {
        console.error('Erro ao carregar os dados do AsyncStorage:', error);
      }
    };

    carregarDados();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {data.length > 0 ? (
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 20 }}>
          {data.map((item, index) => (
            <Text key={index}>Chave: {item[0]}, Valor: {item[1]}</Text>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Nenhum dado encontrado no AsyncStorage</Text>
        </View>
      )}
    </View>
  );
};

export default ExibirDadosDoAsyncStorage;
