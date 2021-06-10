import React, { Component } from 'react';
import { updateUser, deleteUser } from '../actions/users';
import {register} from '../actions/auth'
import { connect } from 'react-redux';
import UserService from '../service/UserService';
import {withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.changeUserIDHandler = this.changeUserIDHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeBirthdayHandler = this.changeBirthdayHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.changeMarrageHandler = this.changeMarrageHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.cancel = this.cancel.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.init = this.init.bind(this);

        this.state = {
            id: this.props.match.params.id,
            userId: props.user ? props.user.userId : '',
            password: props.user ? props.user.password : '',
            username: props.user ? props.user.username : '',
            birthday: props.user ? props.user.birthday : '',
            age: props.user ? props.user.age : '',
            marriage: props.user ? props.user.marriage : '',
            // disabled: false,
            error: ''
        }
    }

    // componentDidMount() {
    //     this.props._getUser(this.state.id);
    //     console.log(this.state.user);
    // }

    componentDidMount() {

        console.log("this.state.id", this.props);
        if(this.state.id == null) {
            return
        }
        else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({
                    userId: user.userId,
                    password: user.password,
                    username: user.username,
                    birthday: this.formatDate(user.birthday),
                    age: user.age,
                    marriage: user.marriage
                })
            })
        }
    }

    saveUser(e) {
        e.preventDefault();

        if(!this.state.userId || !this.state.password || !this.state.username) {
            this.setState(() => ({ error: 'UserID, Password, Username éo đc để trống... =='}))
        } else {
            this.setState(() => ({ error: ''}));
            // this.props.userData(
            //     {
            //         userId: this.state.userId,
            //         password: this.state.password,
            //         username: this.state.username,
            //         birthday: this.state.birthday,
            //         age: this.state.age,
            //         marriage: this.state.marriage
            //     }
            // );

            let userData = {userId: this.state.userId,
                        password: this.state.password,
                        username: this.state.username,
                        birthday: this.state.birthday,
                        age: this.state.age,
                        marriage: this.state.marriage == true ? true : false,
                        role: ["USER"]
                    }
            console.log("this.state.marriage", this.state.marriage)            
            console.log("userdata", userData);
            // return;

            if(this.state.id == null) {
                this.props.register(userData).then(res => {this.props.history.push('/login') });

                // UserService.registerUser(userData).then(res => {this.props.history.push('/user_management/list_user') });
            }
            else {
                this.props.updateUser(this.state.id, userData).then(res => {this.props.history.push('/user_management/list_user') });
                // UserService.updateUser(this.state.id, userData).then(res => {this.props.history.push('/user_management/list_user') });
            }
           

        }
    }

    deleteUser(e) {
        e.preventDefault();

        console.log("ngoa", this.state.id)
        if(this.state.id != null) {
            this.props.deleteUser(this.state.id).then(res => {this.props.history.push('/user_management/list_user') });
            // UserService.deleteUser(this.state.id).then(res => {this.props.history.push('/user_management/list_user') });
        }
        else {
            return;
        }

        
    }

    cancel() {
        
        this.props.history.push('/login')
        // useHistory.push('/user_management/list_user')

    //     let locat = '/user_management/list_user';
    //   window.history.replaceState({id:'page3'},'Page3','/page3');
    //   window.history.pushState(null,null,locat);
        // const stateObj = { foo: 'bar' }
        // window.history.replaceState(stateObj, "/user_management/list_user")
        // window.history.pushState(null, null, '/user_management/list_user')
    }

    formatDate(date) {
        for(let i=0; i<date.length; i++) {
            if(date[i].toString().length == 1) {
                date[i] = "0" + date[i];
            }
        }
        for(let i=0; i<date.length; i++) {
            return date[0] + "-" + date[1] + "-" +date[2];
        }
        // for(let i=0; i<date.length; i++) {
        //     var date = new Date(date[0], date[1], date[2])
        //     console.log(date)
        //     console.log(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)
        //     return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        // }
        
    }

    init() {
        
        if(this.props.action == "VIEW") {
            // $( "#userID" ).prop( "disabled", true );
        }
    }

    changeUserIDHandler(e) {
        const userId = e.target.value;
        this.setState(() => ({ userId: userId}));
    }

    changePasswordHandler(e) {
        const password = e.target.value;
        this.setState(() => ({ password: password}));
    }

    changeUsernameHandler(e) {
        const username = e.target.value;
        this.setState(() => ({ username: username}));
    }

    changeBirthdayHandler(e) {
        const birthday = e.target.value;
        this.setState(() => ({ birthday: birthday}));
    }

    changeAgeHandler(e) {
        const age = e.target.value;
        this.setState(() => ({ age: age}));
    }

    changeMarrageHandler(e) {
        const marriage = e.target.value == "married" ? true : false;
        this.setState(() => ({ marriage: marriage}));
    }

    render() {
        let action = this.props.action;
        let title; 
        let button; 
    
        return (
            // <div>
                <div className="container mt-5">
                    <div className = "row">
                        <div className = "card col-md-10 offset-md-1 offset-md-1">
                            {this.props.action == 'REGISTER' && <h3 className = "text-center">Register User</h3>}
                            {this.props.action == 'VIEW' && <h3 className = "text-center">View User</h3>}
                            <div className = "card-body">
                            {this.state.error && <p className='error'>{this.state.error}</p>}
                                <form>
                                    <div className = "form-group row">
                                        <label className = "col-sm-2 col-form-label">User ID</label>
                                        <div className = "col-sm-10">
                                            <input type = "text" className = "form-control" id="userId" placeholder = "User ID" disabled = {(this.props.action) == "VIEW" ? true : false}
                                                value={this.state.userId} onChange={this.changeUserIDHandler} ></input>
                                        </div>
                                    </div>
                            
                                    <div className = "form-group row">
                                        <label className = "col-sm-2 col-form-label">Password</label>
                                        <div className = "col-sm-10">
                                            <input type = "text" className = "form-control" id="password" placeholder = "Password"
                                                value={this.state.password} onChange={this.changePasswordHandler} ></input>
                                        </div>
                                    </div>

                                    <div className = "form-group row">
                                        <label className = "col-sm-2 col-form-label">Username</label>
                                        <div className = "col-sm-10">
                                            <input type = "text" className = "form-control" id="username" placeholder = "Username"
                                                value={this.state.username} onChange={this.changeUsernameHandler} ></input>
                                        </div>
                                    </div>

                                    <div className = "form-group row">
                                        <label className = "col-sm-2 col-form-label">Birthday</label>
                                        <div className = "col-sm-10">
                                            <input type = "date" className = "form-control" id="birthday" placeholder = "Birthday"
                                                value={this.state.birthday} onChange={this.changeBirthdayHandler} ></input>
                                        </div>
                                    </div>
                                    <div className = "form-group row">
                                        <label className = "col-sm-2 col-form-label">Age</label>
                                        <div className = "col-sm-10">
                                            <input type = "text" className = "form-control" id="age" placeholder = "Age"
                                                value={this.state.age} onChange={this.changeAgeHandler} ></input>
                                        </div>
                                    </div>

                                    <fieldset className="form-group">
                                        <div className="row">
                                        <legend className="col-form-label col-sm-2 pt-0">Marriage</legend>
                                        <div className="col-sm-10">
                                            <div className="form-check">
                                            <input className="form-check-input" type="radio" name="marriage" id="married" value="married" checked={this.state.marriage === true} onChange={this.changeMarrageHandler}></input>
                                            <label className="form-check-label"> 
                                                Married
                                            </label>
                                            </div>
                                            <div className="form-check">
                                            <input className="form-check-input" type="radio" name="marriage" id="unmarried" value="unmarried" checked={this.state.marriage === false} onChange={this.changeMarrageHandler}></input>
                                            <label className="form-check-label">
                                                Unmarried
                                            </label>
                                            </div>
                                        </div>
                                        </div>
                                    </fieldset>
                                    {/* <button type="button" className="btn btn-light" onClick={this.registerUser}>Register User</button>
                                    <button type="button" className="btn btn-dark" onClick={this.cancel}>Cancel</button> */}
                                    {this.props.action == 'REGISTER' && 
                                        <div className="text-center"><button type="button" className="btn btn-dark" onClick={this.saveUser}>Register User</button> 
                                        {/* <button type="button" className="btn btn-danger float-end" onClick={this.cancel}>Cancel</button> */}
                                        <br></br><br></br>
                                        <Link className="" to="/login">Login?</Link>
                                        </div>
                                        }
                                    {this.props.action == 'VIEW' && 
                                        <div className="form-group"><button type="button" className="btn btn-dark" onClick={this.saveUser}>Update</button>
                                         <button type="button" className="btn btn-danger float-end" onClick={this.deleteUser}>Delete</button></div>
                                        }
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            // </div>
        )
    }
}

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         _getUser: () => {
//         dispatch(getUser(window.history.state));
//       },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps) (UserForm)

export default compose (withRouter, connect(null, {register, updateUser, deleteUser})) (UserForm)
