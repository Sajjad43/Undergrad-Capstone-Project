var express=require("express");
var morgan=require("morgan");
var assert=require("assert");
var mongodb=require("mongodb").MongoClient;


var match_run_contribution_of_each_batsman=express.Router();


match_run_contribution_of_each_batsman.route("/:team1/:team2/:date")
.all(function(request,response,next){
	  response.writeHead(200,{"Content-Type":"text/plain"});
	  next();
})
.get(function(request,response,next){
     var team1=request.params.team1;
     var team2=request.params.team2;
     var date=request.params.date;
     console.log(team1+"  "+team2); 
     mongodb.connect("mongodb://localhost:27017/visualCric",function(error,db){
     	    if(error){
                return console.error(error);
     	    }//error found



     	    var collection=db.collection("match_run_contribution_of_each_batsman");
     	    collection.findOne({"match.teams":[team1,team2],"match.dates.0":date},function(error,data){
     	    	   console.log(data);
                  response.end(JSON.stringify(data));
     	    	   db.close();
     	    });
     });
})
.post(function(request,response,next){

})
.delete(function(request,response,next){

});


module.exports=match_run_contribution_of_each_batsman;