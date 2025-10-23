import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function CarteScreen() {
    const toulon = { latitude: 43.1242, longitude: 5.928 };
    const paris = { latitude: 48.8566, longitude: 2.3522 };

    // Calcul du centre et du delta pour voir les deux villes
    const latitudeDelta = Math.abs(toulon.latitude - paris.latitude) + 5; // +5 pour laisser un peu de marge
    const longitudeDelta = Math.abs(toulon.longitude - paris.longitude) + 5;

    const region = {
        latitude: (toulon.latitude + paris.latitude) / 2,
        longitude: (toulon.longitude + paris.longitude) / 2,
        latitudeDelta,
        longitudeDelta,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE} // ← ici
                initialRegion={region}
            >
                <Marker coordinate={toulon} title="Toulon" />
                <Marker coordinate={paris} title="Paris" />
            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
