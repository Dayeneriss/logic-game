import { useState } from 'react';
import { LogicEngine } from '../utils/logicEngine';

export const useGameLogic = (level: string) => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(() => {
    const engine = new LogicEngine(level);
    return engine.generateQuestion();
  });

  const submitAnswer = (playerAnswer: any) => {
    const engine = new LogicEngine(level);
    const isCorrect = engine.evaluateAnswer(playerAnswer, question.correctAnswer);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setQuestion(engine.generateQuestion());
    }
    return isCorrect;
  };

  return { question, score, submitAnswer };
};