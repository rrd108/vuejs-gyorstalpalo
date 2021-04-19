<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
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
