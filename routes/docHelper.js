
const fsLib = require('fs');

var getDirCont = async function getDirCont(docDir, cbFunction){
	var listDocs = [];
	try{
		fsLib.readdir(docDir, function(err, files) {
			if(err) {
				console.log('Error reading dir', docDir, ':', err)
				cbFunction(err, null);
			} else {
				cbFunction(null, files);
			}
		});
	} catch(exc) {
		console.log('Exception reading dir', docDir, ':', exc.message);
		cbFunction(exc, null);
	}
}

module.exports.getDirCont = getDirCont;