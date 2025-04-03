// Types pour les questions de logique
export type LogicQuestion = {
  text: string;
  variables: string[];
  expressions: string[];
  data: boolean[][];
  options: string[];
  correctAnswer: number;
};

// Fonction pour générer une table de vérité
export function generateTruthTable(level: string) {
  let variables: string[] = [];
  let expressions: string[] = [];
  let data: boolean[][] = [];

  switch (level) {
    case 'Débutant':
      variables = ['A', 'B'];
      expressions = ['A AND B', 'A OR B', 'NOT A'];
      break;
    case 'Intermédiaire':
      variables = ['A', 'B', 'C'];
      expressions = ['(A AND B) OR C', 'A AND (B OR C)', 'NOT (A AND B)'];
      break;
    case 'Avancé':
      variables = ['A', 'B', 'C', 'D'];
      expressions = ['(A AND B) OR (C AND D)', '(A OR B) AND (C OR D)', 'NOT (A OR B) OR (C AND D)'];
      break;
    default:
      variables = ['A', 'B'];
      expressions = ['A AND B', 'A OR B'];
  }

  // Générer toutes les combinaisons possibles de valeurs pour les variables
  const numRows = Math.pow(2, variables.length);
  for (let i = 0; i < numRows; i++) {
    const row: boolean[] = [];
    
    // Valeurs des variables
    for (let j = 0; j < variables.length; j++) {
      const value = (i & (1 << (variables.length - j - 1))) !== 0;
      row.push(value);
    }
    
    // Évaluer les expressions
    if (level === 'Débutant') {
      // A AND B
      row.push(row[0] && row[1]);
      // A OR B
      row.push(row[0] || row[1]);
      // NOT A
      row.push(!row[0]);
    } else if (level === 'Intermédiaire') {
      const A = row[0], B = row[1], C = row[2];
      // (A AND B) OR C
      row.push((A && B) || C);
      // A AND (B OR C)
      row.push(A && (B || C));
      // NOT (A AND B)
      row.push(!(A && B));
    } else if (level === 'Avancé') {
      const A = row[0], B = row[1], C = row[2], D = row[3];
      // (A AND B) OR (C AND D)
      row.push((A && B) || (C && D));
      // (A OR B) AND (C OR D)
      row.push((A || B) && (C || D));
      // NOT (A OR B) OR (C AND D)
      row.push(!(A || B) || (C && D));
    }
    
    data.push(row);
  }

  return { variables, expressions, data };
}

// Fonction pour générer une question de logique
export function generateLogicQuestion(level: string): LogicQuestion {
  const { variables, expressions, data } = generateTruthTable(level);
  
  // Générer une question en fonction du niveau
  let text = '';
  let options: string[] = [];
  let correctAnswer = 0;
  
  switch (level) {
    case 'Débutant':
      text = 'Quelle expression est équivalente à "A AND B" ?';
      options = [
        'NOT (NOT A OR NOT B)',
        'NOT A OR NOT B',
        'A OR B',
        'NOT A AND NOT B'
      ];
      correctAnswer = 0; // NOT (NOT A OR NOT B) est équivalent à A AND B
      break;
    case 'Intermédiaire':
      text = 'Quelle expression est équivalente à "NOT (A AND B)" ?';
      options = [
        'NOT A AND NOT B',
        'NOT A OR NOT B',
        'A OR B',
        'NOT A AND B'
      ];
      correctAnswer = 1; // NOT A OR NOT B est équivalent à NOT (A AND B)
      break;
    case 'Avancé':
      text = 'Quelle loi est illustrée par l\'équivalence entre "(A AND B) OR (A AND C)" et "A AND (B OR C)" ?';
      options = [
        'Loi de Morgan',
        'Loi de distributivité',
        'Loi de commutativité',
        'Loi d\'associativité'
      ];
      correctAnswer = 1; // Loi de distributivité
      break;
    default:
      text = 'Quelle est la valeur de "A AND B" quand A est vrai et B est faux ?';
      options = ['Vrai', 'Faux'];
      correctAnswer = 1; // Faux
  }
  
  return { text, variables, expressions, data, options, correctAnswer };
}