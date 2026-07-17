import axios from 'axios';

export function login(email, password) {
    const API_URL = 'http://localhost:8080/auth/login';
    return axios.post(API_URL, { email, password });
}

export function register(username, email, password) {
    const API_URL = 'http://localhost:8080/auth/register';
    return axios.post(API_URL, { username, email, password });
}

