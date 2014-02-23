$(document).ready(function(){
      $.address.crawlable(true).init(function(event) {

          // Initializes plugin support for links
          $('a:not([href^=http])').address();

      }).change(function(event) {

          // Identifies the page selection 
          var page = event.parameters.page ? '/?page=' + event.parameters.page : event.path;

          // Highlights the selected link
          $('.nav a').each(function() {
              if ($(this).attr('href') == (page == '/' ? '#' : '#!' + page)) {
                  $(this).addClass('selected').focus();
              } else {
                  $(this).removeClass('selected');
              }
          });

          var handler = function(data) {
				$('.content').html($('.content', data).html()).parent().show();
				$.address.title(/>([^<]*)<\/title/.exec(data)[1]);

	 			// JCarousel
	 			jQuery('#images').jcarousel({
					scroll: 1,
					auto: 4,
					easing: 'QuintEaseOut',
					animation: 550,
					wrap: 'last',
					initCallback: mycarousel_initCallback,
					itemVisibleInCallback: {
						onBeforeAnimation: function(c, o, i, s) {
							jQuery('.jcarousel-control a').removeClass('active');
							jQuery('.jcarousel-control a:eq(' + (i-1) + ')').addClass('active');
						}
					}
				});
				function mycarousel_initCallback(carousel) {

				    // Disable autoscrolling if the user clicks the prev or next button.
					carousel.buttonNext.bind('click', function() {
						carousel.startAuto(0);
					});
					carousel.buttonPrev.bind('click', function() {
						carousel.startAuto(0);
					});
	
					// Show buttons only onhover.
					carousel.buttonNext.css('opacity', 0);
					carousel.buttonPrev.css('opacity', 0);
					carousel.container.hover(function() {
						carousel.buttonNext.animate({ opacity:1 }, 300);
						carousel.buttonPrev.animate({ opacity:1 }, 300);
					}, function() {
						carousel.buttonNext.animate({ opacity:0 }, 600);
						carousel.buttonPrev.animate({ opacity:0 }, 600);
					});
	
					// Pause autoscrolling if the user moves with the cursor over the clip.
					carousel.clip.hover(function() {
						carousel.stopAuto();
					}, function() {
						carousel.startAuto();
					});
	
					// Hook up the external controls.
					jQuery('.jcarousel-control a').bind('click', function() {
						carousel.startAuto(0);	// Disable autoscrolling if the user clicks an external control.
						carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
						return false;
					});
				};

				// Custom easing function.
				jQuery.easing['QuintEaseOut'] = function(p, t, b, c, d) {
					return c*((t=t/d-1)*t*t*t*t + 1) + b;
				};

          };

          // Loads the page content and inserts it into the content area
          $.ajax({
              url: location.pathname + '?_escaped_fragment_=' + encodeURIComponent(event.value),
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                  handler(XMLHttpRequest.responseText);
              },
              success: function(data, textStatus, XMLHttpRequest) {
                  handler(data);
              }
          });
      });
      
      // Hides the page during initialization
//      document.write('<style type="text/css"> .content { display: none; } </style>');

});



$(document).ready(function(){

	// Hover effects for project thumbnails on the homepage.
	$('.project').live('mouseover mouseout', function(event) {
		if (event.type == 'mouseover') {
			$('a', this).stop().animate({'color': '#75979d'}, 200);
			$('img', this).stop().animate({'border-bottom-color': '#75979d'}, 200);
		} else {
			$('a', this).stop().animate({'color': '#45504E'}, 400);
			$('img', this).stop().animate({'border-bottom-color': '#fff'}, 400);
		}
	});

/*
	// Click effects for projects on the frontpage.
	$('.project').live('click', function(event) {
//console.log(event);
		if ($(this).hasClass('available')) { } else {
			// Return the projects and filters to initialized state.
			event.preventDefault();
		}
	});
*/

	// Simple hover effect for filters.
	$('#filters li').live('mouseover mouseout', function(event) {
		if (event.type == 'mouseover') {
			if ($(this).hasClass('active')) { } else {
				$(this).stop().animate({'color': '#45504e'}, 200);
			}
		} else {
			if ($(this).hasClass('active')) { } else {
				$(this).stop().animate({'color': '#86bdc9'}, 300);
			}
		}
	});

	// Do stuff when filters are clicked.
	$('#filters li').live('click', function() {
		if ($(this).hasClass('active')) {
			$(this).css('color', '#86bdc9').removeClass('active');
			resetProjects();
		} else {	// Otherwise filter out projects based on what was clicked.
			$('#filters').find('.active').removeClass('active').css('color', '#86bdc9');
			$(this).addClass('active').css('color', '#fff');
			var filter = $(this).attr('id');
			sortProjectsBy(filter);
//console.log(filter);
		}
	});

	function sortProjectsBy(filter) {

		// Create a master random number.
		var _random = random_number_within_range(400, 550);
		var _count = 0;		// Count the projects from here.
		var _delay = 50;	// In milliseconds.

		$.each($('.project'), function(){

			var _match = false;

			// Set the height of each h2 to its initial height.
			// Do this so it doesn't freak when it's animating.
			var h2_height = $('h2', this).height();
			$('h2', this).css({'height':h2_height, 'overflow':'hidden'});

			// For each project, create a different random number near the master number.
			var _rand = offset_random_number(_random, 25, 45);

			// Decide if this project matches the selected filter.
			// A project may be tagged with multiple filters.
			var filters = $(this).attr('name').split(' ');
			$.each(filters, function(index, value){
				if (value == filter) {
					_match = true;
				}
			});

			// Animate!
			if(_match) {	// If this is what we want to see, make sure it's visible.
				if (!$(this).hasClass('available')) {
					$(this).addClass('available');
				}
				$(this).delay(_count*_delay).animate({opacity: 1.0}, _rand);
			} else {
				if ($(this).hasClass('available')) {
					$(this).removeClass('available');
				}
				$(this).delay(_count*_delay).animate({width: 0, opacity: 0.15, marginRight: 0}, _rand, function(){
					$('#projects').append(this);
						$(this).animate({width: 225, marginRight: 20}, _rand/1.2);
				});
			}

			_count++;

		});	// end .each()
	}

	// Generate a random number within a range.
	function random_number_within_range(rmin, rmax)
	{
		var random_number = rmin + (Math.random() * (rmax - rmin));
		return Math.floor(random_number);
	}

	// Generate a random number close to a given number.
	function offset_random_number(number, min_percent_off, max_percent_off)
	{
		var random_offset = random_number_within_range(min_percent_off, max_percent_off);	// Randomize the variation.
		random_offset = Math.floor(number * (random_offset/100));		// Get the number to add or subtract.

		return number+random_offset;
	}

	// Return all projects to 100% visible.
	function resetProjects() {
		$.each($('.project'), function(){
			var _random = random_number_within_range(0, 300);
			$(this).delay(_random).animate({opacity: 1.0}, 200);
		});
	}

});
