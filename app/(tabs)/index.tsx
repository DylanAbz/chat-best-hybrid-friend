import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    BackHandler,
    Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAudioPlayer } from 'expo-audio';
import * as Battery from 'expo-battery';
import * as Brightness from 'expo-brightness';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ nouveau import

export default function HomeScreen() {
    const [backgroundColor, setBackgroundColor] = useState('#A1CEDC');
    const [dogImage, setDogImage] = useState<string | null>(null);
    const [showChat, setShowChat] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [clicksChat, setClicksChat] = useState(0);
    const [clicksDog, setClicksDog] = useState(0);

    const chatPlayer = useAudioPlayer(require('../../assets/sounds/meow.mp3'));

    // --- Charger les compteurs au lancement ---
    useEffect(() => {
        const loadCounters = async () => {
            const chat = await SecureStore.getItemAsync('clicksChat');
            const dog = await SecureStore.getItemAsync('clicksDog');
            if (chat) setClicksChat(Number(chat));
            if (dog) setClicksDog(Number(dog));
        };
        loadCounters();
    }, []);

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
    const handleChat = async () => {
        setShowChat(true);
        setDogImage(null);
        chatPlayer.seekTo(0);
        chatPlayer.play();

        const newCount = clicksChat + 1;
        setClicksChat(newCount);
        await SecureStore.setItemAsync('clicksChat', String(newCount));
    };

    const handleDog = async () => {
        setShowChat(false);
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            setDogImage(data.message);
        } catch (err) {
            Alert.alert('Erreur', 'Impossible de récupérer l\'image du chien.');
        }

        const newCount = clicksDog + 1;
        setClicksDog(newCount);
        await SecureStore.setItemAsync('clicksDog', String(newCount));
    };

    const handleQuit = () => {
        BackHandler.exitApp();
    };

    const handleResetCounters = async () => {
        setClicksChat(0);
        setClicksDog(0);
        await SecureStore.setItemAsync('clicksChat', '0');
        await SecureStore.setItemAsync('clicksDog', '0');
    };

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        setShowChat(false);
        setDogImage(null);

        if (value === 'Chat') handleChat();
        else if (value === 'Dog') handleDog();
        else if (value === 'Quit') handleQuit();
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={styles.container}>
                <Text style={styles.title}>Chat is my best hybrid friend</Text>

                <Picker
                    selectedValue={selectedOption}
                    onValueChange={handleOptionChange}
                    style={styles.picker}
                >
                    <Picker.Item label="Choisir une option..." value="" />
                    <Picker.Item label="Chat" value="Chat" />
                    <Picker.Item label="Dog" value="Dog" />
                    <Picker.Item label="Clicker" value="Clicker" />
                    <Picker.Item label="Quit" value="Quit" />
                </Picker>

                {/* Section Clicker */}
                {selectedOption === 'Clicker' && (
                    <View style={styles.clickerContainer}>
                        <Text style={styles.counter}>Clicks Chat : {clicksChat}</Text>
                        <Text style={styles.counter}>Clicks Dog : {clicksDog}</Text>
                        <Button title="Réinitialiser les compteurs" onPress={handleResetCounters} />
                    </View>
                )}

                {/* Images d'animaux */}
                {showChat && (
                    <Image
                        source={require('../../assets/images/funny-cat.jpg')}
                        style={styles.image}
                    />
                )}
                {dogImage && <Image source={{ uri: dogImage }} style={styles.image} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
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
    clickerContainer: {
        marginTop: 20,
        alignItems: 'center',
        gap: 10,
    },
    counter: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
});
