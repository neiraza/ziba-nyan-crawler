exports.index = function(req, res) {
  res.send('ziba nyan crawler...');

  var sequelize = require("sequelize");
  var request = require("request");
  var cheerio = require("cheerio");

  var connection = new sequelize('zibanyan', 'root', ''
      , { host: 'localhost', port: 3306 });

  var sites = connection.define("sites", {
    url: sequelize.TEXT,
    title: sequelize.STRING,
    link: sequelize.TEXT,
    linkTitle: sequelize.STRING
  });

  // ziba nyan !!!!!
  var requestUrl = "http://egaogaippai.com/";

  request({url: requestUrl}, function(error, res, body) {

    if (!error && res.statusCode == 200) {
      $ = cheerio.load(body);

      var url = res.request.href;
      var title = $("title").text();

      console.log(url);
      console.log(title);

      $(".entry .entry-title-ac a[href]").each(function() {
        console.log('~~~~~~~~~~~~~');
        var link = $(this).attr('title')
        console.log(link);

        var linkTitle = $(this).attr('href');
        console.log(linkTitle);
        console.log('~~~~~~~~~~~~~');

        var site = sites.build();
        site.url = url;
        site.title = title;
        site.link = link;
        site.linkTitle = linkTitle;

        site.save()
          .success(function(anotherTask) {
            console.log('Succeed');
          })
          .error(function(error) {
            console.log(error);
        });
      });
    } else {
      console.log("--------------------------------------------------");
      if (error && "code" in error) {
        console.log("Error Code:" + error.code);
      }
      if (error && "errno" in error) {
        console.log("Error No:" + error.errno);
      }
      if (error && "syscall" in error) {
        console.log("Error Syscall:" + error.syscall);
      }
      if (res && "statusCode" in res) {
        console.log("Status Code:" +  res.statusCode);
      }
    }
  });
}

exports.support = function(req, res) {
    res.send('hello suport');
}

