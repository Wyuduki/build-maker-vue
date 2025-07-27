<?php
header('Access-Control-Allow-Origin: *');//ブラウザ（オリジン）からのリクエストを許可するために使用。
header('Access-Control-Allow-Methods: POST');// 許可されるHTTPメソッドを制御。この場合、POSTメソッドのみが許可される。
header('Content-Type: application/json; charset=UTF-8');// レスポンスのコンテンツタイプを設定（レスポンスはJSON形式で、文字エンコーディングはUTF-8）。

$data = json_decode(file_get_contents("php://input"));// "php://input"は非標準の入力ストリームとして、ブラウザからのPOSTリクエストなどで送信された生のデータを読み取ることができる。

if($data->data == "loadFolder") {
  loadFolder();
} elseif($data->data == "loadFile") {
  loadFile();
} else {
  echo json_encode(['success' => false, 'message' => 'error']);
}

function loadFile() {
  global $data;
  $target = __DIR__ . $data->folderPath . $data->fileName . ".json";
  $result = file_get_contents($target);
  echo json_encode(['success' => true, 'message' => $result]);// JavaScript側はJSON形式でデータを簡単に解析・利用できるため、APIやサーバーからのレスポンスとしてJSONを使用するのが一般的。
}

// index.htmlで使用中
function loadFolder() {
  echo json_encode(['success' => false, 'message' => 'error']);
  $files = glob($_GET["file"]);
  $links = array();
  
  for ($i = 0; $i < count($files); $i++) {
      // fileを1つ取得
       $target_file = $files[$i];
      // 取得した１つのファイルから読み込み、$textsへ格納
      $texts = file_get_contents($target_file);
      array_push($links, $texts);
      // 書き出す
      //file_put_contents($i ."sample.txt", $texts);
  }
  echo json_encode($links);

}
?>