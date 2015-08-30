<?php
/**
 * Feature Name:    Widget Functions for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */

/**
 * Callback to register the Widgets
 *
 * @wp-hook widgets_init
 *
 * @return  Array
 */
function chrico_widgets_init() {

	// Define widget areas
	$sidebars = array(
		array(
			'name'          => __( 'Post-Widget-Bereich', 'theme_chrico' ),
			'id'            => 'cc-sidebar-post',
			'description'   => __( 'Sidebar für is_single (Beiträge)', 'chrico' ),
			'before_widget' => '<aside id="%1$s" class="chrico-widget chrico-widget__%2$s"><div class="chrico-widget__inner">',
			'after_widget'  => '</div></aside>',
			'before_title'  => '<h4 class="chrico-widget__title">',
			'after_title'   => '</h4>',
		),
		array(
			'name'          => __( 'Page-Widget-Bereich', 'theme_chrico' ),
			'id'            => 'cc-sidebar-page',
			'description'   => __( 'Sidebar für is_page (Seiten)', 'chrico' ),
			'before_widget' => '<aside id="%1$s" class="chrico-widget chrico-widget__%2$s"><div class="chrico-widget__inner">',
			'after_widget'  => '</div></aside>',
			'before_title'  => '<h4 class="chrico-widget__title">',
			'after_title'   => '</h4>',
		),
	);

	// Create widget areas
	foreach ( $sidebars as $id => $args ) {
		register_sidebar( $args );
	}

	// Return a value for unit tests
	return $GLOBALS[ 'wp_registered_sidebars' ];
}
