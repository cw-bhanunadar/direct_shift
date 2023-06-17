import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers/rootReducer';
import { loadState, saveState } from './redux/localStorage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistedState = loadState();
console.log(persistedState)

const store = createStore(
  rootReducer,
  persistedState
);

store.subscribe(() => {
  saveState(store.getState());
})
console.log(store.getState())
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
