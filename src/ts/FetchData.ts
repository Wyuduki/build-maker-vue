import axios from 'axios';
import { logFunction } from './logger';

export class FetchData {
  //@logFunction()
  async fetchData<T>(fileName: string, folderPath: string, php: string, data: T) {
    try {
      //エラーが発生する可能性のあるコードのブロックをtry、erroerで実行
      const response = await axios.post('./../php/' + php + '.php', {
        // 'await' を使って非同期関数の完了を待つ。axios.post は、引数として指定されたURL ('register.php') に POST リクエストを行う
        //  email: 'email', //ユーザーが入力した内容（email: はオブジェクトのプロパティ名という意味）をPHPに送信
        //  password: 'password', //axiosを使用すると、オブジェクトはデフォルトでJSON形式に変換されて、HTTPリクエストのボディとして送信される
        data: data,
        fileName: fileName,
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
      return Promise.resolve(response.data.message);
    } catch (error) {
      //例外が発生した場合
      console.error('APIエラー:', error);
      return Promise.reject('error');
    }
  }
}
