import { createStore } from 'vuex'
import location from "@/store/location";
import companies from "@/store/companies";
import auth from "@/store/auth";

export default createStore({
  strict: true,
  modules: {
    location,
    companies,
    auth
  }
})
