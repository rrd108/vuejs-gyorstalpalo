<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/stats">Stats</router-link> |
      <router-link to="/login" v-if="!loggedIn" class="fixme"
        >Login</router-link
      >
      <router-link to="/logout" v-if="loggedIn">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      loggedIn: false
    };
  },

  created() {
    this.$store.dispatch("getTasks");
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Quicksand:500");
@import url("./assets/foundation.min.css");
@import url("./assets/foundation-icons.css");

#app {
  font-family: "Quicksand", sans-serif;
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

.fixme {
  color: #ccc !important;
}
</style>
