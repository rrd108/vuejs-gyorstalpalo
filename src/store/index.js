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
    setTasks: (state, tasks) => (state.tasks = tasks),
    deleteTask: (state, task) =>
      (state.tasks = state.tasks.filter(t => t.id != task.id))
  },
  actions: {
    deleteTask: ({ commit }, task) => {
      axios
        .delete(process.env.VUE_APP_API_URL, { data: { id: task.id } })
        .then(response => commit("deleteTask", response.data))
        .catch(err => console.err(err));
    },
    getTasks: ({ commit }) => {
      axios
        .get(process.env.VUE_APP_API_URL)
        .then(response => commit("setTasks", response.data))
        .catch(err => console.err(err));
    }
  },
  modules: {}
});
