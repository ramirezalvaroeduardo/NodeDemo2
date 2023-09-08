
function showFaqs() {
	console.log('GOT to showFaqs()');
	var dData = {};
	try{
		$.ajax({
			method: 'GET',
			url: '/faqs',
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
		console.log( 'faqs(.) - E [' + dExc.message + ']' );
	}
}