// Gallery Popup-Stuff _________________________________________
// requires addon/baguette.js
//
(function () {
//	"use strict"; // jshint ~_~

	baguetteBox.run('.chrico-gallery'/*, {
		animation: 'fadeIn'
	}*/);

})();

// Navigation  _________________________________________
// responsive navigation
(function (doc) {
	"use strict"; // jshint ~_~

	var Navigation = {},
		classes = {
			menuItem              : 'menu-item-has-children',
			subNavigationIsVisible: 'chrico-sub-navigation--is-visible',
			navigationIsVisible   : 'chrico-navigation--is-visible',
			toggleIsActive        : 'chrico-navigation__toggle--is-active'
		},
		$toggleButton = doc.getElementById('chrico-navigation__toggle'),
		$menuItem = doc.getElementsByClassName(classes.menuItem),
		$body = doc.body;

	// initialize all events.
	Navigation.initialize = function () {
		Navigation.registerToggleEvents();
		Navigation.registerHoverEvents();
	};

	// contains all event handler for our Navigation.
	Navigation.HANDLER = {

		// onClick the toggle Button to show/hide the navigation.
		toggleNavigationVisibility: function (e) {
			e.preventDefault();
			$toggleButton.classList.toggle(classes.toggleIsActive);
			$body.classList.toggle(classes.navigationIsVisible);
		},

		// onMouseleave show the sub-navigation.
		showSubNavigation            : function () {
			this.classList.add(classes.subNavigationIsVisible);
		},

		// onMouseenter hide the sub-navigation.
		hideSubNavigation            : function () {
			this.classList.remove(classes.subNavigationIsVisible);
		}

	};

	// register the event on toggle-Button for mobile/tablet view to show/hide the Navigation.
	Navigation.registerToggleEvents = function () {
		bind($toggleButton, 'click', Navigation.HANDLER.toggleNavigationVisibility);
	};

	// register the mouseEnter/-Leave-HANDLER for show/hide the Sub-Navigation.
	Navigation.registerHoverEvents = function () {
		[].forEach.call($menuItem, function ($element) {
			bind($element, 'mouseenter', Navigation.HANDLER.showSubNavigation);
			bind($element, 'mouseleave', Navigation.HANDLER.hideSubNavigation)
		});
	};

	Navigation.initialize();

})(document);
