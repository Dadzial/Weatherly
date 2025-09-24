import React, { useCallback, useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    Text,
    ImageBackground,
    View,
    TextInput,
    Platform,
    StatusBar as RNStatusBar,
    useWindowDimensions,
    Keyboard,
    Animated,
    Pressable
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import WelcomeScreenStyles from './WelcomeScreen.styles';

SplashScreen.preventAutoHideAsync();

const WelcomeScreen = () => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    const insets = useSafeAreaInsets();
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular });

    const translateY = useRef(new Animated.Value(0)).current;
    const bottomRef = useRef(null);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded && !appIsReady) {
            await SplashScreen.hideAsync();
            setAppIsReady(true);
        }
    }, [fontsLoaded, appIsReady]);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            const input = TextInput.State.currentlyFocusedInput();
            if (!input) return;

            input.measure((x, y, widthInput, heightInput, pageX, pageY) => {
                const inputBottom = pageY + heightInput;
                const keyboardTop = e.endCoordinates.screenY;

                let moveDistance = inputBottom - keyboardTop;
                if (Platform.OS === 'android') {
                    const extraOffset = 20; // odstęp nad klawiaturą
                    moveDistance += extraOffset;
                    moveDistance = Math.max(moveDistance, 0);
                }

                Animated.timing(translateY, {
                    toValue: -moveDistance,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            });
        });

        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, [translateY]);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaProvider>
            <ImageBackground
                source={
                    isPortrait
                        ? require('../assets/background_portrait.png')
                        : require('../assets/background_landscape.png')
                }
                style={{ flex: 1, width: width, height: height }}
                onLayout={onLayoutRootView}
            >
                <StatusBar style="light" translucent backgroundColor="transparent" />
                {Platform.OS === 'android' && (
                    <RNStatusBar translucent backgroundColor="transparent" />
                )}

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        paddingTop: insets.top,
                        paddingBottom: 20
                    }}
                >
                    <View style={WelcomeScreenStyles.titleContainer}>
                        <Text style={WelcomeScreenStyles.title}>Weatherly</Text>
                    </View>

                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            marginBottom: insets.bottom + 20,
                            transform: [{ translateY }]
                        }}
                        ref={bottomRef}
                    >
                        <TextInput
                            placeholder="Enter city name"
                            placeholderTextColor="#003366"
                            style={[WelcomeScreenStyles.cityInput, { flex: 1 }]}
                        />
                        <Pressable
                            onPress={() => console.log('Search pressed')}
                            style={({ pressed }) => [
                                WelcomeScreenStyles.searchButton,
                                { backgroundColor: pressed ? '#003366' : '#F7C77E' }
                            ]}
                        >
                            {({ pressed }) => (
                                <Text style={[WelcomeScreenStyles.searchButtonText, { color: pressed ? '#F7C77E' : '#003366' }]}>
                                    Search
                                </Text>
                            )}
                        </Pressable>
                    </Animated.View>
                </View>
            </ImageBackground>
        </SafeAreaProvider>
    );
};

export default WelcomeScreen;
