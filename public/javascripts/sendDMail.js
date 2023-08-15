

function sendDMail(dText) {
	var dData = {
		'question': document.getElementById(dText).value
	}

	try{
		$.ajax({
			method: 'POST',
			url: '/sendDMail',
			data: dData,
			datatype: 'JSON'
		})
		.done(function(res) {
			console.log('Success:', res);
		})
		.fail(function(err){
			console.log('Error:', err);
		})
	} catch ( dExc ) {
        console.log( 'sendDMail(.) - E [' + dExc.message + ']' );
    }
}