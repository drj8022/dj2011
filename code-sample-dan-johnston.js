$(document).ready(function(){

	var fragment = '_escaped_fragment_';	// Must match string in crawling.php
	var pfilter  = 'filter';				// GET variable used to filter portfolio projects.

	$.address.crawlable(true).init(function(event) {
		// Initializes plugin support for links
		$('a:not([href^=http])').address();

	}).change(function(event) {
		// Identifies the page selection 
		var page = event.parameters.page ? '/?page=' + event.parameters.page : event.path;

		// If we're not filtering, hide main content so that it may be revealed with an animation.
		if (!$.address.queryString()) {
			$('.main-content').hide();
		}

		function completeHandler() {
			// If we're not filtering, animate showing of main content.
			if (!$.address.queryString()) {
				$('.main-content').show('slide', 600);
			}
		}

		function handler(data) {
			var section = $.address.pathNames()[0];		// Get our current section.
			var tag     = $('#tag', data).attr('tag');	// What is this project tagged with?
			var filter  = $.address.queryString().split('=').pop();	// What have these projects been sorted by?

			var content   = $('.main-content');
			var primary   = $('.menu');
			var secondary = $('.nav-holder');
			var tertiary  = $('.sub-nav');

			// Switch out <title> tag
			$.address.title(/>([^<]*)<\/title/.exec(data)[1]);

			// Insert main content.
			content.html($('.main-content', data).html());

			// Insert secondary menu.
			secondary.html($('.nav-holder ul[tag="' + section + '"]', data));

			// Insert tertiary menu.
			if (tag) {	// No tertiary menu when filtering projects.
				tertiary.html($('.sub-nav ul[tag="' + tag + '"]', data));
			} else {
				tertiary.empty();
			}

			// Make space for secondary navigation.
			switch(section)
			{
				case 'portfolio':
				case 'approach':
				case 'services':
					if (section == 'portfolio' && $.address.pathNames().length > 1) {
						$('.w1').animate({paddingTop:'168px'}, 300);
						secondary.addClass('add');	// Restyle secondary nav bg.
					} else if ($('.w1').css('paddingTop') == '76px') {
						$('.w1').animate({paddingTop:'132px'}, 300);
					} else {
						$('.w1').animate({paddingTop:'132px'}, 300);
						secondary.removeClass('add');	// Reset secondary nav bg style.
					}
					break;
				default:
					if ($('.w1').css('paddingTop') == '132px' || $('.w1').css('paddingTop') == '168px') {
						$('.w1').animate({paddingTop:'76px'}, 300);
					}
			}

			// Highlights for primary navigation.
			$('.menu a').removeClass().attr('style', '');
			$('.menu a[href*="' + section + '"]').addClass('selected');

			// Highlights for secondary navigation.
			$('.nav-holder a').removeClass().attr('style', '');
			if (section == 'portfolio') {
				if (filter) {
					// Portfolio page with filters applied.
					$('.nav-holder a[href*="' + filter + '"]').addClass('selected');
				} else if (tag) {
					// Individual project page.
					$('.nav-holder a[href*="' + tag + '"]').addClass('selected');
				} else {
					// Special case for unfiltered portfolio page.
					$('.nav-holder a[href="portfolio"]').addClass('selected');
				}
			} else {
				$('.nav-holder a[href$="' + page + '"]').addClass('selected');
			}

			// Highlights for tertiary navigation.
			$('.sub-nav a').removeClass().attr('style', '');
			$('.sub-nav a[href*="' + page + '"]').addClass('selected');			

			// Rollover animations for primary, secondary, and tertiary navigation.
			$('.menu a, .nav-holder a, .sub-nav a').hover(
				function () {
					if (!$(this).hasClass('selected')) {
						$(this).stop().animate({'color': '#FFFFFF'}, 250);
					}
				}, 
				function () {
					if (!$(this).hasClass('selected')) {
						$(this).stop().animate({'color': '#A9A9A9'}, 500);
					}
				}
			);

			// Rollover animations for basic 'a' links.
			// '.catalog .link'         == portfolio section portfolio thumbnails
			// '.catalog-block .link'   == services section portfolio thumbnails
			// '.column .link'          == frontpage portfolio thumbnail
			// '.columns .title a'      == frontpage @mediumbold link
			// '.map-holder .text ul a' == contact us page email link
			$('.catalog .link, .column .link, .columns .title a, .catalog-block .link, .map-holder .text ul a').hover(
				function() {$(this).stop().animate({'color' : '#F78E1E'});},
				function() {$(this).stop().animate({'color' : '#FFFFFF'});}
			);

			// Display portfolio projects a user is interested in.
			if (!filter) { filter = 'latest'; }	// If filter is not set, set it to latest.
			$('.catalog li').each(function() {
				if($(this).hasClass(filter)) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});

			$('.portfolio-gallery').portfolio();

			// Make footer text darker on certain pages.
			switch($.address.path()) {
				case '/approach':
				case '/services':
				case '/services/interaction-design':
				case '/services/development':
				case '/services/seo':
				case '/services/identity-branding':
				case '/contact':
					$('#footer').addClass('footer-add');
					break;
				default:
					$('#footer').removeClass();
			}

			// Display additional html on about-us page.
			if ($.address.path() == '/about-us') {
				$('.intro').slideDown();
			} else {
				$('.intro').slideUp(200);
			}

			// Display additional html on home page.
			if ($.address.path() == '/') {
				$('.main-block.home').show();
			} else {
				$('.main-block.home').hide();
			}
		};

		// Loads the page content and inserts it into the content area
		$.ajax({
			url: location.pathname + '?' + fragment + '=' + encodeURIComponent(event.value),
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				handler(XMLHttpRequest.responseText);
			},
			complete: function(jqXHR, textStatus) {
				completeHandler();
			},
			success: function(data, textStatus, XMLHttpRequest) {
				handler(data);
			}
		});
	});
});





