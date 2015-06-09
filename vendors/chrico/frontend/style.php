<?php
/**
 * Feature Name:    Style Functions for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */


/**
 * Converts the main style{prefix}.css as inline-style.
 *
 * @wp-hook style_loader_tag
 *
 * @param   string $html   the <link id="" rel="" href="">-html
 * @param   string $handle the name of the current handle
 *
 * @return string $html     the converted <style id=""> { content of href } </style>
 */
function chrico_filter_style_loader_tag_above_the_fold( $html, $handle ) {
	global $wp_styles;

	if ( $handle === 'chrico' && isset( $wp_styles->registered['chrico'] ) ) {
		$style   = $wp_styles->registered['chrico'];
		$id      = esc_attr( $handle . '-css' );
		$version = esc_attr( $style->ver );

		$html = '<style id="' . $id . '" data-version="' . $version . '">';
		$html .= file_get_contents( $style->src );
		$html .= '</style>';
	}

	return $html;
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
	$styles['chrico'] = array(
		'src'     => get_template_directory_uri() . '/assets/css/style' . $suffix . '.css',
		'deps'    => null,
		'version' => chrico_get_script_version(),
		'media'   => null
	);

	return apply_filters( 'chrico_get_styles', $styles );
}
