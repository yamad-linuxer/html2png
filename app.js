const express = require('express');
const bodyParser = require('body-parser');
const h2i = require('node-html-to-image');

const app = express();
const port = 19810;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function putLog(msg, log) {
    const dt = new Date().toLocaleString('ja');
    console.log(' [ '+dt+' ] '+(
        log === undefined ? msg : msg+' :\n'+log
    ));
    return
};

app.get('/', (req,res)=> {
    res.send('The API is running');
});

app.post('/', async (req, res)=> {
    putLog('POST request received.');

    const sourceHtml = req.body.source;

    res.json({
        "png-base64": "poyopoyopoyopoyo",
        "png": "poyopoyo",
        "source": sourceHtml
    });
});

app.listen(port, ()=> {
    putLog('Ready.');
});
