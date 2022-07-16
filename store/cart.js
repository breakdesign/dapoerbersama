const state = () => ({
  dataCart: [],
});

const mutations = {
  setState(state, value) {
    let findIndexData = state.dataCart.findIndex((data) => data.id === value.id)
    if(findIndexData > -1) {
      state.dataCart[findIndexData].quantity += 1;
    } else {
      state.dataCart.push({
        ...value,
        quantity: 1
      })
    }
  },
};

const getters = {
  
};

// variable action berfungsi untuk mengoprasikan data dari API mulai dari:
const actions = {
  async setCart({ commit }, data) {
    commit('setState', data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
