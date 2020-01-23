/*
* Select all text of input field
*/
$(document).bind('cut copy paste', '.not_ccp', function (e) {
	//e.preventDefault();
});
/*
* Select all text of input field
*/
$(document).on('click', '.select_all', function () {
	$(this).select();
});
/*
* Allow only numeric value in input field ex: 20, 30
*/
$(document).on('keypress keyup blur', '.number', function (event) {
	$(this).val($(this).val().replace(/[^\d].+/, ""));
	if ((event.which < 48 || event.which > 57)) {
		event.preventDefault();
	}
});
/*
* Allow only decimal value in input field ex: 20.59, 30.00
* This function not alow more than one decimal point 
*/
$(document).on('keypress keyup blur', '.decimal', function (event) {
	$(this).val($(this).val().replace(/[^0-9\.]/g, ''));
	if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
		event.preventDefault();
	}
});
/*
* not allow white spaces
*/
$(document).on('keypress keyup blur', '.notwhitespace', function (event) {
	var k = event ? event.which : window.event.keyCode;
	if (k == 32) return false;
});
/*
*   Not allow special character into the input field
*/
$(document).on('keypress keyup blur', '.not_special_char', function (e) {
	var k = e.keyCode,
		$return = ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
	if (!$return) {
		return false;
	}
});
/*
* To verify valid email formate
*/
$(document).on('blur', '.valid_email', function (e) {
	var patern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
	if (!patern.test(this.value)) {
		$(this).next("span").remove();
		$(this).after("<span style='color:red;font-size: 14px;font-style: italic;font-weight: 500;'>Please enter valid email address.</span>");
	}
});
/*
*   To remove error message
*/
$(document).on('keypress', '.valid_email', function (e) {
	$(this).next("span").remove();
});
/*
*   To validate input multiple email address seperated by , (comma)
*/
$(document).on('blur', '.multi_valid_email', function (e) {
	var emails = $(this).val().trim();
	var result = emails.replace(/\s/g, "").split(/,|;/);
	var errors = [];
	for (var i = 0; i < result.length; i++) {
		if (!validateEmail(result[i])) {
			errors[i] = result[i] + ' is not valid email address.';
		}
	} /// end of the for loop
	if (errors.length > 0) {
		$(this).next("span").remove();
		$(this).after("<span style='color:red;font-size: 14px;font-style: italic;font-weight: 500;'>" + errors.join('\n') + "</span>");
		return false;
	}
	else {
		$(this).next("span").remove();
		return true;
	}//// end of else block
});

function validateEmail(value) {
	var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return (regex.test(value)) ? true : false;
}