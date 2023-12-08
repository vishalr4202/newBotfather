import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import configureAppStore from './app/store/index.ts';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import './index.css'

const initialState = {};
const store = configureAppStore(initialState);
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </React.StrictMode>
  </Provider>,
)
