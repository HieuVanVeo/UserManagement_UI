import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';

console.log("hieu", window.history.state)
const ViewUser = (props) => (
    
    <UserForm action = "VIEW" id={window.history.state} />
)

export default ViewUser;