import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from '../../@core/presenter/io'

import Home from './Home/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
    </Provider>
  );
}

export default App;
