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
            <i class="fi-flag" title="lejárt">{{overdue}}</i>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="task in tasks" :key="task.id" :class="{completed: task.completed}"
      v-show="!task.completed || (showCompleted && task.completed)">
        <div class="row">
          <span class="small-1">
            <input @click="changeCompleted(task.id)" type="checkbox" :checked="task.completed">
          </span>
          <span class="small-9">{{task.name}}</span>
          <i class="fi-pencil small-1 mini"></i>
          <i class="fi-trash small-1 mini"></i>
        </div>
        <div class="row mini">
          <span class="due column small-6">
            <i class="fi-flag"></i>
            {{task.due}}
          </span>
          <span :class="{created: task.created}" class="column small-6 text-right">
            <i class="fi-calendar"></i>
            {{task.created}}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',

  data() {
    return {
      showCompleted : true,
      task: '',
      tasks: [],
      due: (new Date((new Date).setDate((new Date).getDate() + 5))).toISOString().split('T')[0]
    }
  },

  computed: {
    open: function() {
      return this.tasks.filter(task => !task.completed).length
    },
    overdue: function() {
      return this.tasks.filter(task => !task.completed && task.due < new Date().toISOString()).length
    }
  },

  created() {
    axios.get(process.env.VUE_APP_API_URL)
      .then(response => this.tasks = response.data)
      .catch(err => console.log(err))
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
    },
    changeCompleted(id) {
      let task = this.tasks.find(task => task.id == id)
      task.completed = !task.completed
      axios.put(process.env.VUE_APP_API_URL, task)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    },
    toogleCompleted() {
      this.showCompleted = !this.showCompleted
    }
  },
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #4fc08d;
  border: 0;
}
.completed:hover {
  background: white;
  color: #4fc08d;
}
h1 {
  background: #4fc08d;
  color: white;
  padding: 1rem;
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  color: #333;
}
li {
  margin: 1rem;
  position: relative;
  top: 0.5em;
  border-bottom: 1px solid #4fc08d;
  padding: 10px 10px;
}
li:hover {
  background: #4fc08d;
  color: white;
  transition: 0.5s;
}
input[type=text] {
  font-size: 1.5rem;
  height: 2.5rem;
}
.mini {
  font-size: .85rem;
}
</style>
