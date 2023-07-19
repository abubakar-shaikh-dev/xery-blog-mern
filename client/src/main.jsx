import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import {Provider} from "react-redux"
import axios from "axios";
import {store,PersistedStore} from './redux/store.jsx';
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Provider store={store}>
      <PersistGate persistor={PersistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
)
