const pgLibPool = require('pg').Pool;

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

module.exports.openPGConn = openPGConn;
