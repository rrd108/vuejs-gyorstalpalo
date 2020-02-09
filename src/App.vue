<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login" v-if="!loggedIn">Login</router-link>
      <router-link to="/logout" v-if="loggedIn">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand:500');
@import url('./assets/foundation.min.css');
@import url('./assets/foundation-icons.css');

#app {
  font-family: 'Quicksand', sans-serif;
}

#nav {
  text-align: center;
  padding-top: 20px;
}

#nav a {
  color: #35495e;
  padding: 10px;
  font-size: 25px;
}
</style>

<script>
export default {
  data() {
    return {
      loggedIn : false
    }
  }
}
</script>