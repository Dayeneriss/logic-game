export const levels = {
    beginner: {
      name: 'Débutant',
      description: 'Apprenez les opérateurs logiques de base : AND, OR, NOT',
      variables: ['A', 'B'],
      operators: ['AND', 'OR', 'NOT'],
      maxExpressionLength: 3,
    },
    intermediate: {
      name: 'Intermédiaire',
      description: 'Explorez des expressions plus complexes avec des parenthèses',
      variables: ['A', 'B', 'C'],
      operators: ['AND', 'OR', 'NOT', 'XOR'],
      maxExpressionLength: 5,
    },
    advanced: {
      name: 'Avancé',
      description: 'Maîtrisez les lois et théorèmes de la logique booléenne',
      variables: ['A', 'B', 'C', 'D'],
      operators: ['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR', 'IMPLIES'],
      maxExpressionLength: 7,
    },
  };
  
  export const logicLaws = [
    {
      name: 'Loi de commutativité',
      description: 'L\'ordre des opérandes n\'affecte pas le résultat',
      examples: [
        'A AND B = B AND A',
        'A OR B = B OR A',
      ],
    },
    {
      name: 'Loi d\'associativité',
      description: 'Le regroupement des opérandes n\'affecte pas le résultat',
      examples: [
        '(A AND B) AND C = A AND (B AND C)',
        '(A OR B) OR C = A OR (B OR C)',
      ],
    },
    {
      name: 'Loi de distributivité',
      description: 'Une opération peut être distribuée sur une autre',
      examples: [
        'A AND (B OR C) = (A AND B) OR (A AND C)',
        'A OR (B AND C) = (A OR B) AND (A OR C)',
      ],
    },
    {
      name: 'Lois de De Morgan',
      description: 'Relation entre négation, conjonction et disjonction',
      examples: [
        'NOT (A AND B) = NOT A OR NOT B',
        'NOT (A OR B) = NOT A AND NOT B',
      ],
    },
  ];
