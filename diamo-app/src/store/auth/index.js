import register from "./register"
import login from "./login"

export default {
    state: {
        jwt: localStorage.getItem('JWT') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    },
    getters: {
        jwt: (state) => state.jwt,
        user: (state) => state.user
    },
    mutations: {
        jwt: (state, data) => {
            state.jwt = data
            localStorage.setItem('JWT', data)
        },
        user: (state, data) => {
            state.user = data
            localStorage.setItem('user', JSON.stringify(data))
        }
    },
    modules: {
        register,
        login
    }
}