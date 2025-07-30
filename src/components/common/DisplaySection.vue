<script setup lang="ts">
//:: view
import AttributeUnit from './AttributeUnit.vue';
import LogButton from '../common/LogButton.vue';

//:: vue
//:: tsClass
import Section from '@/ts/Section';
//:: ts
//:: constant
//:: ref
//:: variable

interface Props {
  sections?: Array<Section>;
  choices?: Array<any>;
  imagePath?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sections: () => [],
  choices: () => [],
  imagePath: 'empty',
});
</script>

<template>
  <LogButton :keyValue="'sections'" :value="sections" />
  <div class="wrapper">
    <section v-for="(section, index) in sections">
      <h1 class="attribute-title">{{ section.name }} - {{ section.dataKey }}</h1>
      <table>
        <tr v-for="n in section.row">
          <td v-for="m in section.column">
            <div class="attribute-box" v-for="attribute in section.attributes">
              <div class="attribute-category">
                <h2 class="attribute-name">{{ attribute.name }}</h2>
                <p>{{ attribute.jsonKey }}</p>
              </div>
              <AttributeUnit
                :imagePath="imagePath"
                :currentChoice="choices[index]?.[m - 1 + (n - 1) * section.column] || {}"
                :attribute="attribute"
              />
            </div>
          </td>
        </tr>
      </table>
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
