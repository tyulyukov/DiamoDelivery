<template>
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

              <div v-if="loginEmailVerificationNeeded" class="alert alert-warning d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                  Подтвердите эл. почту (проверьте вкладку спам)
                  <span class="text-muted">Не пришло письмо с подтверждением? <a @click="resendLink" href="#">Нажмите здесь.</a></span>
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

              <div v-if="registerEmailVerificationNeeded" class="alert alert-warning d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                <div>
                  Подтвердите эл. почту (проверьте вкладку спам) затем войдите в свой аккаунт
                  <span class="text-muted">Не пришло письмо с подтверждением? <a @click="resendLink" href="#">Нажмите здесь.</a></span>
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
      resendLink: () => { store.dispatch('apiResendLink') },
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
      registerError: computed(() => store.getters.registerError),
      registerEmailVerificationNeeded: computed(() => store.getters.registerEmailVerificationNeeded),

      login: () => { store.dispatch('apiLogin') },
      loginEmail: computed({
        get () { return store.getters.loginEmail },
        set (data) { store.commit('loginEmail', data) }
      }),
      loginPassword: computed({
        get () { return store.getters.loginPassword },
        set (data) { store.commit('loginPassword', data) }
      }),
      loginError: computed(() => store.getters.loginError),
      loginEmailVerificationNeeded: computed(() => store.getters.loginEmailVerificationNeeded)
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