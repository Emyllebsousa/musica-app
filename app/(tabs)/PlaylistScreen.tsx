import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, FlatList, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para carregar as músicas salvas
const loadMusicList = async () => {
  const savedMusic = await AsyncStorage.getItem("@musicList");
  return savedMusic ? JSON.parse(savedMusic) : [];
};

// Função para excluir música
const deleteMusic = async (id: number) => {
  const musicList = await loadMusicList();
  const updatedList = musicList.filter((music: any) => music.id !== id);
  await AsyncStorage.setItem("@musicList", JSON.stringify(updatedList));
};

const PlaylistScreen = ({ navigation }: any) => {
  const [musicList, setMusicList] = useState<any[]>([]);

  useEffect(() => {
    const fetchMusic = async () => {
      const savedMusic = await loadMusicList();
      setMusicList(savedMusic);
    };
    fetchMusic();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir Música", "Tem certeza que deseja excluir esta música?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await deleteMusic(id);
          setMusicList(await loadMusicList());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Playlist</Text>

      <FlatList
        data={musicList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.musicItem}>
            <Text style={styles.musicText}>
              {item.name} - {item.artist}
            </Text>
            <View style={styles.buttonsContainer}>
              <Button title="Ver Detalhes" onPress={() => navigation.navigate("MusicDetails", { music: item })} />
              <Button title="Excluir" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  musicItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  musicText: {
    fontSize: 16,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default PlaylistScreen;
