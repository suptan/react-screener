const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
// const commaNum = require('comma-number');
const { stopwatch } = require('durations');
const async = require('async');
const cal = require('./api/calculator');
const screener = require('./api/screener.js');
const ft = require('./api/fileTranformer.js');

const app = express();

app.use(cors());

app.get('/api/scrape', (req, res) => {
  const codeList = screener.givenArray();
  const result = [];

  async.map(codeList, (scode, next) => {
    // console.log(`Task ${scode}`);
    const sw = stopwatch();
    const url = `https://www.set.or.th/set/companyhighlight.do?symbol=${scode}&ssoPageId=5&language=en&country=US`;

    sw.reset();
    // Starts the stopwatch from where it was last stopped.
    sw.start();

    request(url, (error, response, html) => {
      if (!error) {
        result.push(exteacted(scode, html));
      }

      sw.stop();
      // console.log(`${scode} ${sw} have elapsed`);
      next(false, scode);
    });
  }, (err, scode) => {
    // if (err) console.log('Error is', err, scode);
    res.json({ response: result });
  });

  // End app
  // result will be the same as initialize state
  // becuase async
  // console.log('End with', result);
  // res.send(result);
});

app.get('/api/jitscrape', (req, res) => {
  const obj = JSON.parse(fs.readFileSync('file.txt', 'utf8'));

  const company = ft.parse(obj);
  const result = cal.measureCoPerf(company);

  res.json(result);
});

function exteacted(scode, html) {
  // console.log('call successfully');
  const $ = cheerio.load(html);

  let finData = {};
  let divide = 1;

  // Find finance table
  $('.table-info').filter(() => {
    // Find latest Quater
    $('thead').first().filter(() => {
      const elements = $(this).find('th').get().reverse();
      $(elements).each(() => {
        const text = $(this).find('strong').text().trim();
        if (text) {
          switch (true) {
            case /Y/.test(text):
              divide = 4;
              break;
            case /Q3/.test(text):
              divide = 3;
              break;
            case /Q2/.test(text):
              divide = 2;
              break;
            default:
              break;
          }
        }
      });
    });
    const fair = cal.processIncomeStatement($('tbody').first(), divide);
    const price = cal.processBalanceSheet($('tbody')[1]);
    const diff = (fair.Price / price) * 100;

    // console.log(`${scode} ${commaNum(fair.Price)} vs ${price}`);

    finData = {
      Name: scode,
      Score: fair.Indicator,
      Value: +fair.Price.toFixed(3),
      MktCap: price,
      Diff: +diff.toFixed(2),
      NetGrowth: +fair.NetGrowth.toFixed(3),
      PriceGrowth: +fair.PriceGrowth.toFixed(2),
      Content: fair.Positive,
      Comment: fair.Comment,
    };
  });

  return finData;
}

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;
