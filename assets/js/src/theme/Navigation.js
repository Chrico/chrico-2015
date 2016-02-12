'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Navigation  _________________________________________
// responsive navigation
(function () {
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

	var EventHandlers = function () {
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
	}();

	var Navigation = function () {
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
	}();

	new Navigation();
})();
