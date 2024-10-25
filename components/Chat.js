import { useEffect, useState } from 'react';
import { Bubble, GiftedChat, SystemMessage, Day } from 'react-native-gifted-chat';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';

const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { name, background } = route.params;

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: background === '#090c08' ? '#8a95a5' : '#000',
                        color: '#000',
                    },
                    left: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        );
    }

    const renderSystemMessage = (props) => {
        return (
            <SystemMessage
                {...props}
                textStyle={{
                    color: background === '#b9c6ae' ? '#000' : '#fff'
                }}
            />
        );
    }

    const renderDay = (props) => {
        return <Day {...props} textStyle={{ color: background === '#b9c6ae' ? '#000' : '#fff' }} />
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any'
                },
            },
            {
                _id: 3,
                text: 'You have entered the chat',
                createdAt: new Date(),
                system: true,
                // Any additional custom parameters are passed through
            },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[
            styles.container, 
            { backgroundColor: background }
        ]}>
                <GiftedChat
                    messages={messages}
                    renderBubble={renderBubble}
                    renderDay={renderDay}
                    renderSystemMessage={renderSystemMessage}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
                { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior='padding' /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;