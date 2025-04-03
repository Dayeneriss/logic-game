import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSearchParams } from 'expo-router';
import { Button } from 'react-native-paper';
import TruthTable from '../../components/game/TruthTable';
import LogicQuestion from '../../components/game/LogicQuestion';
import { generateLogicQuestion } from '../../utils/logicEngine';

export default function GameScreen() {
  const { level } = useSearchParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Générer une question en fonction du niveau
    const newQuestion = generateLogicQuestion(level as string);
    setQuestion(newQuestion);
    setLoading(false);
  }, [level]);

  const handleNextQuestion = () => {
    setLoading(true);
    const newQuestion = generateLogicQuestion(level as string);
    setQuestion(newQuestion);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Niveau : {level}</Text>
      
      {question && (
        <LogicQuestion 
          question={question}
          onComplete={handleNextQuestion}
        />
      )}
      
      <Button 
        mode="outlined" 
        style={styles.button}
        onPress={handleNextQuestion}
      >
        Question suivante
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});