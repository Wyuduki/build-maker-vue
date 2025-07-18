<script setup lang="ts">
import DialogInput from './common/DialogInput.vue';
import LogButton from './common/logButton.vue';
import { logObject } from '@/ts/logger';
import { ref } from 'vue';

const projects = ref<string[]>([]);

const flagDialogInput = ref(false);

class Home {
  createProject(projectName: string) {
    projects.value.push(projectName);
    flagDialogInput.value = false;
    logObject({ projectName });
  }
}

const home = new Home();
</script>

<template>
  <h1>Home</h1>
  <LogButton keyValue="projects" :value="projects" />
  <menu>
    <li><button @click="flagDialogInput = true">作成</button></li>
    <!--<li>
      <button @click="home.setOp('update')">編集</button>
    </li>
    <li><button @click="home.setOp('delete')">削除</button></li>-->
  </menu>
  <ul>
    <li v-for="project in projects">
      <h1>{{ project }}</h1>
      <
    </li>
  </ul>
  <DialogInput
    :flag="flagDialogInput"
    @sbm="
      (value: string) => {
        home.createProject(value);
      }
    "
  />
</template>
