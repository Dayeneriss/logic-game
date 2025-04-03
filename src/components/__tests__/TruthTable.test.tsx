import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TruthTable from '../TruthTable';

describe('TruthTable Component', () => {
  it('renders the correct number of rows based on variables', () => {
    const variables = ['A', 'B'];
    const { getAllByText } = render(<TruthTable variables={variables} onAnswerChange={() => {}} />);
    const rows = getAllByText(/0|1/); // Vérifie les valeurs binaires
    expect(rows.length).toBe(4); // 2^2 = 4 lignes
  });

  it('calls onAnswerChange when a switch is toggled', () => {
    const variables = ['A', 'B'];
    const mockOnAnswerChange = jest.fn();
    const { getAllByRole } = render(<TruthTable variables={variables} onAnswerChange={mockOnAnswerChange} />);
    const switches = getAllByRole('switch');
    fireEvent(switches[0], 'valueChange', true);
    expect(mockOnAnswerChange).toHaveBeenCalled();
  });
});