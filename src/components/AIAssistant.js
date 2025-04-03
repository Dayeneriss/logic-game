import React, { useState, useEffect } from 'react';
import OpenAIService from '../services/openai-service';
import ElizaService from '../services/eliza-service';
import aiConfig from '../config/ai-config';

const AIAssistant = ({ gameState, onAIResponse }) => {
  const [message, setMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [openai] = useState(new OpenAIService(aiConfig.openai.apiKey));
  const [eliza] = useState(new ElizaService());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Display initial greeting
    setMessage(eliza.getInitialGreeting());
  }, []);

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    
    try {
      // First, try getting a response from Eliza
      const elizaResponse = eliza.getResponse(userInput);
      
      // For specific game-related queries, get enhanced response from OpenAI
      if (userInput.toLowerCase().includes('hint') || 
          userInput.toLowerCase().includes('help') ||
          userInput.toLowerCase().includes('stuck')) {
        const openAIResponse = await openai.analyzeGameState(gameState);
        setMessage(openAIResponse);
        onAIResponse(openAIResponse);
      } else {
        setMessage(elizaResponse);
        onAIResponse(elizaResponse);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessage("I'm having trouble connecting to my brain right now. Please try again later.");
    } finally {
      setIsLoading(false);
      setUserInput('');
    }
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-message-display">
        {message}
      </div>
      <form onSubmit={handleUserInput} className="ai-input-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask for help or hints..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
