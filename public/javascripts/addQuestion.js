
function addQuestion(context, question, answer) {

	var qnaData = {
		'context': context,
		'question': question,
		'answer':  answer,
	}
	try{
		$.ajax({
			method: 'POST',
			url: '/addQuestion',
			data: qnaData,
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

    alert("Add Question under construction.");
}