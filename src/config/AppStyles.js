import { StyleSheet } from 'react-native';
import { COLORS } from '../Constants';

export default AppStyles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        flexDirection: 'column',
        gap: 20
    },
    inputMainView: {
        flexDirection: 'column',
        gap: 12
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '700'
    },
    inputView: {
        width: "100%",
        height: 60,
        justifyContent: "center",
        borderColor: 'gray',
        borderWidth: 1,
        padding: 12,
        borderRadius: 12,
        fontSize: 16
    },
    continueBtn: {
        width: "100%",
        backgroundColor: COLORS.DARKBLUE,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    continueText: {
        color: '#FFF',
        fontWeight: '600'
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
});