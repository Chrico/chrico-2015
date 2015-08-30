<?php
/**
 * Feature Name:    Navigation Helper Functions for cc-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */

/**
 * Registering the nav_menus to our blog
 *
 * @uses    register_nav_menu
 */
function chrico_register_nav_menus() {

	register_nav_menus(
		array(
			'chrico_main'   => _x( 'Navigation im Header', 'Navigation title', 'theme_chrico' ),
			'chrico_footer' => __( 'Navigation im Footer', 'Navigation title', 'theme_chrico' ),
		)
	);

}
