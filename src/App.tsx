import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, ImageBackground, View, Platform, StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./screens/WelcomeScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar style="light" translucent backgroundColor="transparent" />
            {Platform.OS === 'android' && <RNStatusBar translucent backgroundColor="transparent" />}

            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
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

export default App;
