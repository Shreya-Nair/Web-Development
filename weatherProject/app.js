const { urlencoded } = require('express');
const express=require('express');
const app=express();
require("dotrenv").configure();
const https=require('https');
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
  
   res.sendFile(__dirname+"/index.html");  
});
app.post("/",function(req,res){
    const city=req.body.cityname;
   
    const unit="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+process.env.API_KEY;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        const weatherData= JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        
        const iconurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather description is: "+weatherDescription+"</p>");
        res.write("<h1>The temperature in " +city +" is: "+temp+" degrees Celsius</h1>");
        res.write("<img src="+iconurl+" >");
        res.send();
        });
    });
})

app.listen(3000,function(){
    console.log("Server started on port 3000");
})