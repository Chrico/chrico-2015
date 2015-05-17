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

	var $toggle = document.getElementById('chrico-navigation__toggle'),
		$menuItem = document.getElementsByClassName('menu-item-has-children');

	bind(
		$toggle,
		'click',
		function (e) {
			e.preventDefault();
			$toggle.classList.toggle('chrico-navigation__toggle--is-active');
			doc.body.classList.toggle('chrico-navigation--is-visible');
		}
	);

	[].forEach.call($menuItem, function ($element) {
		bind(
			$element,
			'mouseenter',
			function () {
				this.classList.add('chrico-sub-navigation--is-visible');
			}
		);
		bind(
			$element,
			'mouseleave',
			function () {
				this.classList.remove('chrico-sub-navigation--is-visible');
			}
		)


	});

})(document);
