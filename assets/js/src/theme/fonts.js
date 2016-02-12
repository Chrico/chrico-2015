// Fonts _________________________________________
// requires addon/fontobserver.js
//
(
	function( body ) {
		"use strict";
		var observer = new FontFaceObserver( 'Imprima', {} );
		observer.check().then( function() {
			body.classList.add( 'font-imprima--is-loaded' );
		} );
	}
)( document.body );