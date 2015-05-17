<?php
/**
 * Feature Name:    Style Functions for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */


/**
 * Remove file version query arguments from script/stylesheet URLs.
 *
 * Leaves http://fonts.googleapis.com/css?family=MyFont untouched.
 *
 * @link    http://wordpress.stackexchange.com/a/96325/
 * @link    http://wordpress.stackexchange.com/q/99842/
 *
 * @wp-hook style_loader_src
 *
 * @param   string $url
 * @param   string $handle
 *
 * @return  string
 */
function chrico_filter_style_loader_src( $url, $handle ) {
	$host = parse_url( $url, PHP_URL_HOST );

	if ( $host === 'fonts.googleapis.com' ) {
		return remove_query_arg( 'ver', $url );
	}

	return $url;
}


/**
 * Enqueue styles.
 *
 * @wp-hook wp_enqueue_scripts
 *
 * @return  Void
 */
function chrico_wp_enqueue_styles() {

	$styles = chrico_get_styles();

	foreach ( $styles as $key => $style ) {
		wp_enqueue_style(
			$key,
			$style['src'],
			$style['deps'],
			$style['version'],
			$style['media']
		);

	}
}


/**
 * Returning our Theme-Styles
 *
 * @since   0.1
 *
 * @return  Array
 */
function chrico_get_styles() {

	$suffix = chrico_get_script_suffix();

	// $handle => array( 'src' => $src, 'deps' => $deps, 'version' => $version, 'media' => $media )
	$styles = array();

	// adding the main-CSS
	$styles[ 'chrico' ] = array(
		'src'     => get_template_directory_uri() . '/assets/css/style' . $suffix . '.css',
		'deps'    => null,
		'version' => chrico_get_script_version(),
		'media'   => null
	);

	// adding our webfonts
	$query_args                = array( 'family' => 'Imprima:400,700' );
	$styles[ 'chrico-webfonts' ] = array(
		'src'     => add_query_arg( $query_args, "//fonts.googleapis.com/css" ),
		'deps'    => array(),
		'version' => chrico_get_script_version(),
		'media'   => null
	);

	return apply_filters( 'chrico_get_styles', $styles );
}
