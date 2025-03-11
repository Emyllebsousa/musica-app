// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }: any) => {
  const [musicList, setMusicList] = useState<string[]>([]);

  useEffect(() => {
    const loadMusicList = async () => {
      try {
        const savedMusicList = await AsyncStorage.getItem("@musicList");
        if (savedMusicList) {
          setMusicList(JSON.parse(savedMusicList));
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadMusicList();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎶 My Music List</Text>
      <FlatList
        data={musicList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.musicItem}>{item}</Text>}
      />
      <Button title="Add Music" onPress={() => navigation.navigate("AddMusic")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  musicItem: {
    fontSize: 18,
    color: "#333",
    marginVertical: 10,
  },
});

export default HomeScreen;
