<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
    </symbol>
  </svg>

  <DiamoHeader style="background-color: #212121;"/>

  <main class="py-5 mt-5">
    <section class="py-3">
      <div class="container">
        <div class="main-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
                    <div class="mt-3">
                      <h4>{{ fullName }}</h4>
                      <p class="text-secondary mb-1">Мой профиль</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <h3 class="card-header">
                      Контактная информация
                    </h3>
                    <div class="card-body">
                      <div v-if="error" class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                          {{ error }}
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Имя, фамилия</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text" class="form-control" v-model="fullName">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Эл. почта</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text" class="form-control" v-model="email">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Номер телефона</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="text" class="form-control" v-model="phoneNumber">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9 text-secondary">
                          <input v-if="!isChangeLoading" @click="updateProfile" type="button" class="btn btn-primary px-4" value="Save Changes">
                          <button v-else class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Загрузка...
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="card">
                    <h3 class="card-header">
                      Безопасность
                    </h3>
                    <div class="card-body">
                      <div v-if="passwordError" class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                          {{ passwordError }}
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Старый пароль</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="password" class="form-control" v-model="oldPassword">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-sm-3">
                          <h6 class="mb-0">Новый пароль</h6>
                        </div>
                        <div class="col-sm-9 text-secondary">
                          <input type="password" class="form-control" v-model="newPassword">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-9 text-secondary">
                          <input v-if="!isChangeLoading" @click="updatePassword" type="button" class="btn btn-primary px-4" value="Save Changes">
                          <button v-else class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Загрузка...
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <DiamoFooter/>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import DiamoHeader from "@/components/DiamoHeader";
import DiamoFooter from "@/components/DiamoFooter";
import router from "@/router";

export default {
  name: "MyProfileView",
  components: {DiamoFooter, DiamoHeader},
  setup() {
    const store = useStore()

    document.title = "Мой профиль | Diamo Delivery";

    if (!store.getters.user)
      router.go(-1)

    return {
      updateProfile: () => { store.dispatch('updateProfile') },
      updatePassword: () => { store.dispatch('updatePassword')},
      user: computed(() => store.getters.user),
      fullName: computed({
        get () { return store.getters.changeFullName },
        set (data) { store.commit('changeFullName', data) }
      }),
      email: computed({
        get () { return store.getters.changeEmail },
        set (data) { store.commit('changeEmail', data) }
      }),
      phoneNumber: computed({
        get () { return store.getters.changePhoneNumber },
        set (data) { store.commit('changePhoneNumber', data) }
      }),
      oldPassword: computed({
        get () { return store.getters.changeOldPassword },
        set (data) { store.commit('changeOldPassword', data) }
      }),
      newPassword: computed({
        get () { return store.getters.changeNewPassword },
        set (data) { store.commit('changeNewPassword', data) }
      }),
      error: computed(() => store.getters.changeError),
      passwordError: computed(() => store.getters.changePasswordError),
      isChangeLoading: computed(() => store.getters.isChangeLoading)
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    user (newUser, oldUser) {
      if (!newUser)
        router.push('/')
    }
  },
  mounted() {
    const store = useStore()

    const user = store.getters.user
    store.commit('changePhoneNumber', user.phoneNumber)
    store.commit('changeFullName', user.fullName)
    store.commit('changeEmail', user.email)
  }
}
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: .25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}
.me-2 {
  margin-right: .5rem!important;
}
</style>