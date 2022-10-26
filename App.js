import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FirstPage from './FirstPage';
import SignIn from './SignIn';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start fire on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <SignIn/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
