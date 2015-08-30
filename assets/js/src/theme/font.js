// Fonts _________________________________________
// requires polyfill/fontobserver.js
//
(
	function( body ) {
		//	"use strict"; // jshint ~_~
		var observer = new FontFaceObserver( 'Imprima', {} );
		observer.check().then( function() {
			body.classList.add( 'font-imprima--is-loaded' );
		} );

	}
)( document.body );
