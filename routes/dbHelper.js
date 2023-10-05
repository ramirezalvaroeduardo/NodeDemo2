const pgLibPool = require('pg').Pool;
const slLibCon  = require('sqlite3').verbose();

var openPGConn = function openPGConn() {
	const pgPool = new pgLibPool({
		user: 'eduardoramirez',
		host: 'localhost',
		database: 'mspbtutorial',
		password: 'Achu20Cumulain!',
		port: 5432,
	})
	return pgPool;
}

var openSLConn = function openSLConn() {
	const slDBConn = new slLibCon.Database('db/sqlite-tools-osx-x86-3430100/mspbtutorial', function(err) {
		if(err) {
			console.error(err.message);
		}
	})
	console.log('Connected to showFaqslite3: ', slDBConn);

	/*var dSQL = 'SELECT * FROM freq_questions';
	slDBConn.all(dSQL, [], function(err, rows) {
		if(err){
			console.error( 'Error querying Sqlite3 DB - freq_questions table: ', err);
		}
		rows.forEach(function(row) {
			console.log('Sqlite freq_questions CNTR:', row);
		});
	});
	*/
	return slDBConn;
}

module.exports.openPGConn = openPGConn;
module.exports.openSLConn = openSLConn;
