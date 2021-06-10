import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashBoard from '../components/DashBoard';
import UserList from '../components/UserList';

const  AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" exact component = {DashBoard}/>
                <Route path="/register_user" component = {UserList}/>
                <Route path="/user_management/list_user" component = {UserList}/>
            </Switch>
        </div>
    </BrowserRouter>
    // <div></div>
)

export default AppRouter;