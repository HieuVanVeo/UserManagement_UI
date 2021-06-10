import UserService from '../service/UserService';

// export const registerUser = (user) => async (dispatch) => {
//     try {
//         const res = await UserService.registerUser(user);
//         dispatch({
//             type: "REGISTER_USER",
//             payload: res.data,
//         });
//         return Promise.resolve(res.data);
//     }
//     catch (err) {
//         return Promise.reject(err);
//     }
// }

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const res = await UserService.updateUser(id, user);
        dispatch({
            type: "UPDATE_USER",
            payload: res.data,
        });
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await UserService.deleteUser(id);
        dispatch({
            type: "DELETE_USER",
            payload: {id},
        });
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const res = await UserService.getUsers();
        dispatch({
            type: "GET_USERS",
            payload: res.data,
        });
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

// export const getUserById = (id) => async (dispatch) => {
//     try {
//         const res = await UserService.getUserById(id);
//         dispatch({
//             type: "GET_USER_BY_ID",
//             payload: res.data,
//         });
//         return Promise.resolve(res.data);
//     }
//     catch (err) {
//         return Promise.reject(err);
//     }
// }

