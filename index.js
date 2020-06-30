import { AppRegistry, unstable_enableLogBox } from 'react-native';
import App from './src/components/App';
import { name as appName } from './app.json';

unstable_enableLogBox();

AppRegistry.registerComponent(appName, () => App);
