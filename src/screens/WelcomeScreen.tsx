import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, ImageBackground, View, Platform, StatusBar as RNStatusBar } from 'react-native';

const WelcomeScreen = () => {
    return (
        <SafeAreaProvider style={styles.container}>
            <ImageBackground
                source={require('../assets/background.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <StatusBar style="light" translucent backgroundColor="transparent" />
                {Platform.OS === 'android' && <RNStatusBar translucent backgroundColor="transparent" />}
            </ImageBackground>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

export default WelcomeScreen;
