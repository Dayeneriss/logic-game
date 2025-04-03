import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateLogicQuestion, LogicQuestion } from '../utils/logicEngine';

type GameStats = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  levelStats: {
    [key: string]: { total: number; correct: number };
  };
};

export default function useLogicGame(level: string) {
  const [question, setQuestion] = useState<LogicQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<GameStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    levelStats: {
      'Débutant': { total: 0, correct: 0 },
      'Intermédiaire': { total: 0, correct: 0 },
      'Avancé': { total: 0, correct: 0 },
    },
  });

  // Charger les statistiques au démarrage
  useEffect(() => {
    loadStats();
    generateNewQuestion();
  }, [level]);

  // Charger les statistiques depuis le stockage local
  const loadStats = async () => {
    try {
      const storedStats = await AsyncStorage.getItem('gameStats');
      if (storedStats) {
        setStats(JSON.parse(storedStats));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  // Sauvegarder les statistiques dans le stockage local
  const saveStats = async (newStats: GameStats) => {
    try {
      await AsyncStorage.setItem('gameStats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des statistiques:', error);
    }
  };

  // Générer une nouvelle question
  const generateNewQuestion = () => {
    setLoading(true);
    const newQuestion = generateLogicQuestion(level);
    setQuestion(newQuestion);
    setLoading(false);
  };

  // Vérifier la réponse et mettre à jour les statistiques
  const checkAnswer = (selectedAnswer: number) => {
    if (!question) return false;

    const isCorrect = selectedAnswer === question.correctAnswer;
    
    // Mettre à jour les statistiques
    const newStats = { ...stats };
    newStats.totalQuestions += 1;
    
    if (isCorrect) {
      newStats.correctAnswers += 1;
    } else {
      newStats.incorrectAnswers += 1;
    }
    
    // Mettre à jour les statistiques par niveau
    if (!newStats.levelStats[level]) {
      newStats.levelStats[level] = { total: 0, correct: 0 };
    }
    
    newStats.levelStats[level].total += 1;
    if (isCorrect) {
      newStats.levelStats[level].correct += 1;
    }
    
    setStats(newStats);
    saveStats(newStats);
    
    return isCorrect;
  };

  return {
    question,
    loading,
    stats,
    generateNewQuestion,
    checkAnswer,
  };
}