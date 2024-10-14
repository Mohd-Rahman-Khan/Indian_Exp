import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  AppState,
  Platform,
} from 'react-native';
import Login from './src/Screen/Login';
import Splash from './src/Screen/Splash';
import AppRoutes from './src/Navigation/Routes';
import AppNavigator from './src/Navigation/RootNavigator';
import COLORS from './src/GlobalConstants/COLORS';
import NetInfo from '@react-native-community/netinfo';
import NetworkError from './src/GlobalUtils/NetworkError';
import AppStateListner from './src/GlobalUtils/AppStateListner';
import {Provider} from 'react-redux';
import store from './src/store';
import {createStore} from 'redux';
import {withPreventScreenshots} from 'react-native-prevent-screenshots';
import {initPushHandler} from './src/PushNotification/NotificationConfig';
// import store from './src/store'

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }

// let store = createStore(counterReducer)
// console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))

function App() {
  let [netInfo, setNetInfo] = useState(true);

  useEffect(() => {
    initPushHandler();
  }, []);

  useEffect(() => {
    const netListner = NetInfo.addEventListener(netstate =>
      setNetInfo(netstate.isConnected),
    );
  }, []);

  const checkConnectivity = () => {
    NetInfo.fetch().then(netState => {
      setNetInfo(netState.isConnected);
    });
  };

  console.log('netInfo', netInfo);

  return (
    <SafeAreaView style={styles.container}>
      {!netInfo ? (
        <NetworkError
        // checkConnectivity={checkConnectivity}
        />
      ) : null}
      <AppStateListner />
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaView>
  );
}
export default withPreventScreenshots(App);
//export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.black
  },
});
