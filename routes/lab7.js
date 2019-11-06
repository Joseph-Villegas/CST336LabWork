var express = require('express');
var router = express.Router();
const request = require("request");



router.get("/", async function(req, res) {
    let parsedData = await getImages("otters", "horizontal");
    res.render("lab7/search", {
        image1: { 
            pic: parsedData.hits[0].largeImageURL,  
            likes: parsedData.hits[0].likes
            
        },
        image2: { 
            pic: parsedData.hits[1].largeImageURL,  
            likes: parsedData.hits[1].likes
            
        },
        image3: { 
            pic: parsedData.hits[2].largeImageURL,  
            likes: parsedData.hits[2].likes
            
        },
        image4: { 
            pic: parsedData.hits[3].largeImageURL,  
            likes: parsedData.hits[3].likes
            
        }
    });
});//end root route

router.get("/results", async function(req, res) {
    let keyword = req.query.keyword;
    let orientation = req.query.orientation;
    let parsedData = await getImages(keyword, orientation);
    res.render("results", {
        image1: { 
            pic: parsedData.hits[0].largeImageURL,  
            likes: parsedData.hits[0].likes
            
        },
        image2: { 
            pic: parsedData.hits[1].largeImageURL,  
            likes: parsedData.hits[1].likes
            
        },
        image3: { 
            pic: parsedData.hits[2].largeImageURL,  
            likes: parsedData.hits[2].likes
            
        },
        image4: { 
            pic: parsedData.hits[3].largeImageURL,  
            likes: parsedData.hits[3].likes
            
        }
    });
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


module.exports = router;