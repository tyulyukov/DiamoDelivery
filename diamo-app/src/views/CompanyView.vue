<template>
  <main class="py-5 mt-5">
    <section class="py-3">
      <div v-if="selectedCompany" class="container">
        <div class="p-5 mb-4 rounded-3" style="background-color: #212121;">
          <div class="container-fluid py-5">
            <h1 style="color: white" class="display-5 fw-bold">{{ selectedCompany.name }}</h1>
            <div class="rounded-circle float-end" style="height: 150px; width: 150px; background-position: center; background-size: cover; " v-bind:style="{ 'background-image': 'url(http://localhost:3030/' + selectedCompany.imageUrl + ')' }"></div>
          </div>
        </div>

        <div class="row py-5">
          <h2 class="col-6 fw-bold text-left">Меню: </h2>
          <span class="col-6 text-muted text-end">Показано {{ selectedCompany.foodMenu.length }}</span>
        </div>

        <div class="row">
          <div v-for="food in selectedCompany.foodMenu" :key="food._id" class="col-lg-3 col-md-4 col-sm-6">
            <div class="card text-center">
              <img :src="'http://localhost:3030/' + food.imageUrl" class="card-img-top" :alt="food.name">
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ food.name }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ food.price }}₴</li>
              </ul>
              <div class="card-body">
                <button class="btn btn-primary rounded-circle">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "CompanyView",
  setup() {
    const store = useStore()

    document.title = "Ресторан | Diamo Delivery";

    return {
      selectedCompany: computed(() => {
        let company = store.getters.selectedCompany

        if (company)
          document.title = company.name + " | Diamo Delivery";

        return company
      })
    }
  },
  mounted() {
    const store = useStore()

    store.dispatch('selectCompany', this.$route.params.id)


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
</style>