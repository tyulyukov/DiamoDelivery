<template>
  <div style="cursor: pointer" class="card company-card">
    <div class="card-img-top company-img" v-bind:style="{ 'background-image': 'url(http://localhost:3030/' + company.imageUrl + ')' }"></div>
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ company.name }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyCard",
  props: {
    company: Object
  }
}
</script>

<style scoped>
.company-card:hover .company-img {
  background-size: 110% 110%;
}

.company-img {
  background-size: 100% 100%;
  background-position: center;
  width: 100%;
  height: 180px;
  transition: background-size .15s ease-in;
}
</style>