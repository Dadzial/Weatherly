import { StyleSheet } from 'react-native';

const WelcomeScreenStyle = StyleSheet.create({
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
    cityInput: {
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
        paddingHorizontal: 12,
        marginLeft: 10,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#003366',
        fontWeight: 800,
        fontSize: 12,
    },
    landscapeInput: {
        flex: 1,
        marginRight: 10,
        maxWidth: '50%',
    },
    landscapeButton: {
        paddingHorizontal: 20,
        minWidth: 80,
        width: '25%',
    },
});

export default WelcomeScreenStyle;
