(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * baguetteBox.js
 * @author  feimosi
 * @version 1.5.0
 * @url https://github.com/feimosi/baguetteBox.js
 */

'use strict';

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.baguetteBox = factory();
	}
})(undefined, function () {

	// SVG shapes used on the buttons
	var leftArrow = '<svg width="44" height="60">' + '<polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' + 'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' + '</svg>',
	    rightArrow = '<svg width="44" height="60">' + '<polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"' + 'stroke-linecap="butt" fill="none" stroke-linejoin="round"/>' + '</svg>',
	    closeX = '<svg width="30" height="30">' + '<g stroke="rgb(160, 160, 160)" stroke-width="4">' + '<line x1="5" y1="5" x2="25" y2="25"/>' + '<line x1="5" y1="25" x2="25" y2="5"/>' + '</g></svg>';
	// Global options and their defaults
	var options = {},
	    defaults = {
		captions: true,
		fullScreen: false,
		noScrollbars: false,
		titleTag: false,
		buttons: 'auto',
		async: false,
		preload: 2,
		animation: 'slideIn',
		afterShow: null,
		afterHide: null,
		// callback when image changes with `currentIndex` and `imagesElements.length` as parameters
		onChange: null,
		overlayBackgroundColor: 'rgba(0, 0, 0, .8)'
	};
	// Object containing information about features compatibility
	var supports = {};
	// DOM Elements references
	var overlay, slider, previousButton, nextButton, closeButton;
	// Current image index inside the slider and displayed gallery index
	var currentIndex = 0,
	    currentGallery = -1;
	// Touch event start position (for slide gesture)
	var touchStartX;
	var touchStartY;
	// If set to true ignore touch events because animation was already fired
	var touchFlag = false;
	// Regex pattern to match image files
	var regex = /.+\.(gif|jpe?g|png|webp)/i;
	// Array of all used galleries (Array od NodeList elements)
	var galleries = [];
	// 2D array of galleries and images inside them
	var imagesMap = [];
	// Array containing temporary images DOM elements
	var imagesElements = [];
	// Event handlers
	var imagedEventHandlers = {};
	var imageElement;
	var imageSrc;
	var overlayClickHandler = function overlayClickHandler(event) {
		// When clicked on the overlay (outside displayed image) close it
		if (event.target && event.target.nodeName !== 'IMG' && event.target.nodeName !== 'FIGCAPTION') {
			hideOverlay();
		}
	};
	var previousButtonClickHandler = function previousButtonClickHandler(event) {
		/*jshint -W030 */
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		showPreviousImage();
	};
	var nextButtonClickHandler = function nextButtonClickHandler(event) {
		/*jshint -W030 */
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		showNextImage();
	};
	var closeButtonClickHandler = function closeButtonClickHandler(event) {
		/*jshint -W030 */
		event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
		hideOverlay();
	};
	var touchstartHandler = function touchstartHandler(event) {
		// Save x and y axis position
		touchStartX = event.changedTouches[0].pageX;
		touchStartY = event.changedTouches[0].pageY;
	};
	var touchmoveHandler = function touchmoveHandler(event) {
		// If action was already triggered return
		if (touchFlag) {
			return;
		}
		/*jshint -W030 */
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		var touch = event.touches[0] || event.changedTouches[0];
		// Move at least 40 pixels to trigger the action
		if (touch.pageX - touchStartX > 40) {
			touchFlag = true;
			showPreviousImage();
		} else if (touch.pageX - touchStartX < -40) {
			touchFlag = true;
			showNextImage();
			// Move 100 pixels up to close the overlay
		} else if (touchStartY - touch.pageY > 100) {
				hideOverlay();
			}
	};
	var touchendHandler = function touchendHandler() {
		touchFlag = false;
	};

	// forEach polyfill for IE8
	// http://stackoverflow.com/a/14827443/1077846
	if (![].forEach) {
		Array.prototype.forEach = function (callback, thisArg) {
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	// filter polyfill for IE8
	// https://gist.github.com/eliperelman/1031656
	if (![].filter) {
		Array.prototype.filter = function (a, b, c, d, e) {
			/*jshint -W030 */
			c = this;
			d = [];
			for (e = 0; e < c.length; e++) {
				a.call(b, c[e], e, c) && d.push(c[e]);
			}
			return d;
		};
	}

	// Script entry point
	function run(selector, userOptions) {
		// Fill supports object
		supports.transforms = testTransformsSupport();
		supports.svg = testSVGSupport();

		buildOverlay();
		bindImageClickListeners(selector, userOptions);
	}

	function bindImageClickListeners(selector, userOptions) {
		// For each gallery bind a click event to every image inside it
		var gallery = document.querySelectorAll(selector);
		galleries.push(gallery);
		[].forEach.call(gallery, function (galleryElement) {
			if (userOptions && userOptions.filter) {
				regex = userOptions.filter;
			}
			// Filter 'a' elements from those not linking to images
			var tags = galleryElement.getElementsByTagName('a');
			tags = [].filter.call(tags, function (element) {
				return regex.test(element.href);
			});

			// Get all gallery images and save them in imagesMap with custom options
			var galleryID = imagesMap.length;
			imagesMap.push(tags);
			imagesMap[galleryID].options = userOptions;

			[].forEach.call(imagesMap[galleryID], function (imageElement, imageIndex) {
				var imageElementClickHandler = function imageElementClickHandler(event) {
					/*jshint -W030 */
					event.preventDefault ? event.preventDefault() : event.returnValue = false;
					prepareOverlay(galleryID);
					showOverlay(imageIndex);
				};
				imagedEventHandlers[galleryID + '_' + imageElement] = imageElementClickHandler;
				bind(imageElement, 'click', imageElementClickHandler);
			});
		});
	}

	function unbindImageClickListeners() {
		galleries.forEach(function (gallery) {
			[].forEach.call(gallery, function () {
				var galleryID = imagesMap.length - 1;
				[].forEach.call(imagesMap[galleryID], function (imageElement) {
					unbind(imageElement, 'click', imagedEventHandlers[galleryID + '_' + imageElement]);
				});
				imagesMap.pop();
			});
		});
	}

	function buildOverlay() {
		overlay = getByID('baguetteBox-overlay');
		// Check if the overlay already exists
		if (overlay) {
			slider = getByID('baguetteBox-slider');
			previousButton = getByID('previous-button');
			nextButton = getByID('next-button');
			closeButton = getByID('close-button');
			return;
		}
		// Create overlay element
		overlay = create('div');
		overlay.id = 'baguetteBox-overlay';
		document.getElementsByTagName('body')[0].appendChild(overlay);
		// Create gallery slider element
		slider = create('div');
		slider.id = 'baguetteBox-slider';
		overlay.appendChild(slider);
		// Create all necessary buttons
		previousButton = create('button');
		previousButton.id = 'previous-button';
		previousButton.innerHTML = supports.svg ? leftArrow : '&lt;';
		overlay.appendChild(previousButton);

		nextButton = create('button');
		nextButton.id = 'next-button';
		nextButton.innerHTML = supports.svg ? rightArrow : '&gt;';
		overlay.appendChild(nextButton);

		closeButton = create('button');
		closeButton.id = 'close-button';
		closeButton.innerHTML = supports.svg ? closeX : 'X';
		overlay.appendChild(closeButton);

		previousButton.className = nextButton.className = closeButton.className = 'baguetteBox-button';

		bindEvents();
	}

	function keyDownHandler(event) {
		switch (event.keyCode) {
			case 37:
				// Left arrow
				showPreviousImage();
				break;
			case 39:
				// Right arrow
				showNextImage();
				break;
			case 27:
				// Esc
				hideOverlay();
				break;
		}
	}

	function bindEvents() {
		bind(overlay, 'click', overlayClickHandler);
		bind(previousButton, 'click', previousButtonClickHandler);
		bind(nextButton, 'click', nextButtonClickHandler);
		bind(closeButton, 'click', closeButtonClickHandler);
		bind(overlay, 'touchstart', touchstartHandler);
		bind(overlay, 'touchmove', touchmoveHandler);
		bind(overlay, 'touchend', touchendHandler);
	}

	function unbindEvents() {
		unbind(overlay, 'click', overlayClickHandler);
		unbind(previousButton, 'click', previousButtonClickHandler);
		unbind(nextButton, 'click', nextButtonClickHandler);
		unbind(closeButton, 'click', closeButtonClickHandler);
		unbind(overlay, 'touchstart', touchstartHandler);
		unbind(overlay, 'touchmove', touchmoveHandler);
		unbind(overlay, 'touchend', touchendHandler);
	}

	function prepareOverlay(galleryIndex) {
		// If the same gallery is being opened prevent from loading it once again
		if (currentGallery === galleryIndex) {
			return;
		}
		currentGallery = galleryIndex;
		// Update gallery specific options
		setOptions(imagesMap[galleryIndex].options);
		// Empty slider of previous contents (more effective than .innerHTML = "")
		while (slider.firstChild) {
			slider.removeChild(slider.firstChild);
		}
		imagesElements.length = 0;
		// Prepare and append images containers
		for (var i = 0, fullImage; i < imagesMap[galleryIndex].length; i++) {
			fullImage = create('div');
			fullImage.className = 'full-image';
			fullImage.id = 'baguette-img-' + i;
			imagesElements.push(fullImage);
			slider.appendChild(imagesElements[i]);
		}
	}

	function setOptions(newOptions) {
		if (!newOptions) {
			newOptions = {};
		}
		// Fill options object
		for (var item in defaults) {
			options[item] = defaults[item];
			if (typeof newOptions[item] !== 'undefined') {
				options[item] = newOptions[item];
			}
		}
		/* Apply new options */
		// Change transition for proper animation
		slider.style.transition = slider.style.webkitTransition = options.animation === 'fadeIn' ? 'opacity .4s ease' : options.animation === 'slideIn' ? '' : 'none';
		// Hide buttons if necessary
		if (options.buttons === 'auto' && ('ontouchstart' in window || imagesMap[currentGallery].length === 1)) {
			options.buttons = false;
		}
		// Set buttons style to hide or display them
		previousButton.style.display = nextButton.style.display = options.buttons ? '' : 'none';
		// Set overlay color
		overlay.style.backgroundColor = options.overlayBackgroundColor;
	}

	function showOverlay(chosenImageIndex) {
		if (options.noScrollbars) {
			document.body.style.overflow = 'hidden';
		}
		if (overlay.style.display === 'block') {
			return;
		}

		bind(document, 'keydown', keyDownHandler);
		currentIndex = chosenImageIndex;
		loadImage(currentIndex, function () {
			preloadNext(currentIndex);
			preloadPrev(currentIndex);
		});

		updateOffset();
		overlay.style.display = 'block';
		if (options.fullScreen) {
			enterFullScreen();
		}
		// Fade in overlay
		setTimeout(function () {
			overlay.className = 'visible';
			if (options.afterShow) {
				options.afterShow();
			}
		}, 50);
		if (options.onChange) {
			options.onChange(currentIndex, imagesElements.length);
		}
	}

	function enterFullScreen() {
		if (overlay.requestFullscreen) {
			overlay.requestFullscreen();
		} else if (overlay.webkitRequestFullscreen) {
			overlay.webkitRequestFullscreen();
		} else if (overlay.mozRequestFullScreen) {
			overlay.mozRequestFullScreen();
		}
	}

	function exitFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}

	function hideOverlay() {
		if (options.noScrollbars) {
			document.body.style.overflow = 'auto';
		}
		if (overlay.style.display === 'none') {
			return;
		}

		unbind(document, 'keydown', keyDownHandler);
		// Fade out and hide the overlay
		overlay.className = '';
		setTimeout(function () {
			overlay.style.display = 'none';
			exitFullscreen();
			if (options.afterHide) {
				options.afterHide();
			}
		}, 500);
	}

	function loadImage(index, callback) {
		var imageContainer = imagesElements[index];
		if (typeof imageContainer === 'undefined') {
			return;
		}

		// If image is already loaded run callback and return
		if (imageContainer.getElementsByTagName('img')[0]) {
			if (callback) {
				callback();
			}
			return;
		}
		// Get element reference, optional caption and source path
		imageElement = imagesMap[currentGallery][index];
		var imageCaption = typeof options.captions === 'function' ? options.captions.call(imagesMap[currentGallery], imageElement) : imageElement.getAttribute('data-caption') || imageElement.title;
		imageSrc = getImageSrc(imageElement);
		// Prepare image container elements
		var figure = create('figure');
		var image = create('img');
		var figcaption = create('figcaption');
		imageContainer.appendChild(figure);
		// Add loader element
		figure.innerHTML = '<div class="spinner">' + '<div class="double-bounce1"></div>' + '<div class="double-bounce2"></div>' + '</div>';
		// Set callback function when image loads
		image.onload = function () {
			// Remove loader element
			var spinner = document.querySelector('#baguette-img-' + index + ' .spinner');
			figure.removeChild(spinner);
			if (!options.async && callback) {
				callback();
			}
		};
		image.setAttribute('src', imageSrc);
		if (options.titleTag && imageCaption) {
			image.title = imageCaption;
		}
		figure.appendChild(image);
		// Insert caption if available
		if (options.captions && imageCaption) {
			figcaption.innerHTML = imageCaption;
			figure.appendChild(figcaption);
		}
		// Run callback
		if (options.async && callback) {
			callback();
		}
	}

	// Get image source location, mostly used for responsive images
	function getImageSrc(image) {
		// Set default image path from href
		var result = imageElement.href;
		// If dataset is supported find the most suitable image
		if (image.dataset) {
			var srcs = [];
			// Get all possible image versions depending on the resolution
			for (var item in image.dataset) {
				if (item.substring(0, 3) === 'at-' && !isNaN(item.substring(3))) {
					srcs[item.replace('at-', '')] = image.dataset[item];
				}
			}
			// Sort resolutions ascending
			var keys = Object.keys(srcs).sort(function (a, b) {
				return parseInt(a) < parseInt(b) ? -1 : 1;
			});
			// Get real screen resolution
			var width = window.innerWidth * window.devicePixelRatio;
			// Find the first image bigger than or equal to the current width
			var i = 0;
			while (i < keys.length - 1 && keys[i] < width) {
				i++;
			}
			result = srcs[keys[i]] || result;
		}
		return result;
	}

	// Return false at the right end of the gallery
	function showNextImage() {
		var returnValue;
		// Check if next image exists
		if (currentIndex <= imagesElements.length - 2) {
			currentIndex++;
			updateOffset();
			preloadNext(currentIndex);
			returnValue = true;
		} else if (options.animation) {
			slider.className = 'bounce-from-right';
			setTimeout(function () {
				slider.className = '';
			}, 400);
			returnValue = false;
		}
		if (options.onChange) {
			options.onChange(currentIndex, imagesElements.length);
		}
		return returnValue;
	}

	// Return false at the left end of the gallery
	function showPreviousImage() {
		var returnValue;
		// Check if previous image exists
		if (currentIndex >= 1) {
			currentIndex--;
			updateOffset();
			preloadPrev(currentIndex);
			returnValue = true;
		} else if (options.animation) {
			slider.className = 'bounce-from-left';
			setTimeout(function () {
				slider.className = '';
			}, 400);
			returnValue = false;
		}
		if (options.onChange) {
			options.onChange(currentIndex, imagesElements.length);
		}
		return returnValue;
	}

	function updateOffset() {
		var offset = -currentIndex * 100 + '%';
		if (options.animation === 'fadeIn') {
			slider.style.opacity = 0;
			setTimeout(function () {
				/*jshint -W030 */
				supports.transforms ? slider.style.transform = slider.style.webkitTransform = 'translate3d(' + offset + ',0,0)' : slider.style.left = offset;
				slider.style.opacity = 1;
			}, 400);
		} else {
			/*jshint -W030 */
			supports.transforms ? slider.style.transform = slider.style.webkitTransform = 'translate3d(' + offset + ',0,0)' : slider.style.left = offset;
		}
	}

	// CSS 3D Transforms test
	function testTransformsSupport() {
		var div = create('div');
		return typeof div.style.perspective !== 'undefined' || typeof div.style.webkitPerspective !== 'undefined';
	}

	// Inline SVG test
	function testSVGSupport() {
		var div = create('div');
		div.innerHTML = '<svg/>';
		return (div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
	}

	function preloadNext(index) {
		if (index - currentIndex >= options.preload) {
			return;
		}
		loadImage(index + 1, function () {
			preloadNext(index + 1);
		});
	}

	function preloadPrev(index) {
		if (currentIndex - index >= options.preload) {
			return;
		}
		loadImage(index - 1, function () {
			preloadPrev(index - 1);
		});
	}

	function bind(element, event, callback) {
		if (element.addEventListener) {
			element.addEventListener(event, callback, false);
		} else // IE8 fallback
			{
				element.attachEvent('on' + event, callback);
			}
	}

	function unbind(element, event, callback) {
		if (element.removeEventListener) {
			element.removeEventListener(event, callback, false);
		} else // IE8 fallback
			{
				element.detachEvent('on' + event, callback);
			}
	}

	function getByID(id) {
		return document.getElementById(id);
	}

	function create(element) {
		return document.createElement(element);
	}

	function destroyPlugin() {
		unbindEvents();
		unbindImageClickListeners();
		unbind(document, 'keydown', keyDownHandler);
		document.getElementsByTagName('body')[0].removeChild(document.getElementById('baguetteBox-overlay'));
		currentIndex = 0;
		currentGallery = -1;
		galleries.length = 0;
		imagesMap.length = 0;
	}

	return {
		run: run,
		destroy: destroyPlugin,
		showNext: showNextImage,
		showPrevious: showPreviousImage
	};
});

},{}],2:[function(require,module,exports){
// Font Observer
// @link https://github.com/bramstein/fontfaceobserver
"use strict";

(function () {
	'use strict';
	var f,
	    g = [];

	function l(a) {
		g.push(a);
		1 == g.length && f();
	}

	function m() {
		for (; g.length;) {
			g[0](), g.shift();
		}
	}

	f = function () {
		setTimeout(m);
	};
	function n(a) {
		this.a = p;
		this.b = void 0;
		this.f = [];
		var b = this;
		try {
			a(function (a) {
				q(b, a);
			}, function (a) {
				r(b, a);
			});
		} catch (c) {
			r(b, c);
		}
	}

	var p = 2;

	function t(a) {
		return new n(function (b, c) {
			c(a);
		});
	}

	function u(a) {
		return new n(function (b) {
			b(a);
		});
	}

	function q(a, b) {
		if (a.a == p) {
			if (b == a) {
				throw new TypeError();
			}
			var c = !1;
			try {
				var d = b && b.then;
				if (null != b && "object" == typeof b && "function" == typeof d) {
					d.call(b, function (b) {
						c || q(a, b);
						c = !0;
					}, function (b) {
						c || r(a, b);
						c = !0;
					});
					return;
				}
			} catch (e) {
				c || r(a, e);
				return;
			}
			a.a = 0;
			a.b = b;
			v(a);
		}
	}

	function r(a, b) {
		if (a.a == p) {
			if (b == a) {
				throw new TypeError();
			}
			a.a = 1;
			a.b = b;
			v(a);
		}
	}

	function v(a) {
		l(function () {
			if (a.a != p) {
				for (; a.f.length;) {
					var b = a.f.shift(),
					    c = b[0],
					    d = b[1],
					    e = b[2],
					    b = b[3];
					try {
						0 == a.a ? "function" == typeof c ? e(c.call(void 0, a.b)) : e(a.b) : 1 == a.a && ("function" == typeof d ? e(d.call(void 0, a.b)) : b(a.b));
					} catch (h) {
						b(h);
					}
				}
			}
		});
	}

	n.prototype.g = function (a) {
		return this.c(void 0, a);
	};
	n.prototype.c = function (a, b) {
		var c = this;
		return new n(function (d, e) {
			c.f.push([a, b, d, e]);
			v(c);
		});
	};
	function w(a) {
		return new n(function (b, c) {
			function d(c) {
				return function (d) {
					h[c] = d;
					e += 1;
					e == a.length && b(h);
				};
			}

			var e = 0,
			    h = [];
			0 == a.length && b(h);
			for (var k = 0; k < a.length; k += 1) {
				u(a[k]).c(d(k), c);
			}
		});
	}

	function x(a) {
		return new n(function (b, c) {
			for (var d = 0; d < a.length; d += 1) {
				u(a[d]).c(b, c);
			}
		});
	};
	window.Promise || (window.Promise = n, window.Promise.resolve = u, window.Promise.reject = t, window.Promise.race = x, window.Promise.all = w, window.Promise.prototype.then = n.prototype.c, window.Promise.prototype["catch"] = n.prototype.g);
})();

(function () {
	'use strict';
	var h = !!document.addEventListener;

	function k(a, b) {
		h ? a.addEventListener("scroll", b, !1) : a.attachEvent("scroll", b);
	}

	function w(a) {
		document.body ? a() : h ? document.addEventListener("DOMContentLoaded", a) : document.onreadystatechange = function () {
			"interactive" == document.readyState && a();
		};
	};
	function x(a) {
		this.a = document.createElement("div");
		this.a.setAttribute("aria-hidden", "true");
		this.a.appendChild(document.createTextNode(a));
		this.b = document.createElement("span");
		this.c = document.createElement("span");
		this.h = document.createElement("span");
		this.f = document.createElement("span");
		this.g = -1;
		this.b.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
		this.c.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
		this.f.style.cssText = "display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
		this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;";
		this.b.appendChild(this.h);
		this.c.appendChild(this.f);
		this.a.appendChild(this.b);
		this.a.appendChild(this.c);
	}

	function y(a, b) {
		a.a.style.cssText = "min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:" + b + ";";
	}

	function z(a) {
		var b = a.a.offsetWidth,
		    c = b + 100;
		a.f.style.width = c + "px";
		a.c.scrollLeft = c;
		a.b.scrollLeft = a.b.scrollWidth + 100;
		return a.g !== b ? (a.g = b, !0) : !1;
	}

	function A(a, b) {
		function c() {
			var a = l;
			z(a) && null !== a.a.parentNode && b(a.g);
		}

		var l = a;
		k(a.b, c);
		k(a.c, c);
		z(a);
	};
	function B(a, b) {
		var c = b || {};
		this.family = a;
		this.style = c.style || "normal";
		this.weight = c.weight || "normal";
		this.stretch = c.stretch || "normal";
	}

	var C = null,
	    D = null,
	    H = !!window.FontFace;

	function I() {
		if (null === D) {
			var a = document.createElement("div");
			try {
				a.style.font = "condensed 100px sans-serif";
			} catch (b) {}
			D = "" !== a.style.font;
		}
		return D;
	}

	function J(a, b) {
		return [a.style, a.weight, I() ? a.stretch : "", "100px", b].join(" ");
	}

	B.prototype.a = function (a, b) {
		var c = this,
		    l = a || "BESbswy",
		    E = b || 3E3,
		    F = new Date().getTime();
		return new Promise(function (a, b) {
			if (H) {
				var q = function q() {
					new Date().getTime() - F >= E ? b(c) : document.fonts.load(J(c, c.family), l).then(function (b) {
						1 <= b.length ? a(c) : setTimeout(q, 25);
					}, function () {
						b(c);
					});
				};
				q();
			} else {
				w(function () {
					function r() {
						var b;
						if (b = -1 != e && -1 != f || -1 != e && -1 != g || -1 != f && -1 != g) {
							(b = e != f && e != g && f != g) || (null === C && (b = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), C = !!b && (536 > parseInt(b[1], 10) || 536 === parseInt(b[1], 10) && 11 >= parseInt(b[2], 10))), b = C && (e == t && f == t && g == t || e == u && f == u && g == u || e == v && f == v && g == v)), b = !b;
						}
						b && (null !== d.parentNode && d.parentNode.removeChild(d), clearTimeout(G), a(c));
					}

					function q() {
						if (new Date().getTime() - F >= E) {
							null !== d.parentNode && d.parentNode.removeChild(d), b(c);
						} else {
							var a = document.hidden;
							if (!0 === a || void 0 === a) {
								e = m.a.offsetWidth, f = n.a.offsetWidth, g = p.a.offsetWidth, r();
							}
							G = setTimeout(q, 50);
						}
					}

					var m = new x(l),
					    n = new x(l),
					    p = new x(l),
					    e = -1,
					    f = -1,
					    g = -1,
					    t = -1,
					    u = -1,
					    v = -1,
					    d = document.createElement("div"),
					    G = 0;
					d.dir = "ltr";
					y(m, J(c, "sans-serif"));
					y(n, J(c, "serif"));
					y(p, J(c, "monospace"));
					d.appendChild(m.a);
					d.appendChild(n.a);
					d.appendChild(p.a);
					document.body.appendChild(d);
					t = m.a.offsetWidth;
					u = n.a.offsetWidth;
					v = p.a.offsetWidth;
					q();
					A(m, function (a) {
						e = a;
						r();
					});
					y(m, J(c, '"' + c.family + '",sans-serif'));
					A(n, function (a) {
						f = a;
						r();
					});
					y(n, J(c, '"' + c.family + '",serif'));
					A(p, function (a) {
						g = a;
						r();
					});
					y(p, J(c, '"' + c.family + '",monospace'));
				});
			}
		});
	};
	window.FontFaceObserver = B;
	window.FontFaceObserver.prototype.check = B.prototype.a;
	"undefined" !== typeof module && (module.exports = window.FontFaceObserver);
})();

},{}],3:[function(require,module,exports){
// Navigation  _________________________________________
// responsive navigation

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function hasClass(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	} else {
		return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
}

function addClass(el, className) {
	if (el.classList) {
		el.classList.add(className);
	} else if (!hasClass(el, className)) {
		el.className += " " + className;
	}
}

function removeClass(el, className) {
	if (el.classList) {
		el.classList.remove(className);
	} else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
}

function toggleClass(el, className) {
	if (el.classList) {
		el.classList.toggle(className);
	} else {
		if (hasClass(el, className)) {
			removeClass(el, className);
		} else {
			addClass(el, className);
		}
	}
}

function bind(element, event, callback) {
	if (element.addEventListener) {
		element.addEventListener(event, callback, false);
	} else // IE8 fallback
		{
			element.attachEvent('on' + event, callback);
		}
}

var SELECTORS = {
	menuItem: 'menu-item-has-children',
	subNavigationIsVisible: 'chrico-sub-navigation--is-visible',
	navigationIsVisible: 'chrico-navigation--is-visible',
	toggleIsActive: 'chrico-navigation__toggle--is-active',
	toggle: 'chrico-navigation__toggle'
};

var EventHandlers = (function () {
	function EventHandlers() {
		_classCallCheck(this, EventHandlers);
	}

	// onClick the toggle Button to show/hide the navigation.

	EventHandlers.toggle = function toggle(e) {
		e.preventDefault();
		toggleClass(this.$toggleButton, SELECTORS.toggleIsActive);
		toggleClass(document.body, SELECTORS.navigationIsVisible);
	};

	// onMouseleave show the sub-navigation.

	EventHandlers.show = function show() {
		addClass(this, SELECTORS.subNavigationIsVisible);
	};

	// onMouseenter hide the sub-navigation.

	EventHandlers.hide = function hide() {
		removeClass(this, SELECTORS.subNavigationIsVisible);
	};

	return EventHandlers;
})();

var Navigation = (function () {
	function Navigation() {
		_classCallCheck(this, Navigation);

		this.$toggleButton = document.getElementById(SELECTORS.toggle);
		this.$menuItem = document.getElementsByClassName(SELECTORS.menuItem);

		this.registerToggleEvents();
		this.registerHoverEvents();
	}

	Navigation.prototype.registerToggleEvents = function registerToggleEvents() {
		bind(this.$toggleButton, 'click', EventHandlers.toggle.bind(this));
	};

	Navigation.prototype.registerHoverEvents = function registerHoverEvents() {
		[].forEach.call(this.$menuItem, function ($element) {
			bind($element, 'mouseenter', EventHandlers.show);
			bind($element, 'mouseleave', EventHandlers.hide);
		});
	};

	return Navigation;
})();

exports['default'] = Navigation;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Baguette = require('./Baguette');

var _Baguette2 = _interopRequireDefault(_Baguette);

var _FontFaceObserver = require('./FontFaceObserver');

var _FontFaceObserver2 = _interopRequireDefault(_FontFaceObserver);

var _NavigationJs = require('./Navigation.js');

var _NavigationJs2 = _interopRequireDefault(_NavigationJs);

// init fonts
var observer = new FontFaceObserver('Imprima', {});
observer.check().then(function () {
	document.body.className += " font-imprima--is-loaded";
});

// init navigation
new _NavigationJs2['default']();

// init gallery
_Baguette2['default'].run('.chrico-gallery');

},{"./Baguette":1,"./FontFaceObserver":2,"./Navigation.js":3}]},{},[4]);
