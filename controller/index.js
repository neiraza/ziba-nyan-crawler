exports.index = function(req, res) {
  res.send('ziba nyan crawler...');

  var request = require("request");
  var cheerio = require("cheerio");

  // ziba nyan !!!!!
  var requestUrl = "http://egaogaippai.com/";

  request({url: requestUrl}, function(error, res, body) {

    if (!error && res.statusCode == 200) {
      $ = cheerio.load(body);

      var url = res.request.href;
      console.log(url);

      $(".entry-content").each(function(i){
        console.log("---------- START " + i + " ------------");
        var entryContent = $(this);
        var entryTitle = entryContent.children(".entry-title-ac");
        console.log(trimSp(entryTitle.text()));
        var blogInfo = entryContent.children(".blog_info").children ("p");
        console.log(trimSp(blogInfo.text()));
        var dami = entryContent.children(".dami");
        console.log(trimSp(dami.text()));
        var motto = entryContent.children(".motto").children(".more-link").attr("href");
        console.log(motto);
        console.log("---------- END " + i + " ------------");
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

function trimSp(src) {
  return src.replace(/\s+/g,  "");
}
