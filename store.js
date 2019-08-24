import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const middlewares = [thunk, logger];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'jwtReducer',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);

const persistor = persistStore(store);

export {
  store,
  persistor,
};
