import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, BackHandler } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';

export default function HomeScreen() {
    const [backgroundColor, setBackgroundColor] = useState('#A1CEDC');
    const [dogImage, setDogImage] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    // --- Batterie & luminosité ---
    useEffect(() => {
        const getBatteryLevel = async () => {
            const level = await Battery.getBatteryLevelAsync();
            if (level !== null) setBackgroundColor(level > 0.5 ? '#A1CEDC' : '#FA8072');
        };
        getBatteryLevel();
        const batterySubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            setBackgroundColor(batteryLevel > 0.5 ? '#A1CEDC' : '#FA8072');
        });

        const adjustBrightness = async () => {
            const currentBrightness = await Brightness.getBrightnessAsync();
            if (currentBrightness < 0.6) await Brightness.setBrightnessAsync(0.8);
        };
        adjustBrightness();

        return () => batterySubscription.remove();
    }, []);

    // --- Fonctions menu ---
    const handleOptionChange = async (value: string) => {
        setSelectedOption(value);

        if (value === 'Chat') {
            setShowChat(true);
            setDogImage(null);
        } else if (value === 'Dog') {
            setShowChat(false);
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                setDogImage(data.message);
            } catch (err) {
                Alert.alert('Erreur', 'Impossible de récupérer l\'image du chien.');
            }
        } else if (value === 'Quit') {
            BackHandler.exitApp();
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.title}>Chat is my best hybrid friend</Text>

            {/* Menu déroulant */}
            <Picker
                selectedValue={selectedOption}
                onValueChange={handleOptionChange}
                style={styles.picker}
            >
                <Picker.Item label="Choisir une option..." value="" />
                <Picker.Item label="Chat" value="Chat" />
                <Picker.Item label="Dog" value="Dog" />
                <Picker.Item label="Quit" value="Quit" />
            </Picker>

            {/* Contenu selon choix */}
            {showChat && (
                <Image
                    source={require('../../assets/images/funny-cat.jpg')}
                    style={styles.image}
                />
            )}
            {dogImage && <Image source={{ uri: dogImage }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    picker: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 12,
        marginTop: 20,
    },
});
