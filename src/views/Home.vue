<template>
  <div>
    <h1>Home</h1>
    <form class="row">
      <input type="text" v-model="task" placeholder="Add new task" class="column small-7">
      <input type="date" @blur="addTask" v-model="due" class="column small-5">
    </form>
    <div class="row">
      <div class="column small-12">
        <div class="row">
          <i class="fi-check column small-2" @click="toogleCompleted" title="Kész feladatok elrejtése / megmutatása"></i>
          <div class="column small-10 text-right">
            <i class="fi-checkbox" title="nyitott">{{open}} </i>
            <i class="fi-flag" title="lejárt">{{overdueTasks.length}}</i>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <task @editIconClicked="edit" v-for="task in tasks" :key="task.id" :task="task" :showCompleted="showCompleted" />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import Task from "@/components/Task.vue"

export default {
  name: 'home',

  components: {
    Task
  },

  data() {
    return {
      showCompleted : true,
      task: '',
      due: (new Date((new Date).setDate((new Date).getDate() + 5))).toISOString().split('T')[0]
    }
  },

  computed: {
    ...mapGetters(['overdueTasks']),
    open: function() {
      return this.tasks.filter(task => !task.completed).length
    },
    tasks: function() {
      return this.$store.state.tasks
    }
  },

  methods: {
    addTask() {
      const task = {
        name: this.task,
        due: this.due,
        completed: false
      }
      axios.post(process.env.VUE_APP_API_URL, task)
        .then(response => {
          this.tasks.push(response.data)
          this.task = ''
          })
        .catch(err => console.log(err))
    edit(task) {
      this.task = task.name;
      this.due = task.due;
    },
    toogleCompleted() {
      this.showCompleted = !this.showCompleted
    }
  },
}
</script>

<style scoped>
h1 {
  background: #4fc08d;
  color: white;
  padding: 1rem;
  text-align: center;
}
input[type=text] {
  font-size: 1.5rem;
  height: 2.5rem;
}
</style>
