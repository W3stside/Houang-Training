//////////////////////////
// Loading Gif
/////////////////////////

$(window).load( function () {
	setTimeout(() => {
		$('#loading-div').animate({opacity: 0}, 400).css({zIndex: 0});
	}, 200);
});