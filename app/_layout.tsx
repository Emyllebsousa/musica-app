import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/app/(tabs)/HomeScreen';
import AddMusicScreen from '@/app/(tabs)/AddMusicScreen';

// Não inclua o NavigationContainer aqui
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddMusic" component={AddMusicScreen} />
    </Stack.Navigator>
  );
}