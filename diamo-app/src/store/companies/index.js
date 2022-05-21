export default {
  state: {
    companies: null,
  },
  getters: {
    companies: (state) => state.companies
  },
  mutations: {
    companies: (state, data) => state.companies = data
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    getCompanies({state, commit, dispatch}) {
      if (state.companies != null)
        return

      fetch('http://localhost:3030/companies', {
        method: "GET"
      })
          .then(res => res.json())
          .then(res => commit("companies", res))
          .catch(err => console.error(err))
    }
  },
}