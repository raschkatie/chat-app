import { useEffect, useState } from 'react';
import { Bubble, GiftedChat, SystemMessage, Day, InputToolbar } from 'react-native-gifted-chat';
import { collection, onSnapshot, orderBy, addDoc, query } from 'firebase/firestore';
import { 
    StyleSheet, View, Text, 
    Platform, KeyboardAvoidingView 
} from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';

const Chat = ({ isConnected, route, navigation, db }) => {
    const [messages, setMessages] = useState([]);
    const { name, background, userID } = route.params;

    const onSend = (newMessages) => {

        // REMOVE WHEN DONE
        console.log('TWO: New Message being added to Firestore: ', newMessages[0]);

        addDoc(collection(db, 'messages'), newMessages[0])

            // REMOVE WHEN DONE
            .then(() => console.log('Message successfully added to Firestore'))
            .catch((error) => console.error('ERROR adding message to Firestore: ', error));
    }

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

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    const renderCustomActions = (props) => {
        return <CustomActions onSend={onSend} {...props} />;
    }

    const renderCustomView = (props) => {
        const { currentMessage } = props;

        // REMOVE WHEN DONE
        console.log('CustomView currentMessage: ', currentMessage);
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
            )
        }
        return null;
    }

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    let unsubMessages;

    useEffect(() => {

        // REMOVE WHEN DONE
        console.log('useEffect triggered. isConnected: ', isConnected);

        navigation.setOptions({ title: name });

        if (isConnected === true) {

            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (doc) => {
                let newMessageList = [];
                doc.forEach(message => {
                    let newMsg = {
                        id: message.id,
                        ...message.data(),
                        createdAt: new Date(message.data().createdAt.toMillis())
                    };
                    newMessageList.push(newMsg);
                });

                // REMOVE WHEN DONE
                console.log('THREE: Messages retrieved from Firestore: ', newMessageList);

                cacheMessages(newMessageList);
                setMessages(newMessageList);

                // REMOVE WHEN DONE
                console.log('Messages state updated.');
            });
        } else loadCachedMessages();

        // Clean up code / unmounting actions
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    return (
        <View style={[
            styles.container, 
            { backgroundColor: background }
        ]}>
                <GiftedChat
                    messages={messages}
                    renderInputToolbar={renderInputToolbar}
                    renderBubble={renderBubble}
                    renderDay={renderDay}
                    renderSystemMessage={renderSystemMessage}
                    renderActions={renderCustomActions}
                    renderCustomView={renderCustomView}
                    onSend={(messages) => {

                        // REMOVE WHEN DONE
                        console.log('FOUR: Messages array passed to Gifted Chat: ', messages);

                        onSend(messages);
                    }}
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