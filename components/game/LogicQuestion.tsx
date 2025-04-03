import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import TruthTable from './TruthTable';

type LogicQuestionProps = {
  question: {
    text: string;
    variables: string[];
    expressions: string[];
    data: boolean[][];
    options: string[];
    correctAnswer: number;
  };
  onComplete: () => void;
};

export default function LogicQuestion({ question, onComplete }: LogicQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
    
    // Vous pourriez enregistrer le résultat ici pour les statistiques
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    onComplete();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      
      <TruthTable 
        variables={question.variables}
        expressions={question.expressions}
        data={question.data}
      />
      
      <View style={styles.optionsContainer}>
        <RadioButton.Group
          onValueChange={(value) => !isAnswered && setSelectedAnswer(Number(value))}
          value={selectedAnswer !== null ? selectedAnswer.toString() : ''}
        >
          {question.options.map((option, index) => (
            <RadioButton.Item
              key={index}
              label={option}
              value={index.toString()}
              disabled={isAnswered}
              style={[
                styles.option,
                isAnswered && index === question.correctAnswer && styles.correctOption,
                isAnswered && selectedAnswer === index && selectedAnswer !== question.correctAnswer && styles.incorrectOption
              ]}
            />
          ))}
        </RadioButton.Group>
      </View>
      
      {!isAnswered ? (
        <Button 
          mode="contained"
          onPress={handleSubmit}
          disabled={selectedAnswer === null}
          style={styles.button}
        >
          Vérifier
        </Button>
      ) : (
        <View>
          <Text style={[styles.resultText, isCorrect ? styles.correctText : styles.incorrectText]}>
            {isCorrect ? 'Correct !' : 'Incorrect !'}
          </Text>
          <Button 
            mode="contained"
            onPress={handleNext}
            style={styles.button}
          >
            Question suivante
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    marginTop: 15,
  },
  option: {
    marginVertical: 5,
    borderRadius: 5,
  },
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  button: {
    marginTop: 15,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  correctText: {
    color: 'green',
  },
  incorrectText: {
    color: 'red',
  },
});