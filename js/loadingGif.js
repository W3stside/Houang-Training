//////////////////////////
// Loading Gif
/////////////////////////

$(window).load( function () {
	setTimeout(() => {
		$('#loading-div').animate({opacity: 0}, 400, 
			function removeAfterFadeOut(){
				$('#loading-div').css({zIndex: 0});
				$('#loading-gif').css({zIndex: 0, display: 'none'});
				$('.floating-div').css({opacity: 1});
			});
	}, 200);
});