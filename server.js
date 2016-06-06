import healthCheck from 'connect-health-check'
var express = require('express');
var app = express();
var bodyParser = require('body-parser'),
	request=require('request'),
	tempResp = "",
	cheerio = require('cheerio');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(healthCheck)

app.use(express.static(__dirname + '/'));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/extractdata', function(req, res){
	res.sendFile(__dirname + "/extractData.html")
});

app.post('/loadwebpage', function(req, res){
	// console.log(req.body.url)
	tempResp=""
	var url=req.body.url
	if(url){
		var options = {
			url : url,
			headers : {"User-Agent" : "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/50.0.2661.102 Chrome/50.0.2661.102 Safari/537.36"}
		}
		request(options,function(err,reqst,response){
			tempResp = response;
			res.send(response)
			res.end();
		});

	}
	else{
		console.log("data not fetched")
		res.end("data not fetched");
	}
});

app.post('/getresult',function(req,res){
	var runJson = JSON.parse(req.body.data),
		resultJson = [],
		$ = cheerio.load(tempResp);
	runJson.forEach(function(item,index){
		var obj = {};
		obj.id=item.id;
		obj.val=$(item.cssSelector).text();
		resultJson.push(obj);
	})
	res.json(resultJson);

})

app.listen(3030, function () {
  console.log('Example app listening on port 3030!');
});
