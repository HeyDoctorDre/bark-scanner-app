import React from 'react';
import Navigation from './Navigation';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import treesReducer from './src/store/trees-reducer';
import { themeReducer } from './src/store/theme-reducer';

const rootReducer = combineReducers({
  trees: treesReducer,
  theme: themeReducer, // Include theme reducer in the rootReducer
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
