import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSearchParams } from 'expo-router';
import TruthTable from '../../src/components/TruthTable';
import { LogicEngine } from '../../src/utils/logicEngine';

export default function GameScreen() {
  const { level } = useSearchParams();
  const engine = new LogicEngine(level as string);
  const question = engine.generateQuestion();
  const [feedback, setFeedback] = useState<string[]>([]);

  const handleAnswerSubmit = (playerAnswer: any) => {
    const correctAnswer = question.correctAnswer;
    const isCorrect = engine.evaluateAnswer(playerAnswer, correctAnswer);
    if (isCorrect) {
      setFeedback(['Bonne réponse !']);
    } else {
      setFeedback(['Mauvaise réponse, réessayez.']);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question.question}</Text>
      <TruthTable variables={question.variables} onAnswerChange={handleAnswerSubmit} />
      <View style={styles.feedback}>
        {feedback.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  feedback: {
    marginTop: 20,
  },
});