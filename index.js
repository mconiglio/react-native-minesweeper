import React from 'react';
import { AppRegistry, unstable_enableLogBox } from 'react-native';
import { Provider } from 'react-redux';

import App from './src/components/App';
import store from './src/store';
import { name as appName } from './app.json';

unstable_enableLogBox();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
