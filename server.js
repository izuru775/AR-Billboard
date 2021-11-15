var express = require("express");
//let app2=new express();
let app =new express();

//sewrve static web page
app.use(express.static("public"));

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }
app.get('/',(req,res)=>{
    res.send('index.html');
})      

app.get('/adder',function(req,res){
    let num1=parseInt(req.query.num1);
    let num2=parseInt(req.query.num2);

    let sum=num1+num2;

    let data={
        result:sum
    }
    //console.log(sum);
    res.json(data);
})
//generate random number
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

app.get('/random',function(req,res){
    let random=getRandomInt(100);
    let data= {
        random
    }
    return res.json(data);
})


// app.get("/weather",function(req,res){
//     let weatherArray=['cloudy','sunny','rainy']
//     let randomNumber=getRandomInt(2);
//     res.send(weatherArray[randomNumber]);
    
// })

// app.get("/test",function(req,res){
//     console.log("Test Endpoint hit")
//     res.send("Test API work")
// })


app.listen(3000,function(){
    console.log("Server start on port 3000")
})

// app2.listen(3001,function(){
//     console.log("Server start on port 3001")
// })
