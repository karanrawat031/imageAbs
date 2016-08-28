"use strict";
var express 	= require('express');
var app     	= express();
var bodyParser  = require('body-parser');
var port    	= process.env.PORT || 8080;
var url 			= require('url');
var googleImages = require('google-images');
var http = require('http');
var request = require("request");

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.redirect('home');
});

app.get('/home',function(req,res){
	res.render('index');
});

app.get('/home/newquery',function(req,res){
	res.render('form');
});

app.post('/home/newquery',function(req,res){
	var query = req.body.query;
	res.redirect('/home/newquery/'+query);
});

app.get('/home/newquery/:query',function(req,res){
	var query = req.params.query;
		request("https://pixabay.com/api/?key=3188564-93235f63e75f93402b8fbea5f&q="+query+"&image_type=photo", function(error, response, body) {
	  res.send(JSON.stringify(body));
	});
});

app.listen(port);
console.log('Magic happens in 8080');
