<!-- <script setup lang="ts" src="https://unpkg.com/axios/dist/axios.min.js"> -->
<script setup lang="ts">
// view
//import DialogInput from '../common/DialogInput.vue';
// vue
import { useTemplateRef, ref } from 'vue';
// ts
import axios from 'axios';
import { FetchData } from '@/ts/FetchData';
import { debugObject, logFunction } from '@/ts/logger';

const props = defineProps(['sections', 'projectName']);

const loadInput: any = useTemplateRef('loadInput');

const emit: (event: 'sbm', ...args: any[]) => void = defineEmits(['sbm']);

//const flagDialogInput = ref(false);

const folderPath = '\\..\\..\\data\\save\\';

class Mainmenu {
  @logFunction()
  save() {
    debugObject('folderPath', folderPath + props.projectName + '\\');
    new FetchData().fetchData(
      'save',
      folderPath + props.projectName + '\\',
      'save',
      props.sections,
    );
  }

  @logFunction()
  eventChange(e: any) {
    debugObject('e.targetFile', e.target!.files[0]);
    let reader = new FileReader();
    reader.onload = (e) => {
      const loadResult: any = e.target!.result;
      debugObject('loadResult', JSON.parse(loadResult));
      emit('sbm', JSON.parse(loadResult));
    };
    reader.readAsText(e.target!.files[0]);
  }
}

const mainmenu = new Mainmenu();
</script>

<template>
  <menu>
    <li><button @click="mainmenu.save">保存</button></li>
    <li><button @click="loadInput.click()">開く</button></li>
  </menu>
  <input ref="loadInput" @change="mainmenu.eventChange" class="none" type="file" />
</template>

<style></style>
