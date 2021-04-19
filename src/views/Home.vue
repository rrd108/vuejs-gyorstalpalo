<template>
  <div>
    <h1>Home</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id" :class="{completed: task.completed}">
        <input @click="changeCompleted(task.id)" type="checkbox" :checked=task.completed>
        {{task.name}} - {{task.due}}
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
      tasks: [],
    }
  },

  created() {
    axios.get(process.env.VUE_APP_API_URL)
      .then(response => this.tasks = response.data)
      .catch(err => console.log(err))
  },

  methods: {
    changeCompleted(id) {
      let task = this.tasks.find(task => task.id == id)
      task.completed = !task.completed
      axios.put(process.env.VUE_APP_API_URL, task)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    },
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
</style>
