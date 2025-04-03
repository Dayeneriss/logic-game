import axios from 'axios';

class OpenAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async generateResponse(prompt, model = 'gpt-3.5-turbo', maxTokens = 150) {
    try {
      const response = await this.client.post('/chat/completions', {
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens
      });
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }

  async analyzeGameState(gameState) {
    const prompt = `Analyze this game state and provide a helpful hint: ${JSON.stringify(gameState)}`;
    return this.generateResponse(prompt, 'gpt-3.5-turbo', 200);
  }
}

export default OpenAIService;
