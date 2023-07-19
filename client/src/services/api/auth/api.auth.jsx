import axios from "axios";

export async function RegisterUser(data){
    try {
        const response = await axios.post(`/user/register`,data)
        return Promise.resolve(response.data)
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}

export async function LoginUser(data){
    try {
        const response = await axios.post(`/user/login`,data)
        return Promise.resolve(response.data)
    } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        return Promise.reject({ msg: errorMsg });
    }
}
