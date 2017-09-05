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

const webp = new Image();
webp.onerror = function() {
	document.body.className += ' no-webp'
};
webp.onload = function() {
	document.body.className += ' webp'
};
webp.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
