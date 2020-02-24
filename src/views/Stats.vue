<template>
  <div>
    <h1>Stats</h1>
    <div class="row">
      <div class="column small-5 w1">
        <h2>{{$store.state.tasks.length}}</h2>
        <i class="fi-list-thumbnails">Összes</i>
      </div>
      <div class="column small-5 w2">
        <h2>{{$store.state.tasks.filter(task => task.completed).length}}</h2>
        <i class="fi-list-thumbnails">Kész</i>
      </div>
      <div class="column small-5 w3">
        <h2>{{$store.state.tasks.filter(task => !task.completed).length}}</h2>
        <i class="fi-list-thumbnails">Nyitva</i>
      </div>
      <div class="column small-5 w4">
        <h2>{{overdueTasks.length}}</h2>
        <i class="fi-list-thumbnails">Lejárt</i>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Stats',
  computed: mapGetters(['overdueTasks'])
}
</script>

<style scoped>
h1 {
  background: #4fc08d;
  color: white;
  padding: 1rem;
  text-align: center;
}
div.row div.column {
  color: #fff;
  padding: 1rem;
  margin: 1rem;
}
.w1 {
  background: #5a3bb3;
}
.w2 {
  background: #0192A5;
}
.w3 {
  background: #CD4C26;
}
.w4 {
  background: #EA8906;
}
</style>
