import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';

export default function HomeScreen() {
    const [backgroundColor, setBackgroundColor] = useState('#A1CEDC'); // bleu clair par défaut

    useEffect(() => {
        // --- Gestion de la batterie ---
        const getBatteryLevel = async () => {
            const level = await Battery.getBatteryLevelAsync(); // renvoie un float entre 0 et 1
            if (level !== null) {
                console.log('Batterie initiale :', Math.round(level * 100), '%');
                setBackgroundColor(level > 0.5 ? '#A1CEDC' : '#FA8072');
            }
        };
        getBatteryLevel();
        const batterySubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            console.log('Batterie mise à jour :', Math.round(batteryLevel * 100), '%');
            setBackgroundColor(batteryLevel > 0.5 ? '#A1CEDC' : '#FA8072');
        });

        // --- Gestion de la luminosité ---
        const adjustBrightness = async () => {
            const currentBrightness = await Brightness.getBrightnessAsync(); // valeur entre 0 et 1
            console.log('Luminosité actuelle :', currentBrightness);
            if (currentBrightness < 0.6) {
                await Brightness.setBrightnessAsync(0.8);
                console.log('Luminosité augmentée à 0.8 pour meilleure visibilité');
            }
        };
        adjustBrightness();

        return () => batterySubscription.remove();
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
