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
            commit('registerError', null);

            if (IsNullOrWhiteSpace(state.registerFullName)) {
                commit('registerError', 'Имя, фамилия не должны быть пустыми')
                return
            }
            else if (IsNullOrWhiteSpace(state.registerEmail)) {
                commit('registerError', 'Эл. почта не должна быть пустой')
                return
            }
            else if (IsNullOrWhiteSpace(state.registerPhoneNumber)) {
                commit('registerError', 'Номер телефона не должен быть пустым')
                return
            }
            else if (IsNullOrWhiteSpace(state.registerPassword)) {
                commit('registerError', 'Пароль не должен быть пустым')
                return
            }

            if (!ValidateEmail(state.registerEmail)) {
                commit('registerError', 'Неправильная эл. почта')
                return
            }

            if (!ValidatePhoneNumber(state.registerPhoneNumber)) {
                commit('registerError', 'Неправильный номер телефона')
                return
            }

            if (state.registerPassword != state.registerRepeatPassword) {
                commit('registerError', 'Пароли не совпадают')
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
                    else if (res.status === 405) {
                        commit('registerError', 'Эл. почта неправильная/занята')
                    }
                    else if (res.status === 406) {
                        commit('registerError', 'Номер телефона неправильный/занят')
                    }
                    else if (res.status === 409) {
                        commit('registerError', 'Пароль должен содержать от 6 до 20 символов, хотя бы одну цифру, одну заглавную букву, и одну строчную букву')
                    }
                    else if (res.status === 400) {
                        commit('registerError', 'Поля не должны быть пустыми')
                    }
                })
                .then(json => {
                    if (json) {
                        commit('loginEmail', state.registerEmail)
                        commit('loginPassword', state.registerPassword)
                        dispatch('apiLogin')

                        commit('registerError', null);
                        commit('registerEmail', '');
                        commit('registerPassword', '');
                        commit('registerRepeatPassword', '');
                        commit('registerFullName', '');
                        commit('registerPhoneNumber', '');
                    }
                })
                .catch(err => commit('registerError', err))
        }
    }
}

function IsNullOrWhiteSpace(str) {
    return str == null || str.trim() === ''
}

function ValidateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function ValidatePhoneNumber(phoneNumber) {
    return phoneNumber.match(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
    );
}