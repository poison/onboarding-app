import Logo from 'assets/images/Logo.png';
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image source={Logo} style={styles.logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7830EE',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
  },
});

export default App;
