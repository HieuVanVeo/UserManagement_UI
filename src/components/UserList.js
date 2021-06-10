import React, {Component, useState} from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../actions/users'
import { ExportCSV } from './ExportCSV';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.viewUser = this.viewUser.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatMarriage = this.formatMarriage.bind(this);
        this.mapUsersToUserExport = this.mapUsersToUserExport.bind(this);
        this.state = {
            usersExport: this.props.users
        };
        console.log("ngao", this.state.usersExport)
    }

    componentDidMount() {
        this.props.getUsers();
    }

    viewUser(id) {
        console.log(this.props)
        console.log("view")
        const state = { 'id': id }
        const title = ''
        const url = `/user_management/list_user/${id}`
        // window.history.pushState(state, title, url)
        this.props.history.push(`/user_management/list_user/${id}`)
    
    }

    formatDate(date) {
        for(let i=0; i<date.length; i++) {
            if(date[i].toString().length == 1) {
                date[i] = "0" + date[i];
            }
        }
        for(let i=0; i<date.length; i++) {
            return date[2] + "-" + date[1] + "-" +date[0];
        } 
    }

    formatMarriage(marriage) {
        if(marriage == true) {
            return "Marriaged";
        }
        return "Unmarriaged";
    }

    mapUsersToUserExport(users) {
        const usersExport = JSON.parse(JSON.stringify(users)) 
        console.log("users", users)
        // this.setState({usersExport: users})
        // this.setState(() => ({ usersExport: a11 }))
        // console.log("usersExport", this.state.usersExport)
        // return users;
        
        usersExport.map(user => {
            delete user.id;
            delete user.password;
            delete user.roles;
            user.birthday = this.formatDate(user.birthday);
            user.marriage = this.formatMarriage(user.marriage);
            return user;
        })
        console.log("a11", usersExport)
        return usersExport
    }
    
    render() {
        return (
            <div className="container mt-5">
                <h2 className = "text-center">List of users</h2>
                <div className = "row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Birthday</th>
                                <th>Age</th>
                                <th>Marriage</th>
                                <th></th>
                            </tr>
                        
                        </thead>
                        <tbody>
                            {
                                this.props.users.map(user => {
                                    return (
                                        <tr key = {user.id}>
                                            <td>{user.userId}</td>
                                            <td>{user.username}</td>
                                            <td>{this.formatDate(user.birthday)}</td>
                                            <td>{user.age}</td>
                                            <td>{this.formatMarriage(user.marriage)}</td>
                                            <td><div class="text-center"><button type="button" className="btn btn-info" onClick={() => this.viewUser(user.id)}>Detail</button></div></td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </div>
                <div className="">
                    <ExportCSV csvData={this.mapUsersToUserExport(this.props.users)} fileName="users" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      users: state.users
    };
};

export default connect(mapStateToProps, {getUsers}) (UserList)