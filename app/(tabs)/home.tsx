import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeu de Logique</Text>
      <Button 
        mode="contained" 
        style={styles.button}
        onPress={() => router.push('/(tabs)/game?level=Débutant')}
      >
        Niveau Débutant
      </Button>
      <Button 
        mode="contained" 
        style={styles.button}
        onPress={() => router.push('/(tabs)/game?level=Intermédiaire')}
      >
        Niveau Intermédiaire
      </Button>
      <Button 
        mode="contained" 
        style={styles.button}
        onPress={() => router.push('/(tabs)/game?level=Avancé')}
      >
        Niveau Avancé
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
});