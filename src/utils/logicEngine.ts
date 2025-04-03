export class LogicEngine {
    constructor(private level: string) {}
  
    private operations = {
      AND: (a: boolean, b: boolean) => a && b,
      OR: (a: boolean, b: boolean) => a || b,
      NOT: (a: boolean) => !a,
      XOR: (a: boolean, b: boolean) => (a || b) && !(a && b),
    };
  
    generateQuestion() {
      switch (this.level) {
        case 'Débutant':
          return this.generateBeginnerQuestion();
        case 'Intermédiaire':
          return this.generateIntermediateQuestion();
        case 'Avancé':
          return this.generateAdvancedQuestion();
        default:
          return this.generateBeginnerQuestion();
      }
    }
  
    private generateBeginnerQuestion() {
      const op = 'AND';
      return {
        question: `Complétez la table de vérité pour A ${op} B`,
        operation: op,
        variables: ['A', 'B'],
        correctAnswer: this.generateTruthTable(op, ['A', 'B']),
      };
    }
  
    private generateIntermediateQuestion() {
      const op = 'XOR';
      return {
        question: `Complétez la table de vérité pour A ${op} B`,
        operation: op,
        variables: ['A', 'B'],
        correctAnswer: this.generateTruthTable(op, ['A', 'B']),
      };
    }
  
    private generateAdvancedQuestion() {
      const op = 'COMPLEX';
      return {
        question: 'Complétez la table de vérité pour (A AND B) OR (NOT C)',
        operation: op,
        variables: ['A', 'B', 'C'],
        correctAnswer: this.generateTruthTable(op, ['A', 'B', 'C']),
      };
    }
  
    private generateTruthTable(operation: string, variables: string[]) {
      const numRows = Math.pow(2, variables.length);
      const table = [];
  
      for (let i = 0; i < numRows; i++) {
        const row: Record<string, boolean> = {};
        variables.forEach((variable, index) => {
          row[variable] = Boolean((i >> index) & 1);
        });
  
        if (operation === 'AND') {
          row.result = this.operations.AND(row[variables[0]], row[variables[1]]);
        } else if (operation === 'OR') {
          row.result = this.operations.OR(row[variables[0]], row[variables[1]]);
        } else if (operation === 'XOR') {
          row.result = this.operations.XOR(row[variables[0]], row[variables[1]]);
        } else if (operation === 'COMPLEX') {
          row.result = this.operations.OR(
            this.operations.AND(row[variables[0]], row[variables[1]]),
            this.operations.NOT(row[variables[2]])
          );
        }
  
        table.push(row);
      }
  
      return table;
    }
  
    evaluateAnswer(playerAnswer: any[], correctAnswer: any[]) {
      return JSON.stringify(playerAnswer) === JSON.stringify(correctAnswer);
    }
  }