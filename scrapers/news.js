const http = require("http");

exports.findAll = function(req, res) {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const news = `http://newsapi.org/v2/everything?q=apple&from=${date}&to=${date}&sortBy=popularity&apiKey=43f80027f3d5427c8a487fededb5e53e`;
http.get(news, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    
  });
});
};
