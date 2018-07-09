import axios from 'axios'

const BASE_URL = '/'

export default (method, url, query) => {
    return axios
        .request({
            method: method,
            baseURL: BASE_URL,
            url: url,
            data: query.data || {},
            params: query.params || {}
        })
        .then(response => {
            return Promise.resolve(response.data)
        })
        .catch(err => {
            return Promise.reject(err.response)
        })
}