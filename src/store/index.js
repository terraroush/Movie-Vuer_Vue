import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchTerm: "",
    searchResults: [],
    movieDetails: null,
    reviews: [],
    notification: null,
  },
  mutations: {
    setSearchTerm(state, payload) {
      state.searchTerm = payload;
    },
    setSearchResults(state, payload) {
      state.searchResults = payload;
    },
    setMovieDetails(state, payload) {
      state.movieDetails = payload;
    },
    setMovieReviews(state, payload) {
      state.reviews = payload;
    },
    setNotification(state, payload) {
      state.notification = payload;
    },
  },
  actions: {
    async searchMovies({ commit, dispatch }, payload) {
      const apiBaseUrl = "https://api.themoviedb.org/3";
      const apiKey = process.env.VUE_APP_MOVIE_API_KEY;
      const url = `${apiBaseUrl}/search/movie?query=${payload}&api_key=${apiKey}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw Error("Unable to search");
        }
        const data = await res.json();
        commit("setSearchTerm", payload);
        commit("setSearchResults", data);
        commit("setMovieDetails", null);
        commit("setMovieReviews", null);
      } catch (error) {
        dispatch("showToast", "Unable to search");
      }
    },
    async selectMovie({ commit }, movie) {
      const apiBaseUrl = "https://api.themoviedb.org/3";
      const apiKey = process.env.VUE_APP_MOVIE_API_KEY;
      const movieDetailsUrl = `${apiBaseUrl}/movie/${movie.id}?api_key=${apiKey}`;
      const movieReviewsUrl = `${apiBaseUrl}/movie/${movie.id}/reviews?api_key=${apiKey}`;

      // get movie details
      const detailsRes = await fetch(movieDetailsUrl);
      const details = await detailsRes.json();
      commit("setMovieDetails", details);

      // get movie reviews
      const reviewsRes = await fetch(movieReviewsUrl);
      const reviewData = await reviewsRes.json();
      commit("setMovieReviews", reviewData.results);
    },
    showToast({commit}, message) {
      commit("setNotification", message)
      setTimeout(() => {
        commit("setNotification", null)
      }, 3000)
    }
  },
  modules: {},
  getters: {
    viewableMovies(state) {
      if (!state.searchResults.results) {
        return [];
      }
      return state.searchResults.results.filter((movie) => !!movie.poster_path);
    },
  },
});
