import axios from 'axios'

const setBearerToken = (domain, token) => {
    axios.interceptors.request.use((config) => {
        if (config.baseURL === domain) {
            config.headers.common['Authorization'] = `Bearer ${token}`
        }

        return config
    })
}

export default setBearerToken