<template>
  <div>
    <li
      :class="{ completed: task.completed }"
      v-show="!task.completed || (showCompleted && task.completed)"
    >
      <div class="row">
        <span class="small-1">
          <input
            @click="changeCompleted()"
            type="checkbox"
            :checked="task.completed"
          />
        </span>
        <span class="small-8">{{ task.name }}</span>
        <router-link :to="'tasks/' + task.id" class="small-1 mini">
          <i class="fi-eye"></i>
        </router-link>
        <i @click="edit()" class="fi-pencil small-1 mini fixme"></i>
        <i @click="trash()" class="fi-trash small-1 mini"></i>
      </div>
      <div class="row mini">
        <span class="due column small-6">
          <i class="fi-flag"></i>
          {{ task.due }}
        </span>
        <span
          :class="{ created: task.created }"
          class="column small-6 text-right"
        >
          <i class="fi-calendar"></i>
          {{ task.created }}
        </span>
      </div>
    </li>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // props: ['task']
  props: {
    showCompleted: { type: Boolean },
    task: {
      type: Object,
      default: function() {
        return { id: 0 };
      },
      required: true
    }
  },
  methods: {
    changeCompleted() {
      this.task.completed = !this.task.completed;
      axios
        .put(process.env.VUE_APP_API_URL, this.task)
        .then(response => console.log(response.data))
        .catch(err => console.log(err));
    },
    edit() {
      this.$emit("editIconClicked", this.task);
    },
    trash() {
      this.$store.dispatch("deleteTask", this.task);
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: #4fc08d;
  border: 0;
}
.completed:hover {
  background: white;
  color: #4fc08d;
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
.mini {
  font-size: 0.85rem;
}
</style>
