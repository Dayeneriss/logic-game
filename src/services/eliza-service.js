import ElizaBot from 'elizabot';

class ElizaService {
  constructor() {
    this.eliza = new ElizaBot();
    this.customResponses = {
      'help': [
        'Try thinking about the logical connections between the elements.',
        'Sometimes it helps to eliminate impossible options first.',
        'Look for patterns in the existing clues.'
      ],
      'hint': [
        'Pay attention to the relationships between different elements.',
        'Have you considered all possibilities for this puzzle?',
        'Remember that each element can only appear once in each row and column.'
      ]
    };
  }

  getInitialGreeting() {
    return this.eliza.getInitial();
  }

  getResponse(userInput) {
    // Check if input matches custom keywords
    const lowerInput = userInput.toLowerCase();
    
    for (const [keyword, responses] of Object.entries(this.customResponses)) {
      if (lowerInput.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Fall back to Eliza's default response
    return this.eliza.transform(userInput);
  }
  
  getFinal() {
    return this.eliza.getFinal();
  }
}

export default ElizaService;
