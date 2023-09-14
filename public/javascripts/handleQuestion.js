
var theID = null;

$(document).ready(function() {
	$('#deleteModal').on('show.bs.modal', getElementToDelete);
	$('#exeDeleteQuestion').on('click', delQuestion);
});

function getUUID() {
	return (Math.random(Date.now()).toString(36).slice(-6));
}

function addElement(parentElement, qnaData) {
	
	var newElement = '<h2 class="accordion-header" id="heading' + theID + '" style="margin:0; padding:0; border:0px">';
	newElement += '<div class="accordion-item accordionItemStyle" style="justify-content: space-between; border:0px">'
	newElement += '<button class="accordion-button bAccordProp" type="button" data-bs-toggle="collapse" data-bs-target="#coll' + theID + '" aria-expanded="true" aria-controls="coll' + theID + '">';
	newElement += 'o ' + qnaData.question + '?</button>';
	newElement += '<i class="fa-solid fa-circle-xmark fa-lg xMarkStyle" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-uuidkey="' + theID + '" id="' + theID + '"">';
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

function getElementToDelete(dEvent) {
	theID = dEvent.relatedTarget.getAttribute('data-bs-uuidkey');
}

function delQuestion(dEvent) {
	
	var qnaData = {
		'uuid_key': theID,
	}
		try{
		$.ajax({
			method: 'POST',
			url: '/delQuestion',
			data: qnaData,
			datatype: 'JSON'
		})
		.done(function(res) {
			delElement(document.getElementById("heading" + theID));
			delElement(document.getElementById("coll" + theID));
		})
		.fail(function(err){
			console.log('Error:', err);
		})
	} catch ( dExc ) {
        console.log( 'sendDMail(.) - E [' + dExc.message + ']' );
    }
    //alert("Delete Question under construction.");

}