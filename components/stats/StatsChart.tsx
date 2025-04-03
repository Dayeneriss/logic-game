import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';

type StatsChartProps = {
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    accuracy: number;
    levelStats: {
      [key: string]: { total: number; correct: number };
    };
  };
};

export default function StatsChart({ stats }: StatsChartProps) {
  const screenWidth = Dimensions.get('window').width - 40;
  
  const chartData = {
    labels: Object.keys(stats.levelStats),
    datasets: [
      {
        data: Object.values(stats.levelStats).map(
          (levelStat) => Math.round((levelStat.correct / levelStat.total) * 100)
        ),
      },
    ],
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Performance par niveau</Text>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});