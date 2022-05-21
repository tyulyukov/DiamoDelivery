<template>
  <header class="p-4 text-white fixed-top bg-search">
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
          <button style="background-color: #E8D58C; border-radius: 30px; width: 175px" class="btn shadow">Начать</button>
        </div>
      </div>
    </div>
  </header>

  <main>
    <section class="pt-5 bg-search">
      <div class="py-lg-5">
        <div style="text-align: center" class="col-lg-5 col-md-7 mx-auto">
          <h1 style="color: white; font-weight: bolder">Время насладиться едой</h1>
          <h6 style="color: white; font-weight: lighter">Найдите ресторан<span v-if="city"> в {{city}}</span></h6>

          <div class="input-group input-group-lg mb-3 py-5">
            <span class="input-group-text">
              <svg viewBox="0 0 24 24" width="1em" height="1em" role="presentation" focusable="false" aria-hidden="true"><path d="M12 13c-1.096 0-1.984-.93-1.984-2.077 0-1.147.888-2.077 1.984-2.077s1.984.93 1.984 2.077C13.984 12.07 13.096 13 12 13m0-9c-3.866 0-7 3.187-7 7.071 0 1.737.63 3.323 1.668 4.55L12 22l5.332-6.379A7.016 7.016 0 0019 11.071C19 7.187 15.866 4 12 4" fill-rule="evenodd"></path></svg>
            </span>
            <input type="text" class="form-control" placeholder="Название заведения" aria-label="Название заведения" >
            <button class="btn btn-primary">Поиск</button>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="bg-pizza" style="height: 500px;">
        <svg style="height: 100px; width: 100%; fill: #212121;" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0 0, 0 100, 100 0, 100 0"></polygon>
        </svg>
      </div>
    </section>

    <section>
      <div class="container">
        <h2 class="fw-bold py-5 text-left">Популярные заведения: </h2>

        <div id="companies" v-if="companies">
          <div class="row">
            <div class="col-3 py-3" v-for="company in companies" :key="company._id">
              <CompanyCard :company="company"/>
            </div>
          </div>
        </div>

        <div style="text-align: center" id="placeholders" v-else>
          <div class="row">
            <div class="col-3 py-3" v-for="i in 10" :key="i">
              <div class="card" aria-hidden="true">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg>
                <div class="card-body">
                  <h5 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                  </h5>
                  <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                  </p>
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
import {computed} from "vue";
import DiamoFooter from "@/components/DiamoFooter";
import CompanyCard from "@/components/CompanyCard";

export default {
  name: 'HomeView',
  components: {CompanyCard, DiamoFooter},
  setup () {
    const store = useStore()
    store.dispatch('getCity')
    store.dispatch('getCompanies')

    return {
      city: computed(() => store.getters.city),
      companies: computed(() => store.getters.companies),
    }
  }
}
</script>

<style scoped>
.bg-search {
  background-color: #212121;
}

.bg-pizza {
  background-repeat: no-repeat;
  background-image: url('https://www.dreamofenglish.com/wp-content/uploads/pizza-3007395_1920-1.jpg');
  background-size: cover;
}
</style>