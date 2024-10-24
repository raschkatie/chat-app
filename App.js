import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './components/Chat';
import Start from './components/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='StartScreen'
      >
        <Stack.Screen
          name='StartScreen'
          component={Start}
        />
        
        <Stack.Screen
          name='ChatScreen'
          component={Chat}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;