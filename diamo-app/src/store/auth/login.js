export default {
    // namespace: true,
    state: {
        loginEmail: '',
        loginPassword: '',
        loginError: null
    },
    getters: {
        loginEmail: (state) => state.loginEmail,
        loginPassword: (state) => state.loginPassword,
        loginError: (state) => state.loginError,
    },
    mutations: {
        loginEmail: (state, data) => { state.loginEmail = data },
        loginPassword: (state, data) => { state.loginPassword = data },
        loginError: (state, data) => { state.loginError = data },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        apiLogin ({ state, commit, dispatch }) {
            const user = {
                email: state.loginEmail,
                password: state.loginPassword
            }

            fetch('http://localhost:3030/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    }
                    else if (res.status === 400) {
                        commit('loginError', 'Неправильный логин или пароль')
                    }
                    else if (res.status === 500) {
                        commit('loginError', 'Ошибка сервера')
                    }
                })
                .then(json => {
                    if (json) {
                        document.querySelector("body").style.overflow = 'auto'

                        commit('loginError', null);
                        commit('user', json.user);
                        commit('jwt', json.token);

                        commit('loginEmail', '');
                        commit('loginPassword', '');
                    }
                })
                .catch(err => commit('loginError', err))
        }
    }

}