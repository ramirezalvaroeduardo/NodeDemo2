const pgLibPool = require('./dbHelper');
var pgConn = undefined;
var slConn = undefined;

function chkDBConn(pgPool){
	pgConn = pgPool;
	try {
		if (pgConn === undefined) {
			console.log('reopening DB...')
			pgConn = pgLibPool.openPGConn();
		}
	} catch (err) {
		console.log('Error connecting to DB:', err)
	}
	return pgConn;
}

/*function chkSLConn(slDBConn){
	slConn = slDBConn;
	try {
		if (slConn === undefined) {
			console.log('reopening DB...')
			slConn = pgLibPool.openSLConn();
		}
	} catch (err) {
		console.log('Error connecting to SqlLite3:', err)
	}
	return slConn;
}*/

var getQNA = async function getQNA(pgPool, cbFunction) {
	const allQnA = 'SELECT * FROM freq_questions ORDER BY freq_questions_id;'
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(allQnA));
		cbFunction(undefined, resData.rows);
	} catch (err) {
		cbFunction(err, undefined);
	}
}


const slLibCon  = require('sqlite3').verbose();

var getQNASL = async function getQNASL(slDBConn, cbFunction) {
	const dSQL = 'SELECT * FROM freq_questions';
	//slConn = chkSLConn(slDBConn);
	try {
		const slConn = new slLibCon.Database('db/mspbtutorial', function(err) {
			if(err) {
				console.error(err.message);
			}
		});
		slConn.all(dSQL, [], function(err, rows) {
			if(err){
				console.error( 'Error querying Sqlite3 DB - freq_questions table: ', err);
				cbFunction(err, undefined);
			}
			cbFunction(undefined, rows);
			//rows.forEach(function(row) {
			//	console.log('Sqlite freq_questions CNTR:', row);
		});
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var addQNA = async function addQNA(pgPool, qnaData, cbFunction) {
	const addQnASql = "INSERT INTO freq_questions(question, answer, uuid_key) VALUES('" + qnaData.question + "', '" + qnaData.answer + "', '" + qnaData.uuid_key + "');"; 
	//pgConn = chkDBConn(pgPool);
	const slConn = new slLibCon.Database('db/mspbtutorial', function(err) {
			if(err) {
				console.error(err.message);
			}
		});
	try {
		var resData = await(slConn.run(addQnASql));
		cbFunction(undefined, resData);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var delQNA = async function delQNA(pgPool, qnaData, cbFunction) {
	const delQnASql = "DELETE FROM freq_questions WHERE uuid_key = '" + qnaData.uuid_key + "';"; 
	//pgConn = chkDBConn(pgPool);
	const slConn = new slLibCon.Database('db/mspbtutorial', function(err) {
		if(err) {
			console.error(err.message);
		}
	});
	try {
		var resData = await(slConn.run(delQnASql));
		cbFunction(undefined, resData);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var updQNA = async function updQNA(pgPool, qnaData, cbFunction) {
	const delQnASql = "UPDATE freq_questions SET question = '" + qnaData.question+ "', answer = '" + qnaData.answer + "' WHERE uuid_key = '" + qnaData.uuid_key + "';"; 
	//pgConn = chkDBConn(pgPool);
	const slConn = new slLibCon.Database('db/mspbtutorial', function(err) {
		if(err) {
			console.error(err.message);
		}
	});
	try {
		var resData = await(slConn.run(delQnASql));
		cbFunction(undefined, resData);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

module.exports.getQNA = getQNA;
module.exports.getQNASL = getQNASL;

module.exports.addQNA = addQNA;
module.exports.delQNA = delQNA;
module.exports.updQNA = updQNA;


