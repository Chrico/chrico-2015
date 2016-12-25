<?php
/**
 * Feature Name:    Script Functions for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */

/**
 * Enqueue styles and scripts.
 *
 * @wp-hook wp_enqueue_scripts
 *
 * @return  Void
 */
function chrico_wp_enqueue_scripts() {

	global $wp_scripts;

	$scripts = chrico_get_scripts();

	foreach ( $scripts as $handle => $script ) {

		wp_enqueue_script(
			$handle,
			$script[ 'src' ],
			$script[ 'deps' ],
			$script[ 'version' ],
			$script[ 'in_footer' ]
		);

		// checking for localize script args
		if ( array_key_exists( 'localize', $script ) && ! empty( $script[ 'localize' ] ) ) {
			foreach ( $script[ 'localize' ] as $name => $args ) {
				wp_localize_script(
					$handle,
					$name,
					$args
				);
			}
		}

		if ( array_key_exists( 'data', $script ) ) {
			foreach ( $script[ 'data' ] as $key => $value ) {
				$wp_scripts->add_data( $handle, $key, $value );
			}
		}

	}
}

/**
 * Returning our Scripts
 *
 * @return  array $scripts
 */
function chrico_get_scripts() {

	$js_uri  = get_template_directory_uri() . '/assets/js/';
	$suffix  = chrico_get_script_suffix();
	$version = chrico_get_script_version();

	// $handle => array( 'src' => $src, 'deps' => $deps, 'version' => $version, 'in_footer' => $in_footer )
	$scripts = array();

	$scripts[ 'chrico' ] = array(
		'src'       => $js_uri . 'build' . $suffix . '.js',
		'deps'      => array(),
		'version'   => $version,
		'in_footer' => TRUE
	);

	// adding the theme stuff
	$scripts[ 'html5shiv' ] = array(
		'src'       => get_template_directory_uri() . '/assets/js/html5shiv' . $suffix . '.js',
		'deps'      => NULL,
		'version'   => '3.7.2',
		'in_footer' => FALSE,
		'data'      => array(
			'conditional' => 'IE 9'
		)
	);

	return apply_filters( 'chrico_get_scripts', $scripts );
}