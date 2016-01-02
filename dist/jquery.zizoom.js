/*
 *  jQuery Zizoom v1.0.0
 *
 *  Copyright (c) 2016 Marco Zingoni
 *  http://marcozingoni.com/zizoom/
 *
 *  Licensed under MIT
 *
 */

(function($) {

	// jQuery plugin definition
	$.fn.zizoom = function(params) {

		// merge default and user parameters
		params = $.extend( {
			activate    : 'hover',  // how activate pugin - "hover" / "click"
			dataElement : 'zoom',   // retrieve zoom element in image
			zoomicon    : 'fa fa-search',   // retrieve zoom element in image
			zoomcolor   : '#fff',   // icon color
		}, params);

		// traverse all nodes
		this.each(function() {

			// express a single node as a jQuery object
			var $t      = $(this);
			var $imgSml = $t.children('img');

			$imgSml.load(function(){

				$imgBig  = setCssAndCreateImgBig($t);
				$overlay = setCssAndCreateOverlay($t);
				setContainerSize($imgSml, $t, $overlay);

				// start on hover
				if(params.activate == 'hover') {
					$t.mouseover(function() {
						showImgBig($imgBig);
	            		showOverlay($overlay);						
						$overlay.mousemove(function( e ) {
							xpos = e.pageX - $t.offset().left;
							ypos = e.pageY - $t.offset().top;
		        			moveImgBig($t, $imgBig, xpos, ypos);
						});
					});
					$t.mouseout(function() {
						hideImgBig($imgBig, $overlay);
					});
				}

				// start on click
				if(params.activate == 'click') {

					// attach icon
					$zoomicon = insertZoomIcon($t);

					// set cursor pointer to main div
					$t.css('cursor', 'pointer');

					$t.on('click hover', function(event) {
	            		showImgBig($imgBig);
	            		showOverlay($overlay);
						$overlay.mousemove(function( e ) {
							xpos = e.pageX - $t.offset().left;
							ypos = e.pageY - $t.offset().top;
							// console.log(xpos+' '+ypos);
		        			moveImgBig($t, $imgBig, xpos, ypos);

						});
						$(document).mousemove(function(e){
							console.log($overlay.is(':hover'));
							if($overlay.is(':hover') === false) { hideImgBig($imgBig, $overlay); }
						});
					});

					$t.mouseover(function() {
						$zoomicon.show();
					}).mouseout(function(){
						$zoomicon.hide();
					});

				}

			});

		});

		// Set all css element and create ImgBig 
		// Return imgBig obj
		function setCssAndCreateImgBig($t) {

			// set div to relaitive
			$t.css('position', 'relative')
			  .css('overflow','hidden');

			// retrieve zoomed Img and append to div
			var zoomImg = $t.data(params.dataElement);
			var $imgBig = $('<img src="'+zoomImg+'">');
			$t.append($imgBig);

			// Set imgBig css Options
			$imgBig.css('position', 'absolute')
				   .css('display', 'none');

			return $imgBig;

		}

		// Create overlay 
		// Return overlay obj
		function setCssAndCreateOverlay($t) {

			var $overlay = $('<div class="zizoom--overlay"></div>');
			$t.append($overlay);	   

			$overlay.css('position', 'absolute')
				   .css('display', 'none')
				   .css('top', '0')
				   .css('left', '0')
				   .css('z-index', '11');

			return $overlay;

		}



		// Set Container Size = imgSml Size 
		function setContainerSize($imgSml, $t, $overlay) {

			// get container w & h
			w = $imgSml.width();
			h = $imgSml.height();

			// set container w & h
			$t.width(w);
			$t.height(h);

			$overlay.width(w);
			$overlay.height(h);

		}

		// Position imgBig 
		function showImgBig($imgBig) {

			$imgBig.css('display', 'block')
				   .css('z-index', 10);

		}

		// Position overlay 
		function showOverlay($overlay) {

			$overlay.css('display', 'block');

		}

		// Position imgBig 
		function hideImgBig($imgBig) {

			$imgBig.css('display', 'none')
				   .css('z-index', 0);

			$overlay.css('display', 'none');	   

		}

		// Move imgBig 
		function moveImgBig($t, $imgBig, xpos, ypos) {

			// imgBig Size
			w = $t.width();
			h = $t.height();
			var offset = $t.offset();
			offsetTop = offset.top;
			offsetLeft = offset.left;
			// offsetLeft =  $t.position().left;
			// offsetTop =  $t.position().top;

			imgBigW = $imgBig.width() - w;
			imgBigH = $imgBig.height() - h;

			// get new position of imgBig
			imgBigXPos = ( xpos * imgBigW ) / w * -1;
			imgBigYPos = ( ypos * imgBigH ) / h * -1;

			// set new position of imgBig
			$imgBig.css('left', imgBigXPos)
				   .css('top', imgBigYPos);

		}


		// Create magnify icon for click function 
		function insertZoomIcon($t) {

			var $zoomicon = $('<span class="'+params.zoomicon+'"></span>');

			w = $t.width();
			h = $t.height();
			$t.append($zoomicon);

			// position icon in center
			$zoomicon.css('position', 'absolute')
			  .css('display', 'none')
			  .css('color', params.zoomcolor)
			  .css('left', (w / 2) + ($zoomicon.width()  / 2) * -1 +'px')
			  .css('top', (h / 2) + ($zoomicon.height()  / 2) * -1 +'px');

			return $zoomicon;

		}


		// allow jQuery chaining
		return this;
	};

})(jQuery);