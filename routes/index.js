var express = require('express');
var router = express.Router();
var DataConnection = require('../util/DataConnection');

/* GET home page. */
router.get('/rankings', function(req, res) {
	DataConnection.getAllRankings(function(results){
		// render results on page
	  //res.render('index', { results: results } || {});
		res.status(200);
		res.json(results);
	});
});

/* GET all results */
router.get('/results', function(req, res) {
	DataConnection.getAllResults(function(results){
		res.status(200);
		res.json(results);
	});
});

/* POST new game results to db */
router.post('/results/add', function(req, res) {
	DataConnection.addResult(req.body);
	res.status(201);
	res.json({status: 'success'});
});

/* PUT game data to the db */
router.put('/results/update', function(req, res){
	DataConnection.updateResult(req.body, function(data){
		res.status(200);
		res.json({status: 'success'});
	})
});

module.exports = router;
