import { createStore } from 'vuex'
import location from "@/store/location";
import companies from "@/store/companies";

export default createStore({
  strict: true,
  modules: {
    location,
    companies
  }
})
