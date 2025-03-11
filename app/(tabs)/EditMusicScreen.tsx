// src/screens/EditMusicScreen.tsx
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditMusicScreen = ({ route, navigation }: any) => {
  const { index, musicName } = route.params;
  const [newMusicName, setNewMusicName] = useState(musicName);

  useEffect(() => {
    setNewMusicName(musicName);
  }, [musicName]);

  const saveEditMusic = async () => {
    const musicList = await AsyncStorage.getItem("@musicList");
    const updatedMusicList = JSON.parse(musicList || "[]");
    updatedMusicList[index] = newMusicName; // Atualiza a música no índice
    await AsyncStorage.setItem("@musicList", JSON.stringify(updatedMusicList));
    navigation.goBack(); // Volta para a tela anterior
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Edit Music Name"
        value={newMusicName}
        onChangeText={setNewMusicName}
      />
      <Button title="Save Edit" onPress={saveEditMusic} />
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

export default EditMusicScreen;
