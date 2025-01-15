import { 
    StyleSheet, View, Text, 
    TouchableOpacity, TextInput, ImageBackground, 
    KeyboardAvoidingView, Platform, 
    Alert
} from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useState } from 'react';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [background, setBackground] = useState('');

    const auth = getAuth();

    const colors = ['#090c08', '#474056', '#8a95a5', '#b9c6ae'];
    const backgroundImage = require('../assets/backgroundImage.png');

    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('ChatScreen', { userID: result.user.uid, name: name, background: background });
                Alert.alert('Signed in successfully!');
            })
            .catch((error) => {
                Alert.alert('Unable to sign in, try again later.');
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.image}>
                <View style={styles.content}>

                    <Text style={styles.header}>Chat App</Text>

                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder='Your Name'
                        />

                        {/* Background Color Selection */}
                        <Text style={styles.colorText}>Choose Background Color:</Text>
                        <View style={styles.colorContainer}>
                            {colors.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorButton,
                                        {backgroundColor: color},
                                        background === color && styles.selectedColor,
                                    ]}
                                    onPress={() => setBackground(color)}
                                >
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Start Button */}
                        <TouchableOpacity
                            accessible={true}
                            accessibilityLabel='Chat Button'
                            accessibilityHint='Navigates to a chat room'
                            accessibilityRole='button'
                            style={styles.button}
                            onPress={signInUser}
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: 'cover'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '6%',
    },
    header: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        margin: 25,
        alignItems: 'flex-start',
        flex: 1,
        paddingTop: '5%',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: 25,
        width: '88%',
        borderRadius: 5,
    },
    textInput: {
        padding: 15,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 40,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        height: 65
    },
    colorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
        marginLeft: 5
    },
    colorButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    selectedColor: {
        borderWidth: 3,
        borderColor: '#757083'
    },
    button: {
        backgroundColor: '#757083',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 65
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default Start;