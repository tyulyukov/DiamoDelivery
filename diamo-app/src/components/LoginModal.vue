<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>

  <div>
    <div class="modal fade" ref="modal" :class="{show, 'd-block': active}" aria-labelledby="exampleModalCenterTitle" tabindex="-1" role="dialog" >
      <div style="color: black" class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Diamo
            </h5>
            <button class="btn close" data-dismiss="modal" aria-label="Close" @click="toggleModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <form v-if="!isRegistering" class="form-signin">
              <h1 class="h3 mb-3 font-weight-normal">Войдите в аккаунт</h1>

              <div v-if="loginError" class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                  {{ loginError }}
                </div>
              </div>

              <input v-model="loginEmail" type="email" class="form-control my-1" placeholder="Эл. почта" required>
              <input v-model="loginPassword" type="password" class="form-control my-1" placeholder="Пароль" required>

              <a href="#" @click="login" class="btn btn-lg btn-primary btn-block mt-3">Войти</a>
              <p class="pt-3"><a @click="changeForm" href="#" class="mt-5 mb-3 text-muted">Нет аккаунта?</a></p>
            </form>

            <form v-else class="form-signin">
              <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>

              <div v-if="registerError" class="alert alert-danger d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                  {{ registerError }}
                </div>
              </div>

              <input v-model="registerFullName" type="text" class="form-control my-1" placeholder="Имя, фамилия" required>
              <input v-model="registerEmail" type="email" class="form-control my-1" placeholder="Эл. почта" required>
              <input v-model="registerPhoneNumber" type="text" class="form-control my-1" placeholder="Номер телефона" required>
              <input v-model="registerPassword" type="password" class="form-control my-1" placeholder="Пароль" required>
              <input v-model="registerRepeatPassword" type="password" class="form-control my-1" placeholder="Повторите пароль" required>

              <a href="#" @click="register" class="btn btn-lg btn-primary btn-block mt-3">Зарегистрироваться</a>
              <p class="pt-3"><a @click="changeForm" href="#" class="mt-5 mb-3 text-muted">Уже зарегистрированы?</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: "LoginModal",
  setup() {
    const store = useStore()

    return {
      register: () => { store.dispatch('apiRegister') },
      registerEmail: computed({
        get () { return store.getters.registerEmail },
        set (data) { store.commit('registerEmail', data) }
      }),
      registerFullName: computed({
        get () { return store.getters.registerFullName },
        set (data) { store.commit('registerFullName', data) }
      }),
      registerPhoneNumber: computed({
        get () { return store.getters.registerPhoneNumber },
        set (data) { store.commit('registerPhoneNumber', data) }
      }),
      registerPassword: computed({
        get () { return store.getters.registerPassword },
        set (data) { store.commit('registerPassword', data) }
      }),
      registerRepeatPassword: computed({
        get () { return store.getters.registerRepeatPassword },
        set (data) { store.commit('registerRepeatPassword', data) }
      }),
      registerError: computed({
        get () { return store.getters.registerError },
        set (data) { store.commit('registerError', data) }
      }),

      login: () => { store.dispatch('apiLogin') },
      loginEmail: computed({
        get () { return store.getters.loginEmail },
        set (data) { store.commit('loginEmail', data) }
      }),
      loginPassword: computed({
        get () { return store.getters.loginPassword },
        set (data) { store.commit('loginPassword', data) }
      }),
      loginError: computed({
        get () { return store.getters.loginError },
        set (data) { store.commit('loginError', data) }
      }),
    }
  },
  data() {
    return {
      active: false,
      show: false,
      isRegistering: false,
    };
  },
  methods: {
    toggleModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
          ? body.classList.add("modal-open")
          : body.classList.remove("modal-open");
      this.active
          ? body.style.overflow = "hidden"
          : body.style.overflow = "auto";
      setTimeout(() => (this.show = !this.show), 10);
    },
    changeForm() {
      this.isRegistering = !this.isRegistering
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
</style>