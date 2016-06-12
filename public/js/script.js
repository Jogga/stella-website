var ctaButton = document.getElementById("stella-cta-button");
var emailForm = document.getElementById("stella-email-form");
var emailFormField = document.getElementById("stella-email-form-field");
var emailValidationAlert = document.getElementById("stella-email-form-validation-alert");
var emailValidationSuccess = document.getElementById("stella-email-form-validation-success");
var intervals = [];

// Setup

ctaButton.onclick = onClickCtaButton;
emailFormField.onclick = onClickEmailInput;
if (emailForm.addEventListener) {
    emailForm.addEventListener("submit", function(evt) {
        evt.preventDefault();
    }, true);
}
else {
    emailForm.attachEvent('onsubmit', function(evt){
        evt.preventDefault();
    });
}



function onClickCtaButton(){
  console.log("button clicked");

	if(validateEmail(emailFormField.value)) {
		asyncPost(emailForm, onEmailFormSubmitted);
	} else {
		showMessage(emailValidationAlert);
	}
}

function onClickEmailInput() {
	// ga('send', 'event', 'Forms', 'focus', 'Lead collection');
}

function onEmailFormSubmitted() {
  // ga('send', 'event', 'Forms', 'submit', 'Lead collection');
	emailFormField.value = '';
	showMessage(emailValidationSuccess);
}

/**
 * Takes a form node and sends it over AJAX.
 * Based on: http://stackoverflow.com/a/26556347/3366370
 *
 * @param {HTMLFormElement} form - Form node to send
 * @param {function} callback - Function to handle onload.
 *                              this variable will be bound correctly.
 */
function asyncPost (form, callback) {
  var url = form.action;
  var xhr = new XMLHttpRequest();
	var email = {};
	email.email = emailFormField.value;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(email));

	callback();
}

// Helper functions

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Show Message

function showMessage(messageElement) {
	for (var i = 0; i < intervals.length; i++) {
		clearInterval(intervals[i]);
	}
	messageElement.classList.remove("hidden");
	intervals.push(setInterval(function(){
		messageElement.classList.add("hidden");
	},3000));
}
