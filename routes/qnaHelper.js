const pgLibPool = require('./dbHelper');
var pgConn = undefined;

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

var getQNA = async function getQNA(pgPool, cbFunction) {
	const allQnA = 'SELECT * FROM freq_questions'
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(allQnA));
		cbFunction(undefined, resData.rows);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var addQNA = async function addQNA(pgPool, qnaData, cbFunction) {
	const addQnASql = "INSERT INTO freq_questions(question, answer) VALUES('" + qnaData.question + "', '" + qnaData.answer + "');"; 
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(addQnASql));
		cbFunction(undefined, 'OK');
	} catch (err) {
		cbFunction(err, undefined);
	}
}

module.exports.getQNA = getQNA;
module.exports.addQNA = addQNA;