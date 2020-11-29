<template>
  <div id="app">
    <img class="logo" alt="Logo" src="./assets/images/malekai.svg">
    <div id="nav">
      <router-link to="/">Disciplines</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  filter: drop-shadow(0px 10px 10px #4f4444);
  padding: 10px;
  height: 200px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: black;
    }
  }
}
</style>
