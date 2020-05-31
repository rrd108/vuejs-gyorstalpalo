<template>
  <ul>
    <task :task="task" :showCompleted="true" />
  </ul>
</template>

<script>
import Task from "@/components/Task.vue"

export default {
  components: {
    Task
  },
  data() {
    return {
      task: this.$store.state.tasks.find(task => task.id == this.$route.params.id)
    }
  }
}
</script>

<style>

</style>