<template>
  <header style="background-color: #212121" class="p-4 text-white fixed-top">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <span style="color: #E8D58C" class="fs-2">Diamo</span>
            </a>
          </li>
        </ul>

        <div class="text-end">
          <button style="background-color: #E8D58C; border-radius: 30px; width: 175px" class="btn shadow">Начать</button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <section style="background-color: #212121" class="py-5">
      <div class="py-lg-5">
        <div class="col-lg-8 col-md-10 mx-auto">
          <h1 style="color: white; font-weight: bold">Исследуйте места доставки<span v-if="city"> в {{city}}</span></h1>

          <div class="input-group input-group-lg mb-3 py-5">
            <input type="text" class="form-control" placeholder="Название заведения" aria-label="Название заведения" aria-describedby="button-addon2">
            <button style="background-color: #E8D58C;" class="btn" type="button" id="button-addon2">Поиск</button>
          </div>
        </div>
      </div>
    </section>

    <div>
      <div class="container" style="height: 500vh">

      </div>
    </div>
  </main>
</template>

<script>
import { useStore } from 'vuex'
import {computed} from "vue";

export default {
  name: 'HomeView',
  setup () {
    const store = useStore()
    store.dispatch('getCity')

    return {
      city: computed(() => store.getters.city),
    }
  }
}
</script>
