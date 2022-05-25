<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <h1 class="display-1 fw-bold">404</h1>
      <p class="fs-3"> <span class="text-danger">Упс!</span> Страница не найдена.</p>
      <p class="lead">
        Страница которую вы ищете не существует.
      </p>
      <a href="/" class="btn btn-primary">На главную</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
  setup() {
    document.title = "Не найдено | Diamo Delivery";
  }
}
</script>