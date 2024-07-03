import {StyleSheet} from 'react-native';
import React from 'react';
import {ThemeProvider} from './src/theme/ThemeProvider';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import RootNavigation from './src/navigation/rootNavigation';
const App = () => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
