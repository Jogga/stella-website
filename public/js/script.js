var ctaButton = document.getElementById("stella-cta-button");

ctaButton.onclick = onClickCtaButton;

function onClickCtaButton(){
	ga('send', 'event', 'Forms', 'submit', 'Lead collection');
	console.log("button clicked");
}
