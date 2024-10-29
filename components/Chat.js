import { useEffect, useState } from 'react';
import { Bubble, GiftedChat, SystemMessage, Day } from 'react-native-gifted-chat';
import { collection, onSnapshot, orderBy, addDoc, query } from 'firebase/firestore';
import { 
    StyleSheet, View, Text, 
    Platform, KeyboardAvoidingView 
} from 'react-native';

const Chat = ({ route, navigation, db }) => {
    const [messages, setMessages] = useState([]);
    const { name, background, userID } = route.params;

    const onSend = (newMessages) => {
        // setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        addDoc(collection(db, 'messages'), newMessages[0]);
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
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubChat = onSnapshot(q, (chatSnapshot) => {
            let newMessageList = [];
            chatSnapshot.forEach(message => {
                let newMsg = {
                    ...message.data(),
                    createdAt: new Date(message.data().createdAt.toMillis())
                };
                newMessageList.push(newMsg);
            });
            setMessages(newMessageList);
        });

        // Clean up code
        return () => {
            if (unsubChat) unsubChat();
        }
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
                        _id: userID,
                        name: name
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