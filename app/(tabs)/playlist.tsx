// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { buscarPlaylists, adicionarPlaylist } from "../utils/storage";

// const Playlist = () => {
//   const navigation = useNavigation();
//   const [playlists, setPlaylists] = useState<{ id: string; nome: string; musicas: string[] }[]>([]);

//   useEffect(() => {
//     const carregarPlaylists = async () => {
//       const dados = await buscarPlaylists();
//       setPlaylists(dados);
//     };
//     carregarPlaylists();
//   }, []);

//   const criarNovaPlaylist = async () => {
//     const nomePadrao = `Playlist ${playlists.length + 1}`;
//     await adicionarPlaylist(nomePadrao);
//     const novasPlaylists = await buscarPlaylists();
//     setPlaylists(novasPlaylists);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titulo}>🎧 Minhas Playlists</Text>
//       <TouchableOpacity style={styles.botaoCriar} onPress={criarNovaPlaylist}>
//         <Text style={styles.botaoTexto}>+ Criar Nova Playlist</Text>
//       </TouchableOpacity>

//       {playlists.length > 0 ? (
//         <FlatList
//           data={playlists}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.playlistCard}
//               onPress={() => navigation.navigate("Músicas" as any, { playlistId: item.id } as any)}
//               >
//               <Text style={styles.nomePlaylist}>{item.nome}</Text>
//               <Text style={styles.quantidadeMusicas}>
//                 {item.musicas.length} {item.musicas.length === 1 ? "música" : "músicas"}
//               </Text>
//             </TouchableOpacity>
//           )}
//         />
//       ) : (
//         <Text style={styles.semPlaylists}>🎵 Nenhuma playlist criada ainda.</Text>
//       )}
//     </View>
//   );
// };

// export default Playlist;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212",
//     padding: 20,
//   },
//   titulo: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#FFF",
//     marginBottom: 10,
//   },
//   botaoCriar: {
//     backgroundColor: "#1DB954",
//     padding: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   botaoTexto: {
//     color: "#FFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   playlistCard: {
//     padding: 15,
//     backgroundColor: "#333",
//     borderRadius: 10,
//     marginBottom: 10,
//     elevation: 3,
//   },
//   nomePlaylist: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#FFF",
//   },
//   quantidadeMusicas: {
//     fontSize: 14,
//     color: "#AAA",
//     marginTop: 5,
//   },
//   semPlaylists: {
//     textAlign: "center",
//     marginTop: 20,
//     fontSize: 16,
//     color: "#AAA",
//   },
// });
