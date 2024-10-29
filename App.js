// import Screens
import Chat from './components/Chat';
import Start from './components/Start';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['@firebase/auth: Auth']);

// import Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// initialize Firebase db
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {
  // init Firebase db
  const firebaseConfig = {
    apiKey: "AIzaSyC0yiexjFMZYLe4zddNhoDYiOzKhwyTdYI",
    authDomain: "chat-app-b15c3.firebaseapp.com",
    projectId: "chat-app-b15c3",
    storageBucket: "chat-app-b15c3.appspot.com",
    messagingSenderId: "374517180533",
    appId: "1:374517180533:web:bc54ae3b3aba0dfd17703c"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

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
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;