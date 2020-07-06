const puppeteer = require('puppeteer');
const Cluster = require('puppeteer-cluster').Cluster;
const handlebars = require('handlebars');

module.exports = async options => {
    const {
        html,
        content,
        puppeteerArgs = {},
    } = options
    if (!html) throw Error('You must provide an html property.');
  
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions: { ...puppeteerArgs, headless: true },
    });
  
    let buffers = []
  
    await cluster.task(async ({ page, data: {content}}) => {
        buffers.push(await (async (page, {
                content,
                html,
                transparent = false,
                waitUntil = 'networkidle0',
            })=> {
                if (content) {
                  const template = handlebars.compile(html)
                  html = template(content)
                }
                await page.setContent(html, { waitUntil })
                const element = await page.$('body')
                const buffer = await element.screenshot({omitBackground: transparent})
  
                return buffer
            })(page, { ...options, content})
        );
    });
  
    [{...content}].forEach(content => {
        const {...pageContent} = content
        cluster.queue({content: pageContent})
    });
  
    await cluster.idle();
    await cluster.close();
  
    return buffers[0]
};
