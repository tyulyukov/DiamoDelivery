export default {
  state: {
    companies: null,
    selectedCompany: null
  },
  getters: {
    companies: (state) => state.companies,
    selectedCompany: (state) => state.selectedCompany
  },
  mutations: {
    companies: (state, data) => state.companies = data,
    selectedCompany: (state, data) => state.selectedCompany = data
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    getCompanies({state, commit, dispatch}, callback = null) {
      if (state.companies != null)
        return

      fetch('http://localhost:3030/companies', {
        method: "GET"
      })
          .then(res => res.json())
          .then(res => {
            commit("companies", res)
            if (callback != null)
              callback(res)
          })
          .catch(err => console.error(err))
    },

    // eslint-disable-next-line no-unused-vars
    async selectCompany({state, commit, dispatch}, data) {
      dispatch('getCompanies', function(companies) {
        for (const company of companies) {
          if (company._id.toString() == data.toString()) {
            commit('selectedCompany', company)
            return
          }
        }
      })
    }
  },
}