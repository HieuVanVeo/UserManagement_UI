import React, { Component } from 'react'

export default class Admin extends Component {

    render() {

        const role = JSON.parse(localStorage.getItem('user'))['roles']
        console.log(role)
        console.log(role.indexOf("ADMIN"))
        if(role.includes("ADMIN")) {
            return (
                <div>
                    Hi Admin
                </div>
            )
        }
        else return (
            <div>
                Access decline
            </div>
        )
    }
}
