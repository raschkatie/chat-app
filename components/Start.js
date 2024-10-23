import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/backgroundImage.png')} style={styles.image}>
                <View style={styles.content}>

                    <Text style={styles.header}>App Title</Text>

                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder='Your Name'
                        />

                        {/* Start Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('ChatScreen', { name: name })}
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '6%'
    },
    header: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
        margin: 25,
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        padding: 25,
        width: '88%',
        height: '44%',
        borderRadius: 5,
    },
    textInput: {
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        height: '20%'
    },
    colorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100
    },
    button: {
        backgroundColor: '#757083',
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    }
});

export default Start;