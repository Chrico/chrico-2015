// Navigation  _________________________________________
// responsive navigation

function hasClass( el, className ) {
	if ( el.classList ) {
		return el.classList.contains( className );
	}
	else {
		return !!el.className.match( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) )
	}
}

function addClass( el, className ) {
	if ( el.classList ) {
		el.classList.add( className );
	}
	else if ( !hasClass( el, className ) ) {
		el.className += " " + className;
	}
}

function removeClass( el, className ) {
	if ( el.classList ) {
		el.classList.remove( className );
	} else if ( hasClass( el, className ) ) {
		var reg = new RegExp( '(\\s|^)' + className + '(\\s|$)' );
		el.className = el.className.replace( reg, ' ' )
	}
}

function toggleClass( el, className ) {
	if ( el.classList ) {
		el.classList.toggle( className );
	}
	else {
		if ( hasClass( el, className ) ) {
			removeClass( el, className );
		}
		else {
			addClass( el, className );
		}
	}
}

function bind( element, event, callback ) {
	if ( element.addEventListener ) {
		element.addEventListener( event, callback, false );
	} else // IE8 fallback
	{
		element.attachEvent( 'on' + event, callback );
	}
}

const SELECTORS = {
	menuItem              : 'menu-item-has-children',
	subNavigationIsVisible: 'chrico-sub-navigation--is-visible',
	navigationIsVisible   : 'chrico-navigation--is-visible',
	toggleIsActive        : 'chrico-navigation__toggle--is-active',
	toggle                : 'chrico-navigation__toggle'
};

class EventHandlers {
	// onClick the toggle Button to show/hide the navigation.
	static toggle( e ) {
		e.preventDefault();
		toggleClass( this.$toggleButton, SELECTORS.toggleIsActive );
		toggleClass( document.body, SELECTORS.navigationIsVisible );
	}

	// onMouseleave show the sub-navigation.
	static show() {
		addClass( this, SELECTORS.subNavigationIsVisible );
	}

	// onMouseenter hide the sub-navigation.
	static hide() {
		removeClass( this, SELECTORS.subNavigationIsVisible );
	}
}

class Navigation {

	constructor() {

		this.$toggleButton = document.getElementById( SELECTORS.toggle );
		this.$menuItem = document.getElementsByClassName( SELECTORS.menuItem );

		this.registerToggleEvents();
		this.registerHoverEvents();
	}

	registerToggleEvents() {
		bind( this.$toggleButton, 'click', EventHandlers.toggle.bind( this ) );
	}

	registerHoverEvents() {
		[].forEach.call( this.$menuItem, function( $element ) {
			bind( $element, 'mouseenter', EventHandlers.show );
			bind( $element, 'mouseleave', EventHandlers.hide )
		} );
	}
}

new Navigation();
