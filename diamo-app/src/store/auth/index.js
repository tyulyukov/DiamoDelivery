import register from "./register"
import login from "./login"

export default {
    state: {
        jwt: localStorage.getItem('JWT') || null,
        user: JSON.parse(localStorage.getItem('UserInfo')) || null
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
            localStorage.setItem('UserInfo', JSON.stringify(data))
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        signOut ({ state, commit, dispatch }) {
            commit('user', null)
            commit('jwt', null)

            localStorage.removeItem('JWT')
            localStorage.removeItem('UserInfo')
        }
    },
    modules: {
        register,
        login
    }
}