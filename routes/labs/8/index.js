var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   res.render('8/Quiz.hbs', {});
});

router.get('/grade', function(req, res, next) {
   let q1 = req.query["Q1"];
   let q2 = req.query["Q2"];
   let q3 = req.query["Q3"];
   let q4 = req.query["Q4"];
   let q5 = req.query["Q5"];

    //Question 1...
    let R1 = q1 == "sacramento";

    //Question 2...
    let R2 = q2 == "missouri";

    //Question 3...
    let  R3 = q3 == "Rhode Island";

    //Question 4...
    let R4 = q4 == "cd";

    //Question 5...
   let  R5 = q5 == "s2";

    var points = 0;

    if (R1) {
        points += 20;
    }

    if (R2) {
        points += 20;
    }

    if (R3) {
        points += 20;
    }

    if (R4) {
        points += 20;
    }

    if (R5) {
        points += 20;
    }

    let HB = points >= 80; // has b

    let resp = {
        "R1": R1,
        "R2": R2,
        "R3": R3,
        "R4": R4,
        "R5": R5,
        "Points": points,
        "HB": HB,
    };

    res.send(JSON.stringify(resp));
});

module.exports = router;