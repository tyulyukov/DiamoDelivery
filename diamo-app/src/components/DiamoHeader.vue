<template>
  <header class="p-4 text-white fixed-top">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <span style="color: #E8D58C; font-weight: bold" class="fs-2">Diamo</span>
            </a>
          </li>
        </ul>

        <div class="text-end">
          <LoginPartial/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LoginPartial from "@/components/LoginPartial";
export default {
  name: "DiamoHeader",
  components: {LoginPartial}
}
</script>

<style scoped>

</style>