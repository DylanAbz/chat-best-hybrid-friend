import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Battery from 'expo-battery';

export default function HomeScreen() {
  const [backgroundColor, setBackgroundColor] = useState('#A1CEDC'); // bleu clair par défaut

  useEffect(() => {
    const getBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync(); // renvoie un float entre 0 et 1
      if (level !== null) {
        console.log('Batterie initiale :', Math.round(level * 100), '%'); // log du pourcentage
        setBackgroundColor(level > 0.5 ? '#A1CEDC' : '#FA8072');
      }
    };

    getBatteryLevel();

    // Écoute les changements de batterie
    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      console.log('Batterie mise à jour :', Math.round(batteryLevel * 100), '%'); // log à chaque changement
      setBackgroundColor(batteryLevel > 0.5 ? '#A1CEDC' : '#FA8072');
    });

    return () => subscription.remove();
  }, []);

  return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.title}>Chat is my best hybrid friend</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // prend tout l'écran
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