// Build a carousel for portfolio images.
(function($){
	$.fn.portfolio = function() {

		var _images  = this.find('img');
		var _count   = _images.length;
		var _first   = this.find('img:eq(0)').attr('src');	// Get first image in list.
		var _last    = this.find('img:eq(' + (_count-1) + ')').attr('src');	// Get last image.
		var _xoffset = 8;	// px
		var _yoffset = 12;	// px
		var _height  = _images.height() + (_count * _yoffset);

		// Set height of portfolio carousel.
		this.height(_height);

		// Create next and previous buttons, place them on the screen.
		// Previous button hidden by default.
		this.append('<div class="prev" style="display:none">prev</div><div class="next">next</div>');
		var _prev = this.find('.prev');
		var _next = this.find('.next');
		_prev.css('top', (_height/2)-(_prev.height()/2));
		_next.css('top', (_height/2)-(_next.height()/2));
		_next.css('right', this.width() - _images.width());

		// Bind click handlers.
		_next.click(function() {
			advance();
		});
		_prev.click(function() {
			retreat();
		});

		// Initilize display of images.
		_images.each(function(i){
			if(i == 0) { $(this).addClass('active'); }
			$(this).css({'z-index' : _count-i, 'top' : _yoffset*i, 'left' : _xoffset*i})
		});

		// Show the next slide.
		function advance() {
			_images.each(function(i){
				if ($(this).css('z-index') == _count) {	// Put the top one on the bottom.
					$(this).removeClass().css({'z-index' : 1, 'top' : _yoffset*(_count-1), 'left' : _xoffset*(_count-1)});
				} else {	// Move everything else up.
					_z = parseInt($(this).css('z-index')) + 1;
					_t = parseInt($(this).css('top')) - _yoffset;
					_l = parseInt($(this).css('left')) - _xoffset;
					$(this).css({'z-index' : _z, 'top' : _t, 'left' : _l});
					if (_z == _count) {
						$(this).addClass('active');
						toggleButtons($(this).attr('src'));
					}
				}
			});
		}

		// Show the previous slide.
		function retreat() {
			_images.each(function(i){
				if ($(this).css('z-index') == 1) {	// Put the bottom one on the top.
					$(this).addClass('active').css({'z-index' : _count, 'top' : 0, 'left' : 0});
					toggleButtons($(this).attr('src'));
				} else {	// Move everything else down.
					_z = parseInt($(this).css('z-index')) - 1;
					_t = parseInt($(this).css('top')) + _yoffset;
					_l = parseInt($(this).css('left')) + _xoffset;
					$(this).removeClass().css({'z-index' : _z, 'top' : _t, 'left' : _l});
				}
			});
		}

		// Hide previous button on first slide.
		// Hide next button on last slide.
		function toggleButtons( src ) {
			src == _first ? _prev.hide() : _prev.show();
			src == _last ? _next.hide() : _next.show();
		}
	};
}(jQuery));
