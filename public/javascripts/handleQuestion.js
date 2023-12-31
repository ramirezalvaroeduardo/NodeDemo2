
var theID = null;

$(document).ready(function() {
	$('#captureModal').on('show.bs.modal', clearElement);
	$('#deleteModal').on('show.bs.modal', getElementToHandle);
	$('#updateModal').on('show.bs.modal', getElementToHandle);
	$('#exeDeleteQuestion').on('click', delQuestion);
});

function getUUID() {
	return (Math.random(Date.now()).toString(36).slice(-6));
}

function clearElement() {
	document.getElementById("qnaQuestion").value = ''
	document.getElementById("qnaAnswer").value = '';
}

function addElement(parentElement, qnaData) {
	
	var newElement = '<h2 class="accordion-header" id="heading' + theID + '" style="margin:0; padding:0; border:0px">';
	newElement += '<div class="accordion-item accordionItemStyle" style="justify-content: space-between; border:0px">'
	newElement += '<button class="accordion-button bAccordProp" type="button" data-bs-toggle="collapse" data-bs-target="#coll' + theID + '" aria-expanded="true" aria-controls="coll' + theID + '" id="que' + theID + '">';
	newElement += qnaData.question;
	newElement += '<i class="fa-solid fa-pen-to-square fa-lg pencilStyle" data-bs-toggle="modal" data-bs-target="#updateModal" data-bs-uuidkey="' + theID + '" id="' + theID + '"></i>';
	newElement += '<i class="fa-solid fa-circle-xmark fa-lg xMarkStyle" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-uuidkey="' + theID + '" id="' + theID + '">';
	newElement += '</i></div></h2>';
	newElement += '<div class="accordion-collapse collapse" id="coll' + theID + '" aria-labelledby="heading' + theID + '" data-bs-parent="#accordionQAFromDB">';
	newElement += '<div class="accordion-body">';
	newElement += '<h4 id="ans' + theID + '">' + qnaData.answer + '</h4>';
	newElement += '</div></div></div>';
	parentElement.innerHTML += newElement;

}

function addQuestion(context, question, answer) {
	if(question == '' || answer == '') {
		alert("Question and Answer fields must have a content...")
	} else {
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
}

function delElement(theElement) {
	theElement.remove();
}

function getElementToHandle(dEvent) {
	theID = dEvent.relatedTarget.getAttribute('data-bs-uuidkey');
	document.getElementById("qnaUpdQuestion").value = document.getElementById("que" + theID).innerText;
	document.getElementById("qnaUpdAnswer").value = document.getElementById("ans" + theID).innerText;
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

function updElement(theElement, value) {
	theElement.innerText = value;
}

function updQuestion(context, question, answer) {
	
	var qnaData = {
		'uuid_key': theID,
		'question': question,
		'answer': answer,
	}
		try{
		$.ajax({
			method: 'POST',
			url: '/updQuestion',
			data: qnaData,
			datatype: 'JSON'
		})
		.done(function(res) {
			updElement(document.getElementById("que" + theID), question);
			updElement(document.getElementById("ans" + theID), answer);
		})
		.fail(function(err){
			console.log('Error:', err);
		})
	} catch ( dExc ) {
        console.log( 'sendDMail(.) - E [' + dExc.message + ']' );
    }
    //alert("Delete Question under construction.");

}