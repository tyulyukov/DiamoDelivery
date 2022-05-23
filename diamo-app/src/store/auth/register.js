export default {
    // namespace: true,
    state: {
        registerFullName: '',
        registerEmail: '',
        registerPhoneNumber: '',
        registerPassword: '',
        registerRepeatPassword: '',
        registerError: null
    },
    getters: {
        registerFullName: (state) => state.registerFullName,
        registerPhoneNumber: (state) => state.registerPhoneNumber,
        registerEmail: (state) => state.registerEmail,
        registerPassword: (state) => state.registerPassword,
        registerRepeatPassword: (state) => state.registerRepeatPassword,
        registerError: (state) => state.registerError,
    },
    mutations: {
        registerFullName: (state, data) => { state.registerFullName = data },
        registerPhoneNumber: (state, data) => { state.registerPhoneNumber = data },
        registerEmail: (state, data) => { state.registerEmail = data },
        registerPassword: (state, data) => { state.registerPassword = data },
        registerRepeatPassword: (state, data) => { state.registerRepeatPassword = data },
        registerError: (state, data) => { state.registerError = data },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        apiRegister ({ state, commit, dispatch }, data = null) {
            if (state.registerPassword != state.registerRepeatPassword) {
                commit('registerError', 'Passwords aren`t matching')
                return
            }

            const user = {
                email: state.registerEmail,
                password: state.registerPassword,
                phoneNumber: state.registerPhoneNumber,
                fullName: state.registerFullName
            }

            fetch('http://localhost:3030/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    if (res.status === 201) {
                        return res.json()
                    }
                    else if (res.status === 500) {
                        commit('registerError', 'Ошибка сервера')
                    }
                })
                .then(json => {
                    console.log(json)
                })
                .catch(err => commit('registerError', err))
        }
    }

}