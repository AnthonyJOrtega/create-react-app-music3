import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import {BrowserRouter} from "react-router-dom";
import PlayerContextProvider from './context/PlayerContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <PlayerContextProvider>
      <App />
    </PlayerContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
