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

              <input type="email" class="form-control my-1" placeholder="Эл. почта" required>
              <input type="password" class="form-control my-1" placeholder="Пароль" required>

              <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Войти</button>
              <p class="pt-3"><a @click="changeForm" href="#" class="mt-5 mb-3 text-muted">Нет аккаунта?</a></p>
            </form>

            <form v-else class="form-signin">
              <h1 class="h3 mb-3 font-weight-normal">Регистрация</h1>

              <input type="email" class="form-control my-1" placeholder="Эл. почта" required>
              <input type="text" class="form-control my-1" placeholder="Номер телефона" required>
              <input type="password" class="form-control my-1" placeholder="Пароль" required>
              <input type="password" class="form-control my-1" placeholder="Повторите пароль" required>

              <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Зарегистрироваться</button>
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
export default {
  name: "LoginModal",
  data() {
    return {
      active: false,
      show: false,
      isRegistering: false,
    };
  },
  methods: {
    /**
     * when clicking on button in bootstrap
     * the modal style set to display and after that a show class add to modal
     * so to do that we will show modal-backdrop and set modal display to block
     * then after that we will add show class to the modal and we will use setTimeout
     * to add show class because we want show class to add after the modal-backdrop show and modal display change
     * to make modal animation work
     */
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