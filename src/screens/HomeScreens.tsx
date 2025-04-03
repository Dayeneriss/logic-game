import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const levels = ['Débutant', 'Intermédiaire', 'Avancé'];

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Jeu de Logique</Title>
      {levels.map((level) => (
        <Button
          key={level}
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Game', { level })}
        >
          Niveau {level}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;