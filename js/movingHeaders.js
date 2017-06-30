	/////////////////////////////////////////////////////////////
   // Animation of Header and Pages
  ////////////////////////////////////////////////////////////

$(document).ready(function(){		//SEQUENTIAL PAGE INSERT//
  var headerArr = document.getElementsByClassName("div5");

  function expander (e) {
    e.preventDefault;
    
    //get Internal Window Height
    var winHeight = $("html").height() - $("header").height() - $("footer").height();
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
    $(pageName).siblings().removeClass("currentAnimatingPage");
    $("#logo").removeClass("processing");
    $(pageName).siblings().css({zIndex: '6'}).animate({height: '0'}, 600);
        
    //animation below
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
			scrollTop: $(pageName).offset().top + 50
		  }, 400);
      //Animate in Page H1
      $(pageName).find(".content-page-h1")
        .animate({
        opacity: '1',
        fontSize: calculatedHeaderFontSize(winHeight,25)
		}, 600, 
		//Animate in Header       
		function animMpHeader () {
			$(pageName).find(".mp-header")
			.animate({opacity: '1', fontSize: calculatedHeaderFontSize(winHeight,19)}, 300, 
		    //Animate in Text       
		    function animMpText () {
				$(pageName).find('.mp-titles')
					.animate({opacity: '1', fontSize: calculatedHeaderFontSize(winHeight,28)}, 600);
				$(pageName).find(".mp-text, .mp-paragraph, hr")
					.animate({opacity: '1', fontSize: calculatedHeaderFontSize(winHeight,33)}, 600)
					.find(".title-hashtag").animate({fontSize: calculatedHeaderFontSize(winHeight,25)}, 400,
						function moveRyuIn () {
							console.log(pageName);
							if (pageName !== '.a-propos-div') return;
							$(pageName).find("#ryu").addClass("activeRyu");
						}); //end all chain
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
      //$(".fullscreen-bg__video").css({display: 'initial'});

      //Remove .processing class to allow user to click into other pages
      var removeClasses = $(".tarifs, .blog, .a-propos");
      removeClasses.removeClass('processing');

      //stop all animations on other pages when clicking on a page while another is loading. ex: hitting a propos and then clicking classes immediately	
      var allStop = $(".a-propos, .blog, .logo, .tarifs, .a-propos-div, .blog-div, .tarifs-div, #a-propos-h1, #blog-h1, #tarifs-h1, .mp-header, .mp-text, .mp-img");
      allStop.stop(true);	

      var titleHide = $("#tarifs-h1, #blog-h1, #a-propos-h1, .mp-header, .mp-text");	
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
      aproposHide.animate ({width: '25px', left: '73.5%'/*left: '1000px'*/},700);
      aproposHide.animate ({opacity: '0', height: '0'},500);		

      var aProposDiv = $(".hero");	
      //aProposDiv.animate({opacity: '1'}, 2000);
      //aProposDiv.animate({height: '100vh'},800);
      //aProposDiv.animate({width: '100%'}, 500);			
    });
   });

