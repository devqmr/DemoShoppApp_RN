import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { composeWithDevTools} from 'redux-devtools-extension';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ShopNavigatore from './navigation/ShopNavigatore';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

//Remember to remove composeWithDevTools() when publish app to Production.
const store = createStore(rootReducer, composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
    />
  }

  return (
    <Provider store={store}>
      <ShopNavigatore />
    </Provider>
  );
}

