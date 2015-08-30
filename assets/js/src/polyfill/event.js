// non-jquery bind-method for events _________________________________________
//
function bind( element, event, callback ) {
	if ( element.addEventListener ) {
		element.addEventListener( event, callback, false );
	} else // IE8 fallback
	{
		element.attachEvent( 'on' + event, callback );
	}
}
