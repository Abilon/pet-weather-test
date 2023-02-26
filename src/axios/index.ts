import axios from "axios";

const api = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5',
})

api.interceptors.request.use(config => {
    config.url = config.url + '&lang=ru&units=metric&appid=' + 'a85ac37788391927f875c697e9c47c93'
    return config
})

export default api;