import React from 'react';
import UserForm from './UserForm';
import { registerUser } from '../actions/users';
import { connect } from 'react-redux';

const Register = (props) => (
    <div>
        <UserForm action = "REGISTER"></UserForm>
    </div>
)

export default Register;