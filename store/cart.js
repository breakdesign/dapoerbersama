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
  addQtyCart(state, index) {
      state.dataCart[index].quantity += 1;
  },
  minusQtyCart(state, index) {
    if(state.dataCart[index].quantity - 1 <= 0) {
      state.dataCart.splice(index, 1)
    } else {
      state.dataCart[index].quantity -= 1;
    }
  },
  removeItem(state, index) {
    state.dataCart.splice(index, 1)
  },
};

const getters = {
  
};

// variable action berfungsi untuk mengoprasikan data dari API mulai dari:
const actions = {
  async setCart({ commit }, data) {
    commit('setState', data);
  },
  async addQty({ commit }, data) {
    commit('addQtyCart', data);
  },
  async minusQty({ commit }, data) {
    commit('minusQtyCart', data);
  },
  async removeItem({ commit }, data) {
    commit('removeItem', data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
