import React, { useCallback, useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, ImageBackground, View, TextInput, Platform, useWindowDimensions, Keyboard, Animated, Pressable } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import WelcomeScreenStyle from '../styles/WelcomeScreen.style';

SplashScreen.preventAutoHideAsync();

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    const insets = useSafeAreaInsets();
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular });
    const translateY = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    const animateButtonIn = () => {
        Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true, speed: 20 }).start();
    };

    const animateButtonOut = () => {
        Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 15 }).start();
    };

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
                    moveDistance = Math.max(moveDistance + 20, 0);
                }

                Animated.timing(translateY, { toValue: -moveDistance, duration: 250, useNativeDriver: true }).start();
            });
        });

        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }).start();
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
                source={isPortrait
                    ? require('../assets/background_portrait.png')
                    : require('../assets/background_landscape.png')}
                style={{ flex: 1, width, height }}
                onLayout={onLayoutRootView}
            >
                <StatusBar style="light" translucent backgroundColor="transparent" />
                {Platform.OS === 'android' && <StatusBar translucent backgroundColor="transparent" />}

                <View style={{ flex: 1, justifyContent: 'space-between', paddingTop: insets.top, paddingBottom: 20 }}>
                    <View style={WelcomeScreenStyle.titleContainer}>
                        <Text style={WelcomeScreenStyle.title}>Weatherly</Text>
                    </View>

                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            marginBottom: insets.bottom + 20,
                            transform: [{ translateY }],
                        }}
                    >
                        <TextInput
                            placeholder="Enter city name"
                            placeholderTextColor="#003366"
                            style={[WelcomeScreenStyle.cityInput, isPortrait ? { flex: 1 } : WelcomeScreenStyle.landscapeInput]}
                        />

                        <Animated.View style={{ transform: [{ scale: buttonScale }], ...(Platform.OS === 'ios' ? { zIndex: 10 } : {}) }}>
                            <Pressable
                                onPressIn={animateButtonIn}
                                onPressOut={animateButtonOut}
                                onPress={() => navigation.navigate('Home' as never)}
                                style={[WelcomeScreenStyle.searchButton, !isPortrait && WelcomeScreenStyle.landscapeButton]}
                            >
                                <Text style={WelcomeScreenStyle.searchButtonText}>Search</Text>
                            </Pressable>
                        </Animated.View>
                    </Animated.View>
                </View>
            </ImageBackground>
        </SafeAreaProvider>
    );
};

export default WelcomeScreen;
