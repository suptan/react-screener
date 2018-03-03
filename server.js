const express = require('express');
// const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const cors = require('cors');
const commaNum = require('comma-number');
const { stopwatch } = require('durations');
const async = require('async');
const cal = require('./api/calculator');
const screener = require('./api/screener.js');

const app = express();

app.use(cors());

app.get('/api/scrape', function(req, res) {
  const codeList = screener.givenArray();
  let result = [];

  // let que = async.queue(function(task, done){
  async.map(codeList, function(scode, next) {
    console.log(`Task ${scode}`);
    const sw = stopwatch();
    const url = `https://www.set.or.th/set/companyhighlight.do?symbol=${scode}&ssoPageId=5&language=en&country=US`;
    // url = 'https://www.set.or.th/set/companyhighlight.do?symbol=HANA&ssoPageId=5&language=th&country=TH';
  
    sw.reset();
    // Starts the stopwatch from where it was last stopped.
    sw.start();
  
    request(url, function(error, response, html) {
      if (!error){
        result.push(exteacted(scode, html));
      }
  
      /*fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
      })*/
  
      sw.stop()
      console.log(`${scode} ${sw} have elapsed`)
      next(false, scode);
    });
  }, function (err, scode) {
    if (err) console.log('Error is', err, scode);
    res.json({ response: result });
  });

  /*que.drain = function() {
    console.log('all items have been processed');
  }

  for(let i = 0, len = codeList.length; i < len; i++) {
    que.push({scode: codeList[i]}, function(err) {
      console.log(`Error at ${codeList[i]}: ${err}`)
    })
  }*/

  // End app
  // result will be the same as initialize state
  // becuase async
  console.log('End with', result)
  // res.send(result);
});

function exteacted(scode, html) {
  console.log('call successfully');
  var $ = cheerio.load(html);

  let finData = {};
  let title, release, rating, divide = 1, price = 0, indicator = 10;
  var json = { title : "", release : "", rating : ""};
  var isLastColValid = false;

  // Find finance table
  $('.table-info').filter(function() {
    // Find latest Quater
    $('thead').first().filter(function() {
      var elements = $(this).find('th').get().reverse();
      $(elements).each(function() {
        var text = $(this).find('strong').text().trim()
        if(text) {
          switch(true) {
            case /Y/.test(text):
              divide = 4
              break;
            case /Q3/.test(text):
              divide = 3
              break;
            case /Q2/.test(text):
              divide = 2
              break;
          }
          return false;
        }
      })
    })
    let fair = cal.processIncomeStatement($('tbody').first(), divide)
    price = cal.processBalanceSheet($('tbody')[1]);
    const diff = ((price - fair.Price) / fair.Price) * 100;

    console.log(`${scode} ${commaNum(fair.Price)} vs ${price}`)

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
