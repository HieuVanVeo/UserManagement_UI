import axios from "axios";

const BASE_URL = "http://localhost:8080";

class AuthService {

    login(username, password) {
        return axios.post(BASE_URL + "/login", {username, password})
                    .then((response) => {
                        if(response.data.access_token) {
                            localStorage.setItem("user", JSON.stringify(response.data));
                        }
                        return response.data;
                    });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(user){
        return axios.post(BASE_URL + "/api/users/register", user);
    }
}

export default new AuthService();