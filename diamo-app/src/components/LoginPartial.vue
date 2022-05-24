<template>
  <div v-if="user">
    <div class="dropdown text-end">
      <a style="color: white" href="#" class="d-block text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img style="border: 1px solid white; padding: 3px;" src="../assets/user.png" alt="My profile" width="35" height="35" class="rounded-circle">
        {{ user.fullName }}
      </a>
      <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1" style="">
        <li><a class="dropdown-item" href="/profile">Профиль</a></li>
        <li><a class="dropdown-item" href="#">Заказы</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a @click="signOut" class="dropdown-item" href="#">Выйти из аккаунта</a></li>
      </ul>
    </div>
  </div>
  <div v-else>
    <button @click="showModal" style="background-color: #E8D58C; border-radius: 30px; width: 175px" class="btn shadow">Начать</button>
    <LoginModal ref="loginModal"/>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import LoginModal from "@/components/LoginModal";

export default {
  name: "LoginPartial",
  components: {LoginModal},
  setup() {
    const store = useStore()

    return {
      user: computed(() => store.getters.user ),
      signOut: () => { store.dispatch('signOut') }
    }
  },
  methods: {
    showModal() {
      this.$refs.loginModal.toggleModal();
    }
  }
}
</script>

<style scoped>

</style>