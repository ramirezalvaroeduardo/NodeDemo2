
var theID = null;

function getUUID() {
	return (Math.random(Date.now()).toString(36).slice(-6));
}

function addElement(parentElement, qnaData) {
	
	var newElement = '<h2 class="accordion-header" id="heading' + theID + '" style="margin:0; padding:0; border:0px">';
	newElement += '<div class="accordion-item accordionItemStyle" style="justify-content: space-between; border:0px">'
	newElement += '<button class="accordion-button bAccordProp" type="button" data-bs-toggle="collapse" data-bs-target="#coll' + theID + '" aria-expanded="true" aria-controls="coll' + theID + '">';
	newElement += 'o ' + qnaData.question + '?</button>';
	newElement += '<i class="fa-solid fa-circle-xmark fa-lg xMarkStyle" data-bs-toggle="modal" data-bs-target="#removeModal" id="' + theID + '" onClick=\'delQuestion("' + theID + '")\'>';
	newElement += '</i></div></h2>';
	newElement += '<div class="accordion-collapse collapse" id="coll' + theID + '" aria-labelledby="heading' + theID + '" data-bs-parent="#accordionQAFromDB">';
	newElement += '<div class="accordion-body">';
	newElement += '<h4>' + qnaData.answer + '</h4>';
	newElement += '</div></div></div>';
	parentElement.innerHTML += newElement;
}

function addQuestion(context, question, answer) {

	theID = getUUID();
	var qnaData = {
		'uuid_key': theID,
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
			addElement(document.getElementById('accordionItems'), qnaData);
		})
		.fail(function(err){
			console.log('Error:', err);
		})
	} catch ( dExc ) {
        console.log( 'sendDMail(.) - E [' + dExc.message + ']' );
    }
    //alert("Add Question under construction.");
}

function delElement(theElement) {
	theElement.remove();
}

function delQuestion(uuid_key) {
	var qnaData = {
		'uuid_key': uuid_key
	}
		try{
		$.ajax({
			method: 'POST',
			url: '/delQuestion',
			data: qnaData,
			datatype: 'JSON'
		})
		.done(function(res) {
			delElement(document.getElementById("heading" + uuid_key));
			delElement(document.getElementById("coll" + uuid_key));
		})
		.fail(function(err){
			console.log('Error:', err);
		})
	} catch ( dExc ) {
        console.log( 'sendDMail(.) - E [' + dExc.message + ']' );
    }
    //alert("Delete Question under construction.");
}