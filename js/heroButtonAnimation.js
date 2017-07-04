//////////////////////////
// CLicking Cours Offert BUtton
/////////////////////////////

$(document).ready( function() {
	$('.btn-blue').click(function () {
		//if the button already is open, close it
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('#hero-container-hidden-child').animate({flexBasis: '0px'} , 400);
			//change the text back to the original text
			$('#btn-blue-text').text('1er Cours Offert! Voir');
			return;
		} else {
			//otherwise....
			$(this).addClass('open');
			//change text
			$('#btn-blue-text').text('Fermer');
			//open the screen
			$('#hero-container-hidden-child').css({flexBasis: 'auto'});
		}
	})
})