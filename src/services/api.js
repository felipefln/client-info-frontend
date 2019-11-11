import axios from 'axios'

// URL da API, ou seja, URL do backend rodando localmente
const api = axios.create({
    baseURL: 'http://localhost:5000',
})

export default api;