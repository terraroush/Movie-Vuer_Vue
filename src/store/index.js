import Vue from "vue";
import Vuex from "vuex";

// TODO: Delete this later
import { FAKE_SEARCH_RESULTS, FAKE_MOVIE_DETAILS } from "./FAKE_DATA";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchTerm: "home alone",
    searchResults: FAKE_SEARCH_RESULTS,
    movieDetails: FAKE_MOVIE_DETAILS,
    reviews: [],
  },
  mutations: {},
  actions: {},
  modules: {},
});
