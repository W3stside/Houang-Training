/////////////////////////////////////////////////////////////
// Animation of Header and Pages
////////////////////////////////////////////////////////////

$(document).ready(function(){//SEQUENTIAL PAGE INSERT//
	var headerArr = document.getElementsByClassName("div5");

	function expander (e) {
		e.preventDefault;

		var headerLocation = null;
		var calculatedHeaderFontSize = function (thingToDivideFrom , divisor) {return (thingToDivideFrom / (divisor * 10)) + 'rem';}
		//className = "a-propos-div" or "tarif-div" or "blog-div" respectively
		var pageName = this.className.split(' ');
		pageName = '.' + pageName[1].concat('-div');
		//snag color of animating page
		var bgColor = $(pageName).css("background-color");
		//if page is in mobile breakpoint, simply scroll to sections
		if (window.innerWidth < 600) {
			$('html, body').animate({
				scrollTop: $(pageName).offset().top
			}, 2000);
			return;
		}    
		//When CLICKED, validate it isnt already processing
		//$(this) points to HEADERS, NOT the moving pages
		if ($(this).hasClass('processing')) return;
		//add .processing to crnt animating page HEADER ITEM (origin of click) to disable reclick and re-animation
		$(this).addClass("processing");
		//add currentAnimating className to actual MOVING PAGE to signify
		$(pageName).addClass("currentAnimatingPage");
		//remove the processing class from all sibling headers
		$(this).siblings().removeClass("processing");
		
		//Close the front hero panel
		if ($('.btn-blue').hasClass('open')) {
			$('.btn-blue').removeClass('open');
			$('#hero-container-hidden-child').animate({flexBasis: '0px'} , 400);
			//change the text back to the original text
			$('#btn-blue-text').text('1er Cours Offert! Voir');
		} 		
		
		$(pageName).siblings().removeClass("currentAnimatingPage");
		$("#logo").removeClass("processing");
		$(pageName).siblings().css({zIndex: '6'}).animate({height: '0', opacity: 0}, 600);

		//animation below
		
		//get Internal Window Height
		var winHeight = $("html").height() - $("header").height() - $("footer").height();	
		$(".hero").addClass("fadeOut");
		$(this).css({backgroundColor: bgColor});
		$(pageName)
			.stop(true,false)
			.css({zIndex: '7', top: '0', left: headerLocation})
			.animate({opacity: '1'} , 0)
			.animate({height: winHeight} , 600)
			.animate({left: '0'} , 400)
			.animate({width: '100%'} , 600,
				//callback for page text       
				function pageContentReveal () {
					$('html, body').animate({
						scrollTop: $(pageName).offset().top
					}, 400);
					if ($(pageName).find('slides-h1')) {
						$('.slides-h1').animate({opacity: 1}, 600, 
							function bringInSlides() {
								$('#slide-1').animate({opacity: 1}, 300);
							});

					}
					//Animate in Page H1
					$(pageName).find(".content-page-h1")
						.animate({
							opacity: '1',
							fontSize: '3.2rem'
						}, 600, 
						//Animate in Header       
						function animMpHeader () {
							$(pageName).find(".mp-header")
								.animate({opacity: '1'}, 300, 
									//Animate in Text       
									function animMpText () {
									$(pageName).find('.mp-titles')
										.animate({opacity: '1'}, 600);
									$(pageName).find(".mp-text, .mp-paragraph")
										.animate({opacity: '1'}, 600,
											function moveRyuIn () {
												if (pageName !== '.a-propos-div') return;
												$(pageName).find("#ryu").addClass("activeRyu");
											}); //end all chain
										$(pageName).find('hr.no-opacity').addClass('yes-opacity');		
									});//end .aninmate fn
						});//end .animate fn
				});//End .animate fn 
		
	};//End expander fn

	//Loop through and apply above
	for (let i = 0; i < headerArr.length; i++) {
		//call function "expander" above when clicking headers
		$(headerArr[i]).bind("click", expander);
	}
	////////////////////////////////////////////////////////////////
	// Hitting the HOME button
	//////////////////////////////////////////////////////////////////

	$("#logo").click(function(e){
	e.preventDefault;
	if (window.innerWidth < 601 || $(this).hasClass('processing')) return;
	// Assign .processing class to current page to DISABLE ability to continually click
	// $(this) = ".logo"
	$(this).addClass('processing');

	$(".hero").removeClass("fadeOut");

	if ( $('.contact').hasClass('contactActive') ) {
		$('#loading-div').animate({opacity: 0}, 400, 
		function removeAfterFadeOut(){
			$('#loading-div').css({zIndex: 0});
			$('.floating-div').animate({opacity: 0});
			$('.contact').removeClass('contactActive');
		});
	}

	//Remove .processing class to allow user to click into other pages
	var removeClasses = $(".tarifs, .blog, .a-propos");
	removeClasses.removeClass('processing');

	//stop all animations on other pages when clicking on a page while another is loading. ex: hitting a propos and then clicking classes immediately	
	var allStop = $(".a-propos, .blog, .logo, .tarifs, .a-propos-div, .blog-div, .tarifs-div, #a-propos-h1, #blog-h1, #tarifs-h1, .mp-header, .mp-text, .mp-img");
	allStop.stop(true);	

	//make HR tags opaque
	$("hr").removeClass("yes-opacity");

	var titleHide = $("#tarifs-h1, #blog-h1, #a-propos-h1, .mp-header, .mp-text, .slides-h1");	
	titleHide.animate({opacity: '0'}, 300);
	titleHide.animate({left: "-100em"}, 100);
	$(".mp-img").removeClass("activeRyu");

	var classesHide = $(".tarifs-div");								//JS for hiding transition for the Classes or COURS page
	classesHide.animate ({width: '25px', left: '82%'/*left: '1150px'*/},700);
	classesHide.animate ({opacity: '0', height: '0'},500);	

	var blogHide = $(".blog-div");
	blogHide.animate ({width: '25px', left: '91.2%'/*left: '1250px'*/},700);			// JS for hiding transition for the BLOG page
	blogHide.animate ({opacity: '0', height: '0'},500);		

	var aproposHide = $(".a-propos-div");
	aproposHide.animate({width: '25px', left: '73.5%'/*left: '1000px'*/},700, 
		function () {
			aproposHide.animate({opacity: '0', height: '0'} , 500) 
		});		

	});

	///////////////////////////////////////////
	// Hitting CONTACT
	///////////////////////////////////////////
	$('.contact').click(function (e) {
	e.preventDefault;
	if( $(this).hasClass('contactActive') ) return;
	$(this).addClass('contactActive');
	$('#loading-div').animate({zIndex: 1111}, 
		function fadeInDiv () {
			$('#loading-div').animate({backgroundColor: 'rgba(0,0,0,0.7)',opacity: 1}, 200, 
				function fadeInForm() {
					$('.floating-div').animate({opacity: 1}, 200);
				});
		});
	})

	/////////////////////////////////////////
	// CLicking loading div after it is focused
	//////////////////////////////////////////
	$('#close_floating_div').click(function (e) {
	e.preventDefault;
	//if( $(this).hasClass('contactActive') ) return;
	$('.contact').removeClass('contactActive');
	$('.floating-div').animate({opacity: 0}, 200, 
		function fadeOutLoadingDiv () {
			$('#loading-div').animate({opacity: 0}, 200, 
				function fadeInForm() {
					$('#loading-div').css({zIndex: 0});
					$(".hero").removeClass("fadeOut");
				});
		});
	})	
}); //end function all

