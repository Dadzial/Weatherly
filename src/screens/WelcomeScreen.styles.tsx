import { StyleSheet } from 'react-native';

const WelcomeScreenStyles = StyleSheet.create({
    background: {
        resizeMode: 'cover',

    },
    titleContainer: {
        justifyContent: 'space-between',
        marginTop: 120,
        alignItems: 'center',
    },
    title: {
        fontSize: 50,
        fontFamily: 'Inter_700Bold',
        color: '#F7C77E',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    cityInputContainer: {
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
    },
    cityInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#F7C77E',
        color: '#003366',
        textAlign: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        fontFamily: 'Inter_400Regular',
    },
    searchButton: {
        backgroundColor: '#F7C77E',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginLeft: 10,
        height:50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#003366',
        fontWeight: 'bold',
    }
});

export default WelcomeScreenStyles;
