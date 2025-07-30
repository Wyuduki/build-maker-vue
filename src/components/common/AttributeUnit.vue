<script setup lang="ts">
import LogButton from '../common/LogButton.vue';
import { ref, watch } from 'vue';

import Attribute from '@/ts/Attribute';
import { logFunction, debugObject } from '@/ts/logger';

const DEFAULT = 'empty';

const props = defineProps(['imagePath', 'currentChoice', 'attribute']);

//const arrayLength = 1;
const arrayLength = ref(1);

watch(
  () => props.currentChoice[props.attribute.jsonKey],
  (c) => {
    debugObject('c', c);
    if (Array.isArray(props.currentChoice[props.attribute.jsonKey])) {
      arrayLength.value = props.currentChoice?.[props.attribute.jsonKey].length;
    } else {
      arrayLength.value = 1;
    }
    debugObject('arrayLength', arrayLength.value);
  },
);

class AttributeUnit {
  //@logFunction()
  returnValueWhetherArray(
    choice: Record<string, string> = {},
    attribute: Attribute,
    index: number,
  ): string {
    let result: string = '';
    let fileName: string = '';
    if (Array.isArray(choice[attribute.jsonKey])) {
      fileName = choice[attribute.jsonKey][index - 1];
    } else {
      fileName = choice[attribute.jsonKey];
    }
    debugObject('fileName', fileName);
    if (fileName == undefined || fileName == '') {
      return DEFAULT;
    } else {
      result += fileName;
    }

    return result;
  }
}

const attributeUnit = new AttributeUnit();
</script>

<template>
  <!--<LogButton :keyValue="'attribute.jsonKey'" :value="attribute.jsonKey" />
  <LogButton :keyValue="'currentChoice'" :value="currentChoice" />-->
  <div>
    <div v-for="l in arrayLength">
      <p v-if="attribute.text.need" class="attribute-unit" :class="attribute.text.size">
        {{ attributeUnit.returnValueWhetherArray(currentChoice, attribute, l) }}
      </p>
      <img
        v-if="attribute.img.need"
        :style="{ width: attribute.img?.width + 'px', height: attribute.img?.height + 'px' }"
        :src="
          imagePath +
          attribute.img?.path +
          '\\' +
          attributeUnit.returnValueWhetherArray(currentChoice, attribute, l) +
          attribute.img?.type
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
