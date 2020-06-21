import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
    overdueTasks: state =>
      state.tasks.filter(
        task => !task.completed && task.due < new Date().toISOString()
      )
  },
  mutations: {
    setTasks: (state, tasks) => (state.tasks = tasks)
  },
  actions: {
    getTasks: ({ commit }) => {
      axios
        .get(process.env.VUE_APP_API_URL)
        .then(response => commit("setTasks", response.data))
        .catch(err => console.log(err));
    }
  },
  modules: {}
});
