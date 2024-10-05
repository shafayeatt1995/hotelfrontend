export const state = () => ({
  loadWishlist: false,
  items: [],
});

export const mutations = {
  SET_ITEMS(state, payload) {
    state.items = payload;
  },
  SET_LOAD_WISHLIST(state, payload) {
    state.loadWishlist = payload;
  },
};

export const actions = {
  async toggleWishlist(context, _id) {
    try {
      await this.$userApi.toggleWishlist({ _id });
    } catch (error) {}
  },
  async fetchWishlistOnce({ state, commit }) {
    if (this.$auth.$state.loggedIn) {
      const { loadWishlist } = state;
      if (!loadWishlist) {
        commit("SET_LOAD_WISHLIST", true);
        try {
          const { items } = await this.$userApi.fetchWishlist();
          commit("SET_ITEMS", items);
        } catch (error) {
          commit("SET_LOAD_WISHLIST", false);
          console.error(error);
        }
      }
    }
  },
  async refetchWishlist({ state, commit }) {
    try {
      const { items } = await this.$userApi.fetchWishlist();
      commit("SET_ITEMS", items);
    } catch (error) {
      console.error(error);
    }
  },
};

export const getters = {
  wishlists: ({ items }) => items,
};
