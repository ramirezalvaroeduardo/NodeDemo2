
function getUUID() {
	return (Math.random(Date.now()).toString(36).slice(-6));
}

function addElement(parentElement, qnaData) {
	var theID = getUUID();
	var newElement = '<div class="accordion-item accordionItemStyle">';
	newElement += '<h2 class="accordion-header" id="heading"' + theID + '">';
	newElement += '<button class="accordion-button bAccordProp" type="button" data-bs-toggle="collapse" data-bs-target="#coll' + theID + '" aria-expanded="true" aria-controls="coll' + theID + '">';
	newElement += 'o ' + qnaData.question + '?';
	newElement += '</button></h2>';
	newElement += '<div class="accordion-collapse collapse" id="coll' + theID + '" aria-labelledby="heading' + theID + '" data-bs-parent="#accordionQAFromDB">';
	newElement += '<div class="accordion-body">';
	newElement += '<h4>' + qnaData.answer + '</h4>';
	newElement += '</div></div></div>';
	parentElement.innerHTML += newElement;
}

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
			addElement(document.getElementById('accordionQAFromDB'), qnaData);
		})
		.fail(function(err){
			console.log('Error:', err);
		})
	} catch ( dExc ) {
        console.log( 'sendDMail(.) - E [' + dExc.message + ']' );
    }

    alert("Add Question under construction.");
}