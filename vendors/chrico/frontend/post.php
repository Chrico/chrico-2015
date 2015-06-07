<?php
/**
 * Feature Name:    Post Functions for solingen-Theme
 * Version:		    0.1
 * Author:		    Inpsyde GmbH for MarketPress.com
 * Author URI:	    http://inpsyde.com/
 */


/**
 * Adding custom classes to post
 * @wp-hook post_class
 *
 * @param   array $classes
 *
 * @return  array $classes
 */
function chrico_filter_post_class( $classes ) {

	if ( is_singular() ) {
		$classes[] = 'chrico-post--is-singular';
	} else  {
		$classes[] = 'chrico-post--is-archive';
	}

	return $classes;
}

/**
 * Callback for the excerpt_more
 *
 * @wp-hook excerpt_more
 *
 * @param   Integer $length
 * @return  String
 */
function chrico_filter_excerpt_more( $length ) {
	return '';
}
