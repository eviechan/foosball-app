var mongoose = require('mongoose'),
		config = require('config');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://'+config.get('mongodb.hostname')+':'+config.get('mongodb.port')+'/'+config.get('mongodb.dbName'));

var ResultSchema = new Schema({
	player1: String,
	player2: String,
	score1: Number,
	score2: Number,
	winner: String
});

var RankingSchema = new Schema({
	name: String,
	gamesWon: Number
})

var Result = mongoose.model('Result', ResultSchema);
var Ranking = mongoose.model('Ranking', RankingSchema);

var DataConnection = function(){
	return {
		// adding result 
		addResult: function(result){
			var result = new Result({
				player1: result.player1,
				player2: result.player2,
				score1: parseInt(result.score1),
				score2: parseInt(result.score2),
				winner: (parseInt(result.score1) === parseInt(result.score2)) ? 'NONE' : ((parseInt(result.score1) > parseInt(result.score2)) ? result.player1 : result.player2)
			});
			result.save(function(err){
				if (err) console.log('Error saving result to db: ' +  JSON.stringify(result) + ' | error: ' + err);
			});
		},
		// get rankings for all players
		getAllRankings: function(cb){
			Result.aggregate( 
				{ $match : { winner : { $ne: "NONE"} } },
				{ $group: {_id: "$winner", count: { $sum: 1 }} }, 
				{ $sort: { count: -1 }},
				function(err, res) {
					if (err) console.log('Error querying rankings, error: ' + err);
					cb(res);
				} 
			);
		},
		// retrieves all results from the Result table
		getAllResults: function(cb){
			Result.find({}, { player1: 1, player2: 1, score1: 1, score2: 1, _id: 1}).exec(function(err, res){
				if (err) console.log('Error querying results, error: ' + err);
				cb(res);
			});
		},
		// updates the record in the databse
		updateResult: function(result, cb){
			var resultToUpdate = {
				player1: result.player1,
				player2: result.player2,
				score1: parseInt(result.score1),
				score2: parseInt(result.score2),
				winner: result.winner
			}
			Result.update({_id: result._id }, resultToUpdate, function(err, count, res){
				if (err) console.log('Error querying results, error: ' + err);
				console.log('Number of records affected by editResult: ' + count);
				cb(res);
			});
		}
	}

}

module.exports = DataConnection();