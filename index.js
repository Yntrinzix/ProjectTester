var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require('mongoose');
var username = "Yntrinzix";
var password = "581496";

// my port
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/everything"));

app.use(bodyParser.urlencoded({
	extended: true
}));

//DB schema
var QnASchema = new mongoose.Schema({
	country: String,
	salutation: String,
	name: String,
	email: String,
	question: String	
});

//db model
var QnA = mongoose.model("Connectionname", QnASchema);

mongoose.connect("mongodb://"+username+":"+password+"@ds147070.mlab.com:47070/nodepolder");


//routes - get
app.get("/", function(req, res){
	res.render("index");
})


//routes - post
app.post("/adduser",function(req, res){
	//console.log(req.body);
	var recievedData = {
	country: req.body.country,
	salutation: req.body.salutation,
	name: req.body.name,
	email: req.body.email,
	question: req.body.textarea	
	};

	QnA.create(recievedData,function(err){

		if(err){
			console.log(err);
		}
		else{
			res.send("success");
		}

	});
});


app.listen(port, function(){
	console.log("Server running on port: " + port)
});


