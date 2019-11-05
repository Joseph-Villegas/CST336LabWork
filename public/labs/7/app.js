const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");
app.use(express.static("public")); // access images, css, js

//routes...

app.get("/", async function(req, res) {
    let parsedData = await getImages("otters", "horizontal");
    res.render("index", {"images": parsedData});
});//end root route


app.get("/results", async function(req, res) {
    let keyword = req.query.keyword;
    let orientation = req.query.orientation;
    let parsedData = await getImages(keyword, orientation);
    res.render("results", {"images": parsedData});
});//end results route

// returns all data from Pixabay API in JSON format
function getImages(keyword, orientation) {
    return new Promise(function(resolve, reject){
        request("https://pixabay.com/api/?key=13859719-acf946e9bc6f552b8006fcd5f&q="+keyword+"&orientation"+orientation, function(error, response, body){
            if(!error && response.statusCode == 200) {
                let parsedData = JSON.parse(body);
                resolve(parsedData);
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
        });//end request
    });//end promise
}

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});