import axios from "axios";

export default axios.create({
    baseURL: `${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/`,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
    withCredentials: false,
    responseType: 'json',
});