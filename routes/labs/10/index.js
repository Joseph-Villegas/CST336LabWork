var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var session = require('express-session');

router.get('/quotes', function(req, res) {
    let connection = mysql.createConnection({
            host: 'h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ahjpu7ob17q3vxi9',
        password: 'kk5ifjdobw51mvfl',
        database: 'x96ivgx4p6hol44y'
    });

    connection.connect();
    
    let SQLCommand = `SELECT q.category, min(q.quoteId)
                      FROM l9_quotes q 
                      GROUP BY category`;
    
    connection.query(SQLCommand, (error, results, fields) => {
        if (error) throw error;
        
        res.render('10/quotes', {
            title: 'Lab 9',
            category: results
        });
    });
    
    connection.end();
});

router.post('/quotes', function(req, res) {
    let keyword = req.body.search.keyword;
    let searchBy = req.body.search.searchBy;
    let category = req.body.search.category;
    
     var SQLCommand;
     
     let connection = mysql.createConnection({
            host: 'h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
            user: 'ahjpu7ob17q3vxi9',
        password: 'kk5ifjdobw51mvfl',
        database: 'x96ivgx4p6hol44y'
    });

    connection.connect();
    
    switch(searchBy) {
        case 'keyword':
            SQLCommand = `SELECT q.*, a.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
                          FROM l9_quotes q INNER JOIN
                          l9_author a ON q.authorId = a.authorId
                          WHERE q.quote LIKE '%${keyword}%'`;
            break;
        case 'category':
            SQLCommand = `SELECT q.*, a.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
                          FROM l9_quotes q INNER JOIN
                          l9_author a ON q.authorId = a.authorId
                          WHERE q.category LIKE '%${category}%'`;
            break;
        case 'name':
            let fullName = keyword.split(" ");
            SQLCommand = `SELECT q.*, a.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
                          FROM l9_quotes q INNER JOIN
                          l9_author a ON q.authorId = a.authorId
                          WHERE a.firstName LIKE '%${fullName[0]}%'
                          OR    a.firstName LIKE '%${fullName[1]}%'
                          OR    a.lastName  LIKE '%${fullName[0]}%'
                          OR    a.lastName  LIKE '%${fullName[1]}%'`;
            break;
        case 'gender': //m, f, o, b
            SQLCommand = `SELECT q.*, a.*, CONCAT(a.firstName, ' ', a.lastName) AS fullName 
                          FROM l9_quotes q INNER JOIN
                          l9_author a ON q.authorId = a.authorId
                          WHERE a.sex LIKE '%${keyword}%'`;
            break;
        default: 
            break;
    }
    
    connection.query(SQLCommand, (error, results, fields) => {
        if (error) throw error;
        res.json({
            quotes: results
        });
    });
    
    connection.end();
});

router.get('/admin', function(req, res, next) {

    if (!req.session.loggedIn) {
        res.redirect('./quotes')
    }

    let connection = mysql.createConnection({
        host: 'h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ahjpu7ob17q3vxi9',
        password: 'kk5ifjdobw51mvfl',
        database: 'x96ivgx4p6hol44y'
    });

    connection.connect();

    let SQLCommand = `SELECT authorId, firstName, lastName, dob, dod FROM l9_author`;

    connection.query(SQLCommand, (error, results, fields) => {
        if (error) throw error;

        for (let i = 0; i < results.length; i++) {
            row = results[i];
            row["dob"] = formatDate(new Date(row["dob"]));
            row["dod"] = formatDate(new Date(row["dod"]));
            results[i] = row;
        }

        res.render('10/admin', {
            title: 'Lab 10',
            authors: results
        });
    });

    connection.end();
});

