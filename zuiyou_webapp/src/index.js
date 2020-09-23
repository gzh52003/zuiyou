
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,BrowserRouter} from 'react-router-dom'
import App from './App';
import Provider from './store/index'
import * as serviceWorker from './serviceWorker';
const Router = process.env.NODE_ENV === 'production' ? BrowserRouter : HashRouter;
ReactDOM.render(
  <Provider>

    <Router>
      <App />
    </Router>
  </Provider>
 ,
  document.getElementById('root')

);


serviceWorker.unregister();
