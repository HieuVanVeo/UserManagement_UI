import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import getAppStore from './store/store';
import { Provider } from 'react-redux';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Register from './components/Register';

const store = getAppStore();
ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <App /> */}
      <Switch>
        <Route exact  path={["/login", "/"]} component={Login} />
        <Route exact path="/register" component={Register} />
        <App />
      </Switch>
      </Router>
    
  </Provider>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
