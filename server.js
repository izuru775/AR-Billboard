var express = require("express");
let app =new express();
//sewrve static web page
app.use(express.static("public"));


app.listen(3000,function(){
    console.log("Server start on port 3000")
});