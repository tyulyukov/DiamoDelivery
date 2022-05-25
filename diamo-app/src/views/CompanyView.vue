<template>
  <DiamoHeader style="background-color: #212121;"/>

  <main class="py-5 mt-5">
    <section class="py-3">
      <div class="container">
        {{this.$route.params}}
      </div>
    </section>
  </main>

  <DiamoFooter/>
</template>

<script>
import DiamoHeader from "@/components/DiamoHeader";
import DiamoFooter from "@/components/DiamoFooter";

export default {
  name: "CompanyView",
  components: {DiamoFooter, DiamoHeader},
  setup() {
    document.title = " | Diamo Delivery";

    return {

    }
  },
}
</script>