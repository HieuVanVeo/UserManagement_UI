import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList'
import DashBoard from './components/DashBoard';
import Admin from './components/Admin';
import getAppStore from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from './components/UserForm';
import ViewUser from './components/ViewUser';
import Register from './components/Register';
import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "./actions/auth";
import Login from './components/Login';

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.logout();
  }

  
  
  render() {
    const token = localStorage.getItem('user');
    if (!token) {
      return (
        <Redirect to="/login" />
      );
    }


    return (

      <Router>
        <nav className="navbar navbar-dark bg-dark">
              <Link className="navbar-brand" to="/home">Home</Link>
              {/* <Link className="my-2 my-lg-0" to="/login" onClick={this.logOut} >Logout</Link> */}
              <a href="/login" className="my-2 my-lg-0" onClick={this.logOut}>LogOut</a>
          </nav>
          <div className = "row">
              <div className = "col-sm-3 border-end bg-white">
                  <div className="list-group list-group-flush">
                      <Link to="/user_management/list_user" className="list-group-item list-group-item-action list-group-item-light p-3">User Management</Link>
                      <Link to="/admin_management/" className="list-group-item list-group-item-action list-group-item-light p-3">Admin screen</Link>
                  </div>
              </div>
              <div className = "col-sm-9">
                  <Switch>
                    {/* <Route exact path="/" render={() => { return ( <Redirect to="/login" /> )}}/> */}
                    <Route exact path="/home" component={DashBoard} />
                    <Route exact path={["/user_management", "/user_management/list_user"]} component={UserList} />
                    <Route exact path="/user_management/list_user/:id" component={ViewUser} />
                    <Route exact path="/admin_management" component={Admin} />
                  </Switch>
              </div>
          </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps, {logout}) (App);
