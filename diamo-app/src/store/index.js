import { createStore } from 'vuex'
import location from "@/store/location";

export default createStore({
  strict: true,
  modules: {
    location
  }
})
