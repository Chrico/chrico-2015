import Baguette from './Baguette';
import FontObserver from './FontFaceObserver';
import Navigation from './Navigation.js';

// init fonts
const observer = new FontFaceObserver( 'Imprima', {} );
observer.check().then( function() {
	document.body.className += " font-imprima--is-loaded";
} );

// init navigation
new Navigation();

// init gallery
Baguette.run( '.chrico-gallery' );