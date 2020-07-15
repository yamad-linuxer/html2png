# the Html To Png(base64) API

即席API

/usr/bin/chromiumを使います

## How To

デフォルトのポートは`19810`です。

```
$ git clone https://github.com/yamad-linuer/html2png

$ cd html2png

$ npm i

$ node app.js
```

## API

### 送信

JSONをPOSTまたはGETしてください。

urlとsourceはどちらかが必須で，両方指定されていたらsourceが優先されます。

```
{
    "source": "<!--実際のソース-->",
    "url": "https://hogehoge.com/hoge.php",
    "width": 1234,
    "height": 4321
}
```

### 受信

JSONが帰ってきます。

url指定された場合はsourceを返しません。

```
{
    "png-base64": "data:image/png;base64,ABC114514GG",
    "source": "<!--ソースがそのまま帰ってきます-->",
    "url": "https://hogehoge.com/hoge.php",
    "width": 1234,
    "height: 4321
}
```
