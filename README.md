# the Html To Png(base64) API
即席API
中でChromiumが走ってます

# How To
```
$ git clone https://github.com/yamad-linuer/html2png

$ cd html2png

$ npm i

$ node app.js

```

# API

## 送信
JSONをPOSTしてください。
```
{
    "source": "<!--実際のソース-->",
    "width": 1234,
    "height": 4321
}
```

## 受信
JSONが帰ってきます。
```
{
    "png-base64": "data:image/png;base64,ABC114514GG",
    "width": 1234,
    "height: 4321,
    "source": "<!--ソースがそのまま帰ってきます-->"
}
```
