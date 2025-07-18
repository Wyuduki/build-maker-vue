<script setup lang="ts">
import { ref, computed } from 'vue';
import Home from './components/Home.vue';
import NotFound from './components/NotFound.vue';
import SectionMaker from './components/SectionMaker/SectionMaker.vue';

const routes: any = {
  '/': Home,
  '/sectionmaker': SectionMaker,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  console.groupEnd();
  console.group('page:' + (routes[currentPath.value.slice(1) || '/'] || NotFound).__name);
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
});
</script>

<template>
  <a href="#/">Home</a> | <a href="#/sectionmaker">SectionMaker</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
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
