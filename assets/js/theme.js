// Gallery Popup-Stuff _________________________________________
// requires addon/baguette.js
//
(function () {
	"use strict"; // jshint ~_~

	baguetteBox.run('.chrico-gallery', {
		animation: 'fadeIn'
	});

})();

// Navigation  _________________________________________
// responsive navigation
//
(function (doc) {
	"use strict"; // jshint ~_~

	var Navigation = {},
		classes = {
			menuItem : 'menu-item-has-children',
			isVisible: 'chrico-navigation--is-visible',
			isActive : 'chrico-navigation__toggle--is-active'
		},
		$toggle = doc.getElementById('chrico-navigation__toggle'),
		$menuItem = doc.getElementsByClassName(classes.menuItem),
		$body = doc.body;

	// initialize all events.
	Navigation.initialize = function () {
		Navigation.registerToggleEvent();
		Navigation.registerHoverEvent();
	};

	// register the event on toggle-Button for mobile/tablet view to show/hide the Navigation.
	Navigation.registerToggleEvent = function () {
		bind(
			$toggle,
			'click',
			function (e) {
				e.preventDefault();
				$toggle.classList.toggle(classes.isActive);
				$body.classList.toggle(classes.isVisible);
			}
		);
	};

	// register the mouseEnter/-Leave-Event for show/hide the Sub-Navigation.
	Navigation.registerHoverEvent = function () {
		[].forEach.call($menuItem, function ($element) {
			bind(
				$element,
				'mouseenter',
				function () {
					this.classList.add(classes.isVisible);
				}
			);
			bind(
				$element,
				'mouseleave',
				function () {
					this.classList.remove(classes.isVisible);
				}
			)
		});
	};

})(document);
