
function showFaqs() {
	console.log('GOT to showFaqs()');
	
	try{
		$.ajax({
			method: 'GET',
			url: '/faqs',
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