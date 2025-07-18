<?php
//※下記は通信を行うjs、phpが双方のファイルが「example.com（仮）」に置いてあれば、これらのheaderは不要だが、他のオリジン「test.com」から通信を行う場合は必須
header('Access-Control-Allow-Origin: *');//ブラウザ（オリジン）からのリクエストを許可するために使用。
//'*' はすべてのオリジンからのリクエストを許可することを意味しているが、「http://example.com」のような指定も可能
header('Access-Control-Allow-Methods: POST');// 許可されるHTTPメソッドを制御。この場合、POSTメソッドのみが許可される。
header('Content-Type: application/json; charset=UTF-8');// レスポンスのコンテンツタイプを設定（レスポンスはJSON形式で、文字エンコーディングはUTF-8）。

$data = json_decode(file_get_contents("php://input"));// "php://input"は非標準の入力ストリームとして、ブラウザからのPOSTリクエストなどで送信された生のデータを読み取ることができる。
// この例では、送信されたJSONデータをPHPのオブジェクトまたは配列に変換するために、json_decode()関数が使用されている。

//if (isset($data->sectionsData) && isset($data->folderPath)) {
if (isset($data->sectionsData) && isset($data->fileName) && isset($data->folderPath)) {
//if (1) {

  $filePath = __DIR__ . $data->folderPath . $data->fileName . ".json";
  if(!file_exists($data->folderPath)) {
    mkdir(__DIR__ . $data->folderPath, 0777, true);
  //  //echo "folder not found!\n";
  //  //echo "\n";
    file_put_contents($filePath, json_encode($data->sectionsData));
  } else {
    file_put_contents($filePath, json_encode($data->sectionsData));
  //  //echo "clear!\n";
  //  //echo "\n";

  }
    // 実際のアプリケーションでDB登録や検証を行う処理をここに追加。
    // 今回はデモとして常に成功を返すようにしている。
    echo json_encode(['success' => true, 'message' => $filePath]);// JavaScript側はJSON形式でデータを簡単に解析・利用できるため、APIやサーバーからのレスポンスとしてJSONを使用するのが一般的。
} else {
    echo json_encode(['success' => false, 'message' => '無効なデータ']);
}
?>