<script setup lang="ts">
//:: view

//:: vue
import { RouterLink, RouterView } from 'vue-router';
//:: tsClass
//:: ts
//:: constant
//:: ref
//:: variable
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  place-items: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

menu {
  list-style-type: none;
  display: flex;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    /*display: block;*/
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    place-items: center;
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
