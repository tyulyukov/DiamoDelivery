<template>
  <button @click="showModal" style="background-color: #E8D58C; border-radius: 30px; width: 175px" class="btn shadow">Начать</button>
  <LoginModal ref="loginModal"/>
</template>

<script>
import LoginModal from "@/components/LoginModal";
export default {
  name: "LoginPartial",
  components: {LoginModal},
  methods: {
    showModal() {
      this.$refs.loginModal.toggleModal();
    }
  }
}
</script>

<style scoped>

</style>