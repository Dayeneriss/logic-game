import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
//import StatsChart from '../../components/stats/StatsChart';

export default function StatsScreen() {
  // Ces données seraient normalement chargées depuis un stockage local ou une API
  const stats = {
    totalQuestions: 42,
    correctAnswers: 35,
    incorrectAnswers: 7,
    accuracy: 83,
    levelStats: {
      'Débutant': { total: 20, correct: 18 },
      'Intermédiaire': { total: 15, correct: 12 },
      'Avancé': { total: 7, correct: 5 }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vos statistiques</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Résumé</Text>
          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Questions totales :</Text>
            <Text style={styles.statValue}>{stats.totalQuestions}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Réponses correctes :</Text>
            <Text style={styles.statValue}>{stats.correctAnswers}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statLabel}>Précision :</Text>
            <Text style={styles.statValue}>{stats.accuracy}%</Text>
          </View>
        </Card.Content>
      </Card>
      
      <StatsChart stats={stats} />
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Par niveau</Text>
          {Object.entries(stats.levelStats).map(([level, data]) => (
            <View key={level} style={styles.statsRow}>
              <Text style={styles.statLabel}>{level} :</Text>
              <Text style={styles.statValue}>
                {data.correct}/{data.total} ({Math.round((data.correct / data.total) * 100)}%)
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});