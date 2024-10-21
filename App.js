import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import Router from './src/routes';

export default function App() {
  LogBox.ignoreAllLogs(true);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}


