// Navigation  _________________________________________
// responsive navigation
( () => {
	const SELECTORS = {
		menuItem              : 'menu-item-has-children',
		subNavigationIsVisible: 'chrico-sub-navigation--is-visible',
		navigationIsVisible   : 'chrico-navigation--is-visible',
		toggleIsActive        : 'chrico-navigation__toggle--is-active',
		toggle                : 'chrico-navigation__toggle'
	};

	class EventHandlers {
		// onClick the toggle Button to show/hide the navigation.
		static toggleNavigationVisibility( e ) {
			e.preventDefault();
			this.$toggleButton.classList.toggle( classes.toggleIsActive );
			document.body.classList.toggle( classes.navigationIsVisible );
		}

		// onMouseleave show the sub-navigation.
		static showSubNavigation() {
			this.classList.add( classes.subNavigationIsVisible );
		}

		// onMouseenter hide the sub-navigation.
		static hideSubNavigation() {
			this.classList.remove( classes.subNavigationIsVisible );
		}
	}

	class Navigation {

		constructor(){

			this.$toggleButton = document.getElementById( SELECTORS.toggle );
			this.$menuItem = document.getElementsByClassName( SELECTORS.menuItem );

			this.registerToggleEvents();
			this.registerHoverEvents();
		}

		registerToggleEvents() {
			bind( this.$toggleButton, 'click', EventHandlers.toggleNavigationVisibility.bind(this) );
		}

		registerHoverEvents() {
			[].forEach.call( this.$menuItem, function( $element ) {
				bind( $element, 'mouseenter', EventHandlers.showSubNavigation );
				bind( $element, 'mouseleave', EventHandlers.hideSubNavigation )
			} );
		}
	}

	new Navigation();

})();