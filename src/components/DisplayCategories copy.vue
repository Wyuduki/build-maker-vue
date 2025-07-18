<script setup lang="ts">
import Category from '@/ts/Section';
import draggable from 'vuedraggable';

import { ref } from 'vue';

const props = defineProps({
  categories: Array<Category>,
});

console.log(props.categories);

const myArray = ref(['河野', '田中']);
</script>

<template>
  <draggable v-model="props.categories" group="people" item-key="id">
    <template #item="{ element }">
      <section>
        <p>{{ element }}</p>
        <!--<h1>{{ category.name }}</h1>
        <div v-for="attribute in category.attributes">
          <h2>{{ attribute.name }}</h2>
          <p>{{ attribute.jsonKey }}</p>
        </div>-->
      </section>
    </template>
  </draggable>
</template>

<style>
section {
  border: 1px solid white;
}
</style>
