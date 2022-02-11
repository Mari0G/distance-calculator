import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import defaultStyles from './js/defaultStyles';
import DistanceCalculator from './js/screens/DistanceCalculator';

export default function App() {
  return (
    <View style={styles.container}>
      <DistanceCalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
