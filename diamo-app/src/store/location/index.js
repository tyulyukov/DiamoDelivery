export default {
  state: {
    city: '',
  },
  getters: {
    city: (state) => state.city
  },
  mutations: {
    city: (state, data) => state.city = data
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    getCity({state, commit, dispatch}) {
      if (state.city != '')
        return

      fetch('https://geolocation-db.com/json/', {
        method: "GET"
      })
          .then(res => res.json())
          .then(res => commit('city', res.city))
          .catch(err => console.error(err))
    }
  },
}