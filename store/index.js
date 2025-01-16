require("dotenv").config();
import axios from "axios";

export const state = () => ({
  baseUrl: process.env.BASE_URL,
  apiUrl: process.env.API_URL || "https://api.cholozai.com",
  windowWidth: 0,
  loadLocations: false,
  locations: [],
  loadProperties: false,
  properties: [],
  loadAccommodationType: false,
  accommodationType: [],
  loadFacilities: false,
  facilities: [],
  loadBeds: false,
  beds: [],
  searchData: { locations: [], properties: [] },
  districts: [],
  divisions: [],
});

export const mutations = {
  SET_WINDOW_WIDTH(state, payload) {
    state.windowWidth = payload;
  },
  SET_SEARCH(state, payload) {
    const { locations, properties } = payload;
    state.searchData = { locations, properties };
  },
  SET_LOCATION(state, payload) {
    state.locations = payload;
  },
  SET_LOAD_ACCOMMODATION(state, payload) {
    state.loadAccommodationType = payload;
  },
  SET_ACCOMMODATION_TYPE(state, payload) {
    state.accommodationType = payload;
  },
  SET_FACILITIES(state, payload) {
    state.facilities = payload.sort((a, b) => a.name.localeCompare(b.name));
  },
  SET_LOAD_FACILITIES(state, payload) {
    state.loadFacilities = payload;
  },
  SET_LOAD_LOCATION(state, payload) {
    state.loadLocations = payload;
  },
  SET_LOAD_BEDS(state, payload) {
    state.loadBeds = payload;
  },
  SET_BEDS(state, payload) {
    state.beds = payload;
  },
  setNavbarData(state, data) {
    const { districts, divisions } = data;
    state.districts = districts.sort((a, b) => a.name.localeCompare(b.name));
    state.divisions = divisions.sort((a, b) => a.name.localeCompare(b.name));
  },
};

export const actions = {
  windowWidth({ commit }) {
    commit("SET_WINDOW_WIDTH", window.innerWidth);
  },
  async getSearchData({ commit }, search) {
    try {
      const { locations, properties } =
        await this.$commonApi.fetchLocationsProperty({ search });
      commit("SET_SEARCH", { locations, properties });
    } catch (error) {
      console.error(error);
    }
  },
  async fetchAllLocationOnce({ state, commit }) {
    const { loadLocations } = state;
    if (!loadLocations) {
      commit("SET_LOAD_LOCATION", true);
      try {
        const { locations } = await this.$commonApi.fetchAllLocation();
        commit("SET_LOCATION", locations);
      } catch (error) {
        commit("SET_LOAD_LOCATION", false);
        console.error(error);
      }
    }
  },
  async fetchAllAccommodationTypeOnce({ state, commit }) {
    const { loadAccommodationType } = state;
    if (!loadAccommodationType) {
      commit("SET_LOAD_ACCOMMODATION", true);
      try {
        const { accommodationType } =
          await this.$commonApi.fetchAllAccommodationTypeOnce();
        commit("SET_ACCOMMODATION_TYPE", accommodationType);
      } catch (error) {
        commit("SET_LOAD_ACCOMMODATION", false);
        console.error(error);
      }
    }
  },
  async fetchAllFacilitiesOnce({ state, commit }) {
    const { loadFacilities } = state;
    if (!loadFacilities) {
      commit("SET_LOAD_FACILITIES", true);
      try {
        const { facilities } = await this.$commonApi.fetchAllFacilitiesOnce();
        commit("SET_FACILITIES", facilities);
      } catch (error) {
        commit("SET_LOAD_FACILITIES", false);
        console.error(error);
      }
    }
  },
  async fetchAllBedsOnce({ state, commit }) {
    const { loadBeds } = state;
    if (!loadBeds) {
      commit("SET_LOAD_BEDS", true);
      try {
        const { beds } = await this.$commonApi.fetchAllBedsOnce();
        commit("SET_BEDS", beds);
      } catch (error) {
        commit("SET_LOAD_BEDS", false);
        console.error(error);
      }
    }
  },
  async nuxtServerInit({ dispatch }) {
    await dispatch("fetchNavbarData");
  },
  async fetchNavbarData({ commit, state }) {
    try {
      // const res = await axios.get(`${state.apiUrl}/api/fetch/navbar`);
      // commit("setNavbarData", res.data);
    } catch (error) {
      console.error("Failed to fetch navbar data:", error);
    }
  },
};

export const getters = {
  baseUrl: (state) => state.baseUrl,
  apiUrl: (state) => state.apiUrl,
  urlApi: (state) => `${state.apiUrl}/api`,
  pageTitle: () => process.env.APP_NAME || "CholoZai",
  windowWidth: (state) => state.windowWidth,
  superAdmin: (state) =>
    (state.auth?.user?.isSuperAdmin && state.auth?.user?.type === "admin") ||
    false,
  admin: (state) =>
    ((state.auth?.user?.isAdmin || state.auth?.user?.isSuperAdmin) &&
      state.auth?.user?.type === "admin") ||
    false,
  manager: (state) => state.auth?.user?.isManager || false,
  owner: (state) => state.auth?.user?.isOwner || false,
  user: (state, getters) => {
    const { admin, manager, owner } = getters;
    return !admin && !manager && !owner && state.auth?.loggedIn;
  },
  hotelSlug: (state) => state.auth?.user?.hotel?.slug || "",
  isDev: () => process.env.NODE_ENV === "development",
  isMobile: (state) => state.windowWidth < 992,
  isOnlyMobile: (state) => state.windowWidth < 641,
  locations: (state) => state.locations,
  properties: (state) => state.properties,
  accommodationType: (state) => state.accommodationType,
  facilities: (state) => state.facilities,
  beds: (state) => state.beds,
  searchData: (state) => state.searchData,
  districts: (state) => state.districts,
  divisions: (state) => state.divisions,
  // authUser: (state) => state.auth.user,
  // authLoggedIn: (state) => state.auth.loggedIn,
  // authStrategy: (state) => state.auth.strategy,
};
