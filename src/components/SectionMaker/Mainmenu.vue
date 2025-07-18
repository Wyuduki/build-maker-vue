<!-- <script setup lang="ts" src="https://unpkg.com/axios/dist/axios.min.js"> -->
<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue';
import axios from 'axios';

import DialogInput from '../common/DialogInput.vue';

const props = defineProps(['sections']);
const loadInput: any = useTemplateRef('loadInput');

const emit: (event: 'sbm', ...args: any[]) => void = defineEmits(['sbm']);

const flagDialogInput = ref(false);

let text = '';
const folderPath = '\\..\\..\\data\\';

function eventChange(e: any) {
  console.debug(e.target!.files[0]);
  let reader = new FileReader();
  reader.onload = (e) => {
    const tmp: any = e.target!.result;
    console.debug(JSON.parse(tmp));
    emit('sbm', JSON.parse(tmp));
  };
  reader.readAsText(e.target!.files[0]);
}

async function fetchData() {
  console.debug('tstata');
  console.debug(props.sections);
  console.debug(text);
  // try {
  //   const response = await fetch('./src/common.php', {
  //     // const response = await fetch('https://example.com/api/data', {
  //     method: 'POST',
  //     body: props.comps,
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // } catch (error) {
  //   console.error(error);
  // }
  // axios
  //   .get('./common.php')
  //   .then((response) => {
  //     console.log('then');
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log('catch');
  //     console.log(error);
  //   });
  try {
    //エラーが発生する可能性のあるコードのブロックをtry、erroerで実行
    const response = await axios.post('./../php/save.php', {
      // 'await' を使って非同期関数の完了を待つ。axios.post は、引数として指定されたURL ('register.php') に POST リクエストを行う
      //  email: 'email', //ユーザーが入力した内容（email: はオブジェクトのプロパティ名という意味）をPHPに送信
      //  password: 'password', //axiosを使用すると、オブジェクトはデフォルトでJSON形式に変換されて、HTTPリクエストのボディとして送信される
      sectionsData: props.sections,
      fileName: text,
      folderPath: folderPath,
    }); //ここまでのPHPでの処理結果をresponseに格納
    //await キーワードのおかげで、axios.post の結果が返ってくるまで処理が待たされ、その結果を次のif文で処理できる

    if (response.data.success) {
      // // レスポンスのデータに 'success' プロパティが含まれているかどうかをチェックし、処理
      //data：response オブジェクトのプロパティで、サーバーから返された実際のデータを含んでいる。PHPスクリプトによって生成されたJSONレスポンスを参照することになるという意味
      //PHPで設定した「$data」 がエンコードされて送られてきた結果を受け取る
      alert('登録成功！' + response.data.message);
    } else {
      alert('エラー: ' + response.data.message);
    }
  } catch (error) {
    //例外が発生した場合
    console.error('APIエラー:', error);
  }
}
</script>

<template>
  <menu>
    <li><button @click="flagDialogInput = true">保存</button></li>
    <li><button @click="loadInput.click()">開く</button></li>
  </menu>
  <input ref="loadInput" @change="eventChange" class="none" type="file" />
  <DialogInput
    :flag="flagDialogInput"
    @sbm="
      (value: string) => {
        text = value;
        fetchData();
        flagDialogInput = false;
      }
    "
  />
</template>

<style></style>
