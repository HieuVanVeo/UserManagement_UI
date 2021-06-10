import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { login } from "../actions/auth";
import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

class Login extends Component {

    constructor(props){
        super(props);
        this.changeUserIdHandler = this.changeUserIdHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            userId: "",
            password: ""
        }

    }

    changeUserIdHandler(e) {
        this.setState({
          userId: e.target.value,
        });
    }
    
    changePasswordHandler(e) {
        this.setState({
          password: e.target.value,
        });
    }

    handleLogin(e) {
        e.preventDefault();
        console.log("aaaaa", this.props)
        this.props.login(this.state.userId, this.state.password).then(() => {
            this.props.history.push('home');
            window.location.reload();
        })
    }

    render() {
        return (
            <div className= "container mt-5" style= {{width: "500px"}}>
         
         <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
                <form>
                    <div className="form-group">
                        <label htmlFor="userId" className="label-login">UserId</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userId"
                            value={this.state.userId}
                            onChange={this.changeUserIdHandler}
                            // validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label-login">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.changePasswordHandler}
                            // validations={[required]}
                        />
                    </div>
                    <br></br>
                    <div className="text-center">
                        <button type="button" className="btn btn-dark" onClick={this.handleLogin}>Login</button><br></br><br></br>
                        <Link className="" to="/register">Register?</Link>
                    </div>
                </form>
           </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
      isLoggedIn,
      message
    };
  }
  
export default compose (withRouter, connect(mapStateToProps, {login})) (Login);
