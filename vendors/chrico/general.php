<?php
/**
 * Feature Name:    General Template Helpers for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */

/**
 * getting the script suffix
 *
 * @return  String $suffix
 */
function chrico_get_script_suffix() {

	return defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
}


/**
 * getting the script version for debug- or live-mode
 *
 * @return  string
 */
function chrico_get_script_version() {

	if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		return time();
	}
	// getting the theme-data
	$theme_data = wp_get_theme();
	$version    = $theme_data->Version;

	return $version;
}

/**
 * Helper Function to print the Icons in Theme-Templates
 *
 * @since   0.1
 *
 * @param   String $icon
 *
 * @return  String
 */
function chrico_get_icon( $icon ) {

	$markup = '<svg class="icon icon-%1$s"><use xlink:href="#icon-%1$s"></use></svg>';
	$output = sprintf(
		$markup,
		esc_attr( $icon )
	);

	return apply_filters( 'chrico_get_icon', $output, $icon, $markup );
}

/**
 * Adding our svg-icons to wp_head
 *
 * @wp-hook wp_head
 * @return  Void
 */
function chrico_the_svg_icons() {

	?>
	<svg display="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
		width="752" height="80" viewBox="0 0 752 80">
		<symbol id="icon-search" viewBox="0 0 32 32">
			<path
				d="M18.188 1.313c-5.688 0-10.25 4.625-10.25 10.25 0 1.938 0.5 3.75 1.438 5.313l-4.938 4.938c-0.5 0.5-0.875 1.25-0.875 2.063 0 1.563 1.313 2.813 2.875 2.813 0.75 0 1.5-0.313 2-0.875v0.063l5.125-5.125c1.375 0.688 2.938 1.063 4.625 1.063 5.625 0 10.25-4.563 10.25-10.25 0-5.625-4.625-10.25-10.25-10.25zM18.25 17.75c-3.563 0-6.438-2.813-6.438-6.375 0-3.5 2.875-6.375 6.438-6.375 3.5 0 6.375 2.875 6.375 6.375 0 3.563-2.875 6.375-6.375 6.375z"></path>
		</symbol>
		<symbol id="icon-comment" viewBox="0 0 32 32">
			<path
				d="M32 14c0 2.063-0.688 4-2.125 5.75s-3.375 3.125-5.813 4.125c-2.5 1.063-5.188 1.563-8.063 1.563-0.813 0-1.688-0.063-2.563-0.125-2.375 2.063-5.125 3.5-8.25 4.313-0.563 0.125-1.25 0.25-2 0.375-0.25 0-0.438 0-0.563-0.188-0.188-0.125-0.25-0.25-0.313-0.5v0c-0.063-0.063-0.063-0.125 0-0.25 0-0.063 0-0.125 0-0.125 0-0.063 0.063-0.125 0.125-0.188l0.063-0.188c0 0 0.063-0.063 0.125-0.125 0.125-0.125 0.125-0.188 0.188-0.188 0.063-0.063 0.25-0.313 0.5-0.625 0.313-0.313 0.5-0.5 0.625-0.625 0.125-0.188 0.313-0.375 0.563-0.75 0.25-0.313 0.438-0.625 0.563-0.875 0.188-0.313 0.313-0.625 0.5-1.063s0.313-0.875 0.5-1.375c-1.875-1.063-3.375-2.375-4.438-3.938s-1.625-3.188-1.625-5c0-1.563 0.438-3 1.25-4.438 0.875-1.438 2-2.625 3.438-3.625 1.438-1.063 3.125-1.875 5.125-2.438 1.938-0.625 4-0.938 6.188-0.938 2.875 0 5.563 0.5 8.063 1.563 2.438 1 4.375 2.375 5.813 4.125s2.125 3.688 2.125 5.75z"></path>
		</symbol>
	</svg>
	<?php
}
