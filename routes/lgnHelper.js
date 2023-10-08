
const cryptoLib = require('crypto');

const slLibCon  = require('sqlite3').verbose();


function checkPwd(dUser, dPwd, cbFunction) {
	const dSQL = 'SELECT * FROM freq_creds WHERE userId = "' + dUser + '"';
	try {
		const slConn = new slLibCon.Database('db/mspbtutorial', function(err) {
			if(err) {
				return cbFunction(err.message);
			}
		});
		slConn.all(dSQL, [], function(err, row) {
			if(err){
				return cbFunction(err);
			}
			if(!row[0] || !row[0].userId) {
				return cbFunction('No User with that Name!');
			}
			cryptoLib.pbkdf2(dPwd, 'e3soft', 310000, 32, 'sha256', function(err, hashedPassword) {
				if (err) { 
					return cbFunction(err);
				}
				if (!cryptoLib.timingSafeEqual(Buffer.from(row[0].inPwd, 'hex'), hashedPassword)) {
					return cbFunction('Incorrect username or password.');
				}
				cbFunction(undefined, row[0]);
			});
		});
	} catch (err) {
		cbFunction(err, undefined);
	}
}

module.exports.checkPwd = checkPwd;
