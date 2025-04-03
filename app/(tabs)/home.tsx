import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeu de Logique</Text>
      <Text style={styles.subtitle}>
        Apprenez et testez vos connaissances en logique booléenne avec des tables de vérité interactives.
      </Text>
      
      <View style={styles.buttonContainer}>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginVertical: 10,
  },
});