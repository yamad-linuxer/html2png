const express = require('express');
const bodyParser = require('body-parser');
const h2i = require('./h2i.js');

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
    const resWidth = req.body.width;
    const resHeight = req.body.height;

    const img = await h2i({
        html: sourceHtml,
        vp: [resWidth,resHeight],
        puppeteerArgs: {
            executablePath: '/usr/bin/chromium',
            headless: true
        }
    });
    const bImg = new Buffer.from(img);
    res.json({
        "png-base64": 'data:image/png;base64,'+bImg.toString('base64'),
        // "png": bImg.toString('binary'),
        "source": sourceHtml
    });
});

app.listen(port, ()=> {
    putLog('Ready.');
});
