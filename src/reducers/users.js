const usersReducerDefaultState = [];

export default (users = usersReducerDefaultState, action) => {

    const {type, payload} = action;

    switch (type) {
        // case 'REGISTER_USER':
        //     return [...users, payload];

        case 'GET_USERS':
            return payload;

        case 'UPDATE_USER':
            return users.map((user) => {
                if(user.id === payload.id) {
                    return {
                        ...user,
                        ...payload,
                    };
                } else {
                    return user;
                }
            });
        
        case 'DELETE_USER':
            return users.filter(({id}) => id !== payload.id);

        default:
            return users;    
    }
}