router.get('/edit', function(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('./quotes')
    }

    let connection = mysql.createConnection({
        host: 'h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ahjpu7ob17q3vxi9',
        password: 'kk5ifjdobw51mvfl',
        database: 'x96ivgx4p6hol44y'
    });

    connection.connect();

    if (req.query.type == "edit") {

        let SQLCommand = `SELECT * FROM l9_author`;

        connection.query(SQLCommand, (error, results, fields) => {
            if (error) throw error;

            console.log(results);

            for (let i = 0; i < results.length; i++) {
                row = results[i];
                row["dob"] = getDateString(new Date(row["dob"]));
                row["dod"] = getDateString(new Date(row["dod"]));
                results[i] = row;
            }

            res.render('10/edit', {
                type: req.query.type,
                editting: req.query.type == "edit",
                id: req.query.Id,
                info: {
                    firstName: results[0]["firstName"],
                    lastName: results[0]['lastName'],
                    dob: results[0]["dob"],
                    dod: results[0]["dod"],
                    sex: results[0]["sex"] == 'F'
                }
            });

        });

    } else {

        let SQLCommand = `SELECT MAX(authorId) FROM l9_author;`;

        connection.query(SQLCommand, (error, results, fields) => {
            if (error) throw error;

            new_id = results[0]["MAX(authorId)"] + 1
            
            res.render('10/edit', {
                type: req.query.type,
                editting: req.query.type == "edit",
                id: new_id,
            });
        });

    }
});

router.get('/delete', function(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('./quotes')
    }

    let connection = mysql.createConnection({
        host: 'h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ahjpu7ob17q3vxi9',
        password: 'kk5ifjdobw51mvfl',
        database: 'x96ivgx4p6hol44y'
    });

    connection.connect();

    id = req.query.Id;
    confirmed = req.query.confirmed;
    if (confirmed == "true") {
        let SQLCommand = `DELETE FROM l9_author WHERE authorId=${id};`;

        connection.query(SQLCommand, (error, results, fields) => {
            if (error) throw error;
            
            res.redirect('./admin');
        });

        console.log("Deleting has been confirmed!");
    } else {
        let SQLCommand = `SELECT firstName, lastName FROM l9_author WHERE authorId=${id};`;

        connection.query(SQLCommand, (error, results, fields) => {
            if (error) throw error;
            
            res.render('10/confirm', {
                id: id,
                firstName: results[0]["firstName"],
                lastName: results[0]["lastName"]
            });
        });
    }
});

router.get('/submit', function(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('./quotes')
    }

    let connection = mysql.createConnection({
        host: 'h7xe2knj2qb6kxal.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ahjpu7ob17q3vxi9',
        password: 'kk5ifjdobw51mvfl',
        database: 'x96ivgx4p6hol44y'
    });
    
    connection.connect();

    let editting = req.query.editting;
    let id = req.query.id;
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let dob = req.query.dob;
    let dod = req.query.dod;
    let sex = req.query.sex;

    dob = getDateFromString(dob).toISOString().slice(0, 19).replace('T', ' ');
    dod = getDateFromString(dod).toISOString().slice(0, 19).replace('T', ' ');

    if (editting == "true") {

        console.log("Editing user with these values");
        console.log(id, firstName, lastName, dob, dod, sex);

        let SQLCommand = `UPDATE l9_author SET firstName='${firstName}', lastName='${lastName}', dob='${dob}', dod='${dod}', sex='${sex}' WHERE authorId=${id};`;

        connection.query(SQLCommand, (error, results, fields) => {
            if (error) throw error;

            res.redirect('./admin');
        });

    } else {
        console.log("Creating user with these values");
        console.log(id, firstName, lastName, dob, dod, sex);

        let SQLCommand = `INSERT INTO l9_author (authorId, firstName, lastName, dob, dod, sex) VALUES (${id}, '${firstName}', '${lastName}', '${dob}', '${dod}', '${sex}');`;

        connection.query(SQLCommand, (error, results, fields) => {
            if (error) throw error;

            res.redirect('./admin');
        });

    }
});

router.get('/login', function(req, res, next) {
    if (req.query.password) {
        if (req.query.password == "password") {
            req.session.loggedIn = true;
            res.redirect("./admin")
        }
    } else {
        res.render('10/login');
    }
});

router.get('/logout', function(req, res, next) {
    if (req.session.loggedIn) {
        req.session.loggedIn = false;
    }
    res.redirect('./quotes');
})

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function getDateString(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return (monthIndex + 1) + "/" + day + "/" + year
}
  
function getDateFromString(string) {
    var parts = string.split("/");
    var dt = new Date(parseInt(parts[2], 10),
                  parseInt(parts[0], 10) - 1,
                  parseInt(parts[1], 10));
    console.log(dt);
    return dt;
}

module.exports = router;