<template>
  <DiamoHeader style="background-color: #212121;"/>
  <router-view/>
  <DiamoFooter/>
</template>

<script>
import DiamoHeader from "@/components/DiamoHeader";
import DiamoFooter from "@/components/DiamoFooter";

export default {
  name: 'App',
  components: {DiamoFooter, DiamoHeader},
  created() {
    document.title = "Diamo Delivery";
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #6d6d6d;
}
</style>
