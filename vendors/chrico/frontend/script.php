<?php
/**
 * Feature Name:    Script Functions for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */


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
			$script['src'],
			$script['deps'],
			$script['version'],
			$script['in_footer']
		);

		// checking for localize script args
		if ( array_key_exists( 'localize', $script ) && ! empty( $script['localize'] ) ) {
			foreach ( $script['localize'] as $name => $args ) {
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
 * @return  Array $scripts
 */
function chrico_get_scripts() {
	$suffix = chrico_get_script_suffix();

	// $handle => array( 'src' => $src, 'deps' => $deps, 'version' => $version, 'in_footer' => $in_footer )
	$scripts = array();

	// adding some polyfills
	$scripts['chrico-polyfills'] = array(
		'src'       => get_template_directory_uri() . '/assets/js/polyfills' . $suffix . '.js',
		'deps'      => null,
		'version'   => chrico_get_script_version(),
		'in_footer' => true
	);

	// adding some addons
	$scripts['chrico-addons'] = array(
		'src'       => get_template_directory_uri() . '/assets/js/addons' . $suffix . '.js',
		'deps'      => array( 'chrico-polyfills' ),
		'version'   => chrico_get_script_version(),
		'in_footer' => true
	);

	// adding the theme stuff
	$scripts['chrico-theme'] = array(
		'src'       => get_template_directory_uri() . '/assets/js/theme' . $suffix . '.js',
		'deps'      => array( 'chrico-polyfills', 'chrico-addons' ),
		'version'   => chrico_get_script_version(),
		'in_footer' => true
	);

	// adding the theme stuff
	$scripts['html5shiv'] = array(
		'src'       => get_template_directory_uri() . '/assets/js/html5shiv' . $suffix . '.js',
		'deps'      => null,
		'version'   => '3.7.2',
		'in_footer' => false,
		'data'      => array(
			'conditional' => 'IE 9'
		)
	);

	return apply_filters( 'chrico_get_scripts', $scripts );
}

/**
 * Adding html5shiv to the header for older IE's
 *
 * @since   1.0.1
 * @wp-hook wp_print_scripts
 * @return  void
 */
function chrico_filter_wp_print_scripts_add_html5shiv() {
	echo '<script async> document.documentElement.className = document.documentElement.className.replace("no-js","js");</script>';
}
