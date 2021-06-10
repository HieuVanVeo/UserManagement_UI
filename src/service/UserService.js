import axios from 'axios';
import authHeader from './AuthHeader'

const USER_BASE_URL = "http://localhost:8080/api/users";

class UserService {

    // registerUser(user){
    //     return axios.post(USER_BASE_URL + "/register", user)
    // }

    getUsers() {
        return axios.get(USER_BASE_URL + "/find_all", { headers: {Authorization : 'Bearer ' + JSON.parse(localStorage.getItem("user")).access_token} })
    }

    getUserById(id) {
        return axios.get(USER_BASE_URL + "/find_all" + "/" + id, { headers: authHeader() }) 
    }

    updateUser(id, user){
        return axios.put(USER_BASE_URL + "/update/" + id, user, { headers: authHeader() })
    }
    
    deleteUser(id){
        return axios.delete(USER_BASE_URL + "/delete/" + id, { headers: authHeader() })
    }
    
}

export default new UserService()
