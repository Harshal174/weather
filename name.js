const { log } = require('console');
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/index.html");
})
app.listen(process.env.PORT||3000,()=>{
    console.log("Server is running!!!");
})

app.post("/",(req,res)=>{
    
   

const query = req.body.CityName;
const apiKey = "30d42e8d2bd940bf8da112046231307";
const url="https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+query+"&aqi=no";
https.get(url, (response)=>{
   response.on('data',(data)=>{
    // console.log(response.statusCode);
    const weatherData = JSON.parse(data);    
    const temp = weatherData.current.temp_c;
    const icon = weatherData.current.condition.icon;
    const imageURL = "//cdn.weatherapi.com/weather/64x64/day/116.png";
   res.write("<p>The hello is the new mellow</p>");
   res.write("<h1>The tempertaure in"+ query +" is "+ temp +" Degree Celcius</h1>");
   res.write("<img src="+imageURL+">");
   res.send();
})
    
})

})

