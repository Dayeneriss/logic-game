import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TruthTableProps = {
  variables: string[];
  expressions: string[];
  data: boolean[][];
};

export default function TruthTable({ variables, expressions, data }: TruthTableProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {variables.map((variable, index) => (
          <Text key={`var-${index}`} style={styles.headerCell}>{variable}</Text>
        ))}
        {expressions.map((expression, index) => (
          <Text key={`expr-${index}`} style={styles.headerCell}>{expression}</Text>
        ))}
      </View>
      
      {data.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((value, colIndex) => (
            <Text key={`cell-${rowIndex}-${colIndex}`} style={styles.cell}>
              {value ? 'V' : 'F'}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
});