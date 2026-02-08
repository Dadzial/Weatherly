import React, { useCallback, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import HomeScreenStyle from '../styles/HomeScreen.style';
import {ImageBackground, Platform, useWindowDimensions, StatusBar as RNStatusBar, View} from "react-native";
import * as SplashScreen from "expo-splash-screen";

const HomeScreen = () => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;
    const insets = useSafeAreaInsets();
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded && !appIsReady) {
            await SplashScreen.hideAsync();
            setAppIsReady(true);
        }
    }, [fontsLoaded, appIsReady]);

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
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        marginBottom: insets.bottom + 20,
                    }}
                >
                </View>
            </ImageBackground>
        </SafeAreaProvider>
    );
}

export default HomeScreen;