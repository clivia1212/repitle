const Koa = require('koa');
const superagent= require('superagent');
const cheerio = require('cheerio');


const app = new Koa();

/**
 * 目标数据处理
 */
const INFO = [
  { key: 'number', name: '编号', tr: 0, td: 1 },
  { key: 'name', name: '用地名称', tr: 6, td: 0 },
  { key: 'position', name: '位置', tr: 0, td: 5 },
  { key: 'area', name: '面积', tr: 6, td: 1 },
  { key: 'value', name: '价值', tr: 7, td: 3 },
  { key: 'sellYear', name: '出让年限', tr: 1, td: 1 },
];

const getInfos = (target) => {
  let infos = [];
  let $ = cheerio.load(target);

  $('table').each((idx, el) => {
    const $trs = $(el).find('tr');
    const info = {};

    INFO.forEach(item => {
      // console.log(item, 'item');
      const $cell = $trs.eq(item.tr).find('td').eq(item.td);

      console.log($cell.text(), 'text');
      info[item.key] = $cell.text();
    });

    infos.push(info);
  });

  return infos;
}

/**
 * 请求目标页面
 */
// https://api.landchina.com/tGygg/transfer/detail?gyggGuid=4bff6053-a807-41ce-91ac-326469234b5a
superagent
  .post('https://api.landchina.com/tGygg/transfer/detail')
  .send({ gyggGuid: '4bff6053-a807-41ce-91ac-326469234b5a' })
  // .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) {
      console.log(err);
    } else {
      const code = res.body.code;

      if (code === 200) {
        const htmls = res.body.data.gyggNr || '';
        console.log(res.body.data.city, 'city');
        console.log(res.body.data.ggLx, 'ggLx');
        console.log(res.body.data.gyggBt, 'gyggBt');
        console.log(res.body.data.xzqDm, 'xzqDm');

        



        // const infos = getInfos(htmls);
        // console.log(JSON.stringify(infos), 'infos');
      } else {
        console.error(`请求失败！状态码：${code}`);
      }
    }
  });

app.use(async ctx => {
  // ctx.body = 'Hello koa';
  ctx.body = 'test';
});

app.listen(3000);
