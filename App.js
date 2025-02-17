
import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(['@firebase/auth: Auth', 'AsyncStorage has been extracted from']);

// import Screens
import Chat from './components/Chat';
import Start from './components/Start';

// import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// initialize Firebase db
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { getStorage } from 'firebase/storage';

const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase Credentials
  const firebaseConfig = {
    apiKey: "AIzaSyC0yiexjFMZYLe4zddNhoDYiOzKhwyTdYI",
    authDomain: "chat-app-b15c3.firebaseapp.com",
    projectId: "chat-app-b15c3",
    storageBucket: "chat-app-b15c3.firebasestorage.app",
    messagingSenderId: "374517180533",
    appId: "1:374517180533:web:bc54ae3b3aba0dfd17703c"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />

        <Stack.Screen
          name='ChatScreen'
        >
          {props => 
            <Chat 
              isConnected={connectionStatus.isConnected} 
              db={db} 
              storage={storage}
              {...props} 
            />
          }
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;