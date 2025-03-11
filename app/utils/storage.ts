import AsyncStorage from "@react-native-async-storage/async-storage";

const PLAYLISTS_KEY = "playlists";

// 🔹 Buscar todas as playlists
export const buscarPlaylists = async (): Promise<{ id: string; nome: string; musicas: string[] }[]> => {
  try {
    const playlists = await AsyncStorage.getItem(PLAYLISTS_KEY);
    return playlists ? JSON.parse(playlists) : [];
  } catch (error) {
    console.error("Erro ao buscar playlists:", error);
    return [];
  }
};

// 🔹 Editar o nome da playlist (VERSÃO CORRETA - NÃO DUPLICAR)
export const editarNomePlaylist = async (id: string, novoNome: string) => {
  try {
    const playlists = await buscarPlaylists();
    const playlistsAtualizadas = playlists.map(playlist =>
      playlist.id === id ? { ...playlist, nome: novoNome } : playlist
    );
    await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlistsAtualizadas));
  } catch (error) {
    console.error("Erro ao editar nome da playlist:", error);
  }
};

// 🔹 Criar uma nova playlist
export const adicionarPlaylist = async (nome: string) => {
  try {
    const playlists = await buscarPlaylists();
    const novaPlaylist = { id: Date.now().toString(), nome, musicas: [] };
    playlists.push(novaPlaylist);
    await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
  } catch (error) {
    console.error("Erro ao adicionar playlist:", error);
  }
};

// 🔹 Adicionar uma música dentro de uma playlist
export const adicionarMusicaNaPlaylist = async (playlistId: string, musica: string) => {
  try {
    const playlists = await buscarPlaylists();
    const playlistsAtualizadas = playlists.map(playlist =>
      playlist.id === playlistId && !playlist.musicas.includes(musica)
        ? { ...playlist, musicas: [...playlist.musicas, musica] }
        : playlist
    );
    await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlistsAtualizadas));
  } catch (error) {
    console.error("Erro ao adicionar música à playlist:", error);
  }
};

// 🔹 Remover uma playlist
export const removerPlaylist = async (id: string) => {
  try {
    const playlists = await buscarPlaylists();
    const playlistsFiltradas = playlists.filter(playlist => playlist.id !== id);
    await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlistsFiltradas));
  } catch (error) {
    console.error("Erro ao remover playlist:", error);
  }
};

// 🔹 Remover uma música de uma playlist
export const removerMusicaDaPlaylist = async (playlistId: string, musica: string) => {
  try {
    const playlists = await buscarPlaylists();
    const playlistsAtualizadas = playlists.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, musicas: playlist.musicas.filter(m => m !== musica) }
        : playlist
    );
    await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlistsAtualizadas));
  } catch (error) {
    console.error("Erro ao remover música da playlist:", error);
  }
};