// src/screens/AddMusicScreen.tsx
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddMusicScreen = ({ navigation }: any) => {
  const [musicName, setMusicName] = useState("");

  const saveMusic = async () => {
    if (!musicName) return; // Não salvar se o nome estiver vazio
    const musicList = await AsyncStorage.getItem("@musicList");
    const updatedMusicList = musicList ? [...JSON.parse(musicList), musicName] : [musicName];
    await AsyncStorage.setItem("@musicList", JSON.stringify(updatedMusicList));
    navigation.goBack(); // Volta para a tela inicial
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Music Name"
        value={musicName}
        onChangeText={setMusicName}
      />
      <Button title="Save Music" onPress={saveMusic} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddMusicScreen;
