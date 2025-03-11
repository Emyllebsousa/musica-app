import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }: any) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Carregar músicas salvas no AsyncStorage quando a tela for carregada
  useEffect(() => {
    const loadSavedMusic = async () => {
      const savedMusic = await AsyncStorage.getItem("@musicList");
      if (savedMusic) {
        setSearchResults(JSON.parse(savedMusic));
      }
    };

    loadSavedMusic();
  }, []);

  const navigateToAddMusicScreen = () => {
    navigation.navigate("AddMusic");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Music</Text>

      {/* Exibe a lista de músicas salvas */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id ? item.id.toString() : item.nome_da_musica} // Verifica se 'id' existe
        renderItem={({ item }) => (
          <View style={styles.musicItem}>
            <Text style={styles.musicText}>
              {item.nome_da_musica} - {item.nome_do_artista}
            </Text>
          </View>
        )}
      />

      {/* Botão para navegar para a tela de adicionar música */}
      <Button title="Add Music" onPress={navigateToAddMusicScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  musicItem: {
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  musicText: {
    fontSize: 18,
  },
});

export default HomeScreen;
