<?php
header('Access-Control-Allow-Origin: *');//ブラウザ（オリジン）からのリクエストを許可するために使用。
header('Access-Control-Allow-Methods: POST');// 許可されるHTTPメソッドを制御。この場合、POSTメソッドのみが許可される。
header('Content-Type: application/json; charset=UTF-8');// レスポンスのコンテンツタイプを設定（レスポンスはJSON形式で、文字エンコーディングはUTF-8）。

$data = json_decode(file_get_contents("php://input"));// "php://input"は非標準の入力ストリームとして、ブラウザからのPOSTリクエストなどで送信された生のデータを読み取ることができる。

if (isset($data->data) && isset($data->folderPath)) {

  $rmFolderPath = __DIR__ . $data->folderPath . $data->data;
  if(file_exists($rmFolderPath)) {
    rmdir($rmFolderPath);
  }
  echo json_encode(['success' => true, 'message' => $newFolderPath]);// JavaScript側はJSON形式でデータを簡単に解析・利用できるため、APIやサーバーからのレスポンスとしてJSONを使用するのが一般的。
} else {
  echo json_encode(['success' => false, 'message' => '無効なデータ']);
}
?>