//Form validator
$(document).ready(function() {
	$('#emailForm').submit(function() {
		$("input[type='submit']", this)
			.val("Please wait....")
			.attr("disabled", "disabled");
		return true;	
	});
});