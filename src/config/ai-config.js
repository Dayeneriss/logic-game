// Configuration for AI integrations

export default {
  openai: {
    // Set your API key through environment variables in production
    apiKey: process.env.OPENAI_API_KEY || '',
    defaultModel: 'gpt-3.5-turbo',
    maxTokens: 150,
    temperature: 0.7,
  },
  
  eliza: {
    enabled: true,
    customPatterns: [
      {
        pattern: /I (.*) stuck/i,
        response: "It's normal to feel stuck sometimes. Let's try to break down the problem."
      },
      {
        pattern: /too (hard|difficult)/i,
        response: "Don't worry, logic puzzles can be challenging. Would you like a hint?"
      }
    ]
  },
  
  // Frequency of AI hints and intervention
  hintFrequency: {
    // After how many failed attempts should AI offer help
    failedAttempts: 3,
    // Maximum hints per level
    maxHintsPerLevel: 5
  }
};
