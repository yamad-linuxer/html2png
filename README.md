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

JSONをPOSTしてください。

```
{
    "source": "<!--実際のソース-->",
    "width": 1234,
    "height": 4321
}
```

### 受信

JSONが帰ってきます。

```
{
    "png-base64": "data:image/png;base64,ABC114514GG",
    "source": "<!--ソースがそのまま帰ってきます-->",
    "width": 1234,
    "height: 4321
}
```
