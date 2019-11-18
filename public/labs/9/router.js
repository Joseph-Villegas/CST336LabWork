const express = require('express');
const router = express.Router();
const mysql = require('mysql');

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
        
        res.render('../public/labs/9/index', {
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

module.exports = router;