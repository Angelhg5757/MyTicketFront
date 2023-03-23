import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:9596/administrador",
    headers: {
        "Content-type": "application/json"
    }
});