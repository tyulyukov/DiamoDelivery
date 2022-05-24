export default {
    state: {
        changeFullName: '',
        changeEmail: '',
        changePhoneNumber: '',
        changeOldPassword: '',
        changeNewPassword: '',
        changeError: null,
        changePasswordError: null,
        isChangeLoading: false
    },
    getters: {
        changeFullName: (state) => state.changeFullName,
        changePhoneNumber: (state) => state.changePhoneNumber,
        changeEmail: (state) => state.changeEmail,
        changeOldPassword: (state) => state.changeOldPassword,
        changeNewPassword: (state) => state.changeNewPassword,
        changeError: (state) => state.changeError,
        changePasswordError: (state) => state.changePasswordError,
        isChangeLoading: (state) => state.isChangeLoading,
    },
    mutations: {
        changeFullName: (state, data) => { state.changeFullName = data },
        changePhoneNumber: (state, data) => { state.changePhoneNumber = data },
        changeEmail: (state, data) => { state.changeEmail = data },
        changeOldPassword: (state, data) => { state.changeOldPassword = data },
        changeNewPassword: (state, data) => { state.changeNewPassword = data },
        changeError: (state, data) => { state.changeError = data },
        changePasswordError: (state, data) => { state.changePasswordError = data },
        isChangeLoading: (state, data) => { state.isChangeLoading = data },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        updateProfile ({ state, commit, dispatch }) {
            commit('changeError', null)

            if (IsNullOrWhiteSpace(state.changeFullName)) {
                commit('changeError', 'Имя, фамилия не должны быть пустыми')
                return
            }
            else if (IsNullOrWhiteSpace(state.changeEmail)) {
                commit('changeError', 'Эл. почта не должна быть пустой')
                return
            }
            else if (IsNullOrWhiteSpace(state.changePhoneNumber)) {
                commit('changeError', 'Номер телефона не должен быть пустым')
                return
            }

            if (!ValidateEmail(state.changeEmail)) {
                commit('changeError', 'Неправильная эл. почта')
                return
            }
            else if (!ValidatePhoneNumber(state.changePhoneNumber)) {
                commit('changeError', 'Неправильный номер телефона')
                return
            }

            const user = {
                email: state.changeEmail,
                phoneNumber: state.changePhoneNumber,
                fullName: state.changeFullName
            }

            commit('isChangeLoading', true)
            fetch('http://localhost:3030/profile/', {
                method: 'PATCH',
                headers: {
                    'authorization': localStorage.getItem('JWT'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => {
                    commit('isChangeLoading', false)

                    if (res.status === 200) {
                        return res.json()
                    }
                    else if (res.status === 500) {
                        commit('changeError', 'Ошибка сервера')
                    }
                    else if (res.status === 405) {
                        commit('changeError', 'Эл. почта неправильная/занята')
                    }
                    else if (res.status === 406) {
                        commit('changeError', 'Номер телефона неправильный/занят')
                    }
                    else if (res.status === 400) {
                        commit('changeError', 'Поля не должны быть пустыми')
                    }
                })
                .then(json => {
                    if (json) {
                        commit('user', json.user)
                    }
                })
                .catch(err => commit('changeError', err))
        },

        // eslint-disable-next-line no-unused-vars
        updatePassword ({ state, commit, dispatch }) {
            commit('changePasswordError', null)

            if (state.changeOldPassword == state.changeNewPassword) {
                commit('changePasswordError', 'Пароли не должны совпадать')
            }

            if (IsNullOrWhiteSpace(state.changeNewPassword) || IsNullOrWhiteSpace(state.changeOldPassword)) {
                commit('changePasswordError', 'Пароль не должен быть пустым')
                return
            }

            commit('isChangeLoading', true)
            fetch('http://localhost:3030/profile/password', {
                method: 'PATCH',
                headers: {
                    'authorization': localStorage.getItem('JWT'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword: state.changeNewPassword, oldPassword: state.changeOldPassword })
            })
                .then(res => {
                    commit('isChangeLoading', false)

                    if (res.status === 500) {
                        commit('changePasswordError', 'Ошибка сервера')
                    }
                    else if (res.status === 406) {
                        commit('changePasswordError', 'Старый пароль не совпадает с текущим паролем')
                    }
                    else if (res.status === 409) {
                        commit('changePasswordError', 'Новый пароль должен содержать от 6 до 20 символов, хотя бы одну цифру, одну заглавную букву, и одну строчную букву')
                    }
                })
                .catch(err => commit('changePasswordError', err))
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