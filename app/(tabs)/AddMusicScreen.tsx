import React, { useState, useLayoutEffect } from "react";
import { Button, StyleSheet, TextInput, View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importação do AsyncStorage

// Função para buscar os detalhes da música na API
const fetchMusicDetails = async (musicName: string) => {
  try {
    const response = await fetch(`https://gist.githubusercontent.com/billiezinha/774b5a0ae247f7370a86d307ded19ba1/raw/fa619a13fa2e6b35e6eec960412784a004fb5d22/api-billie.json`);
    
    if (!response.ok) {
      throw new Error("Erro ao buscar detalhes da música");
    }

    const data = await response.json();

    // Verificar se a resposta contém a lista de músicas
    if (Array.isArray(data.musicas)) {
      // Normaliza a busca para não diferenciar maiúsculas/minúsculas
      const searchTerm = musicName.trim().toLowerCase();

      // Filtra as músicas com base no nome, artista ou letra
      return data.musicas.filter((song: any) =>
        song.nome_da_musica.toLowerCase().includes(searchTerm) ||
        song.nome_do_artista.toLowerCase().includes(searchTerm) ||
        song.letra_da_musica.toLowerCase().includes(searchTerm)
      );
    }

    return []; // Retorna um array vazio caso a resposta da API não seja válida
  } catch (error) {
    console.error("Erro ao buscar detalhes da música:", error);
    return [];
  }
};

const AddMusicScreen = ({ navigation }: any) => {
  const [musicName, setMusicName] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Music",
    });
  }, [navigation]);

  // Função para buscar a música da API
  const searchMusic = async () => {
    if (!musicName) return; // Evita buscar se o campo estiver vazio

    const musicDetails = await fetchMusicDetails(musicName);

    // Se encontrar músicas, atualiza o estado, caso contrário, limpa os resultados
    if (musicDetails.length > 0) {
      setSearchResults(musicDetails);
    } else {
      setSearchResults([]);
    }
  };

  const saveMusic = async (music: any) => {
    const { artist, lyrics, name, id } = music;

    const musicList = await AsyncStorage.getItem("@musicList");
    const updatedMusicList = musicList
      ? [...JSON.parse(musicList), { id, name, artist, lyrics }]
      : [{ id, name, artist, lyrics }];

    await AsyncStorage.setItem("@musicList", JSON.stringify(updatedMusicList));
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Music by Name, Artist, or Lyrics"
        value={musicName}
        onChangeText={setMusicName}
        onSubmitEditing={searchMusic} // Realiza a busca ao pressionar Enter
      />
      <Button title="Search" onPress={searchMusic} />

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{item.nome_da_musica} - {item.nome_do_artista}</Text>
              <Button title="Save Music" onPress={() => saveMusic(item)} />
            </View>
          )}
        />
      )}

      {searchResults.length === 0 && musicName && (
        <Text style={styles.noResultsText}>No results found for "{musicName}".</Text>
      )}
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
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  noResultsText: {
    color: "red",
    marginTop: 20,
  },
});

export default AddMusicScreen;
