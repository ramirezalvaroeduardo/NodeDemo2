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
	const allQnA = 'SELECT * FROM freq_questions ORDER BY freq_questions_id;'
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(allQnA));
		cbFunction(undefined, resData.rows);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var addQNA = async function addQNA(pgPool, qnaData, cbFunction) {
	const addQnASql = "INSERT INTO freq_questions(question, answer, uuid_key) VALUES('" + qnaData.question + "', '" + qnaData.answer + "', '" + qnaData.uuid_key + "');"; 
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(addQnASql));
		cbFunction(undefined, resData);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var delQNA = async function delQNA(pgPool, qnaData, cbFunction) {
	const delQnASql = "DELETE FROM freq_questions WHERE uuid_key = '" + qnaData.uuid_key + "';"; 
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(delQnASql));
		cbFunction(undefined, resData);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

var updQNA = async function updQNA(pgPool, qnaData, cbFunction) {
	const delQnASql = "UPDATE freq_questions SET question = '" + qnaData.question+ "', answer = '" + qnaData.answer + "' WHERE uuid_key = '" + qnaData.uuid_key + "';"; 
	pgConn = chkDBConn(pgPool);
	try {
		var resData = await(pgConn.query(delQnASql));
		cbFunction(undefined, resData);
	} catch (err) {
		cbFunction(err, undefined);
	}
}

module.exports.getQNA = getQNA;
module.exports.addQNA = addQNA;
module.exports.delQNA = delQNA;
module.exports.updQNA = updQNA;
