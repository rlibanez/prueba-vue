<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
export default {
  name: 'App'
};
</script>

<template>
  <header>
    <RouterLink to="/" class="nohover">
      <img alt="CIC logo" class="logo center" style="border-radius: 4em;" src="@/assets/cic.png" width="125"
        height="125" />
    </RouterLink>

    <div class="wrapper">
      <nav>
        <RouterLink class="navthing" to="/">Listado</RouterLink>
        <RouterLink class="navthing" to="/create">Crear</RouterLink>
        <RouterLink class="navthing" to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <router-view></router-view>

</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  background-color: #333;
  padding: 1rem;
  border-radius: 5em;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    white-space: nowrap;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 2rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
