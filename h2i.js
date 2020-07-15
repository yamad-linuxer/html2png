const puppeteer = require('puppeteer');
const Cluster = require('puppeteer-cluster').Cluster;
const handlebars = require('handlebars');

module.exports = async options => {
    const {
        html,
        url,
        content,
        output,
        vp,
        puppeteerArgs = {}
    } = options;
    // if (!html) throw Error('You must provide an html property.');

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        puppeteerOptions: {...puppeteerArgs}
    });

    let buffers = [];

    await cluster.task(async ({page, data: {content, output}}) => {
    buffers.push(await (async (page, {
            output,
            content,
            html,
            transparent = false,
            waitUntil = 'networkidle0'
        })=> {
            if (content) {
                const template = handlebars.compile(html);
                html = template(content);
            };
            if (url) {
                await page.goto(url, { waitUntil });
            } else {
                await page.setContent(html, { waitUntil });
            }
            await page.setViewport({width:vp[0],height:vp[1]});
            const element = await page.$('body');
            const buffer = await element.screenshot({path: output, omitBackground: transparent});

            return buffer
        })(page, {...options, content, output}));
      });

      const shouldBatch = Array.isArray(content);
      const contents = shouldBatch ? content : [{...content, output}];

      contents.forEach(content => {
            const {output, ...pageContent} = content;
            cluster.queue({output, content: pageContent});
      });

      await cluster.idle();
      await cluster.close();

      return shouldBatch ? buffers : buffers[0];
};
