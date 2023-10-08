
$(document).ready(function() {
	$('#captureModal').on('show.bs.modal', clearElement);
	$('#loginSubmit').on('click', getCreds);
	$('#loginCancel').on('click', cancelAuth);
});


function getCreds(dEvent) {
	var userId = document.getElementById("userId").value;
	var inPwd = document.getElementById("inPwd").value;
	var lgData = {
		'userId': userId,
		'inPwd': inPwd,
	};
	var dErr = '';
	try{
		$.ajax({
			method: 'POST',
			url: '/checkPwd',
			data: lgData,
			datatype: 'JSON'
		})
		.done(function(res) {
			console.log('Res:', res)
		})
		.fail(function(err){
			console.log('Error:::::', err);
			alert("Error:\n\n", err);
			dErr = err;
		})
	} catch ( dExc ) {
        console.log( 'handleLogin(.) - E [' + dExc.message + ']' );
    }
}

function cancelAuth(dEvent) {
	console.log("Under Constrution")
}

