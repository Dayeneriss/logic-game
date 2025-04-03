import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable, Switch } from 'react-native-paper';

const TruthTable = ({ variables, onAnswerChange }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const generateRows = () => {
      const rows = [];
      const numRows = Math.pow(2, variables.length);

      for (let i = 0; i < numRows; i++) {
        const row = {};
        for (let j = 0; j < variables.length; j++) {
          row[variables[j]] = Boolean((i >> j) & 1);
        }
        row.result = false; // Initialise le résultat à faux
        rows.push(row);
      }
      return rows;
    };

    setTableData(generateRows());
  }, [variables]);

  const handleValueChange = (index, value) => {
    const newData = [...tableData];
    newData[index].result = value;
    setTableData(newData);
    onAnswerChange(newData);
  };

  return (
    <DataTable>
      <DataTable.Header>
        {variables.map((variable) => (
          <DataTable.Title key={variable}>{variable}</DataTable.Title>
        ))}
        <DataTable.Title>Résultat</DataTable.Title>
      </DataTable.Header>

      {tableData.map((row, index) => (
        <DataTable.Row key={index}>
          {variables.map((variable) => (
            <DataTable.Cell key={variable}>
              {row[variable] ? '1' : '0'}
            </DataTable.Cell>
          ))}
          <DataTable.Cell>
            <Switch value={row.result} onValueChange={(value) => handleValueChange(index, value)} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TruthTable;
