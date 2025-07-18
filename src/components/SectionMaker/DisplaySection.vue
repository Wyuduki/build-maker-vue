<script setup lang="ts">
import Attribute from '@/ts/Attribute';
import Section from '@/ts/Section';

const props = defineProps({
  sections: Array<Section>,
});

console.log(props.sections);
</script>

<template>
  <div class="wrapper">
    <section v-for="section in sections">
      <h1 class="attribute-title">{{ section.name }}</h1>
      <div class="attribute-box" v-for="attribute in section.attributes">
        <div class="attribute-category">
          <h2 class="attribute-name">{{ attribute.name }}</h2>
          <p>{{ attribute.jsonKey }}</p>
        </div>
        <p class="attribute-unit" :class="attribute.size">具体名</p>
        <img
          v-if="attribute.img.need"
          :style="{ width: attribute.img.width + 'px', height: attribute.img.height + 'px' }"
          src=""
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}

section {
  width: fit-content;
  border: 1px solid white;

  & .attribute-title {
    display: block;
    width: fit-content;
  }
  & .attribute-box {
    display: inline-block;
    width: fit-content;
    min-width: 300px;
    position: relative;
    border: 1px solid white;
    padding: 15px 5px 5px 5px;
    margin: 10px;
  }
  & .attribute-category {
    top: -10px;
    left: 10px;
    position: absolute;
    background-color: black;
    & > * {
      display: inline-block;
    }
  }
  & .attribute-name {
    font-size: small;
  }
  & .attribute-unit {
    /*display: inline-block;*/
  }
}

img {
  border: 1px gainsboro dotted;
}
</style>
