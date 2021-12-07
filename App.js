/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const webViewRef = useRef(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const postMessage = message => {
    webViewRef.current?.injectJavaScript(`
        (function() {
          window.postMessage(${JSON.stringify(message)}, '*');
        })();
        true;
      `);
  };

  const onPress = () => {
    webViewRef.current.focus();
    postMessage({type: 'upload'});
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            flex: 1,
            height: 400,
          }}>
          <WebView source={{uri: 'http://localhost:3000/'}} ref={webViewRef} />
        </View>
        <View style={{margin: 20}}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'cyan',
              width: 200,
            }}
            onPress={onPress}>
            <Text>Trigger upload from Native</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
