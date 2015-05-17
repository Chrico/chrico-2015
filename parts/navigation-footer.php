<?php
/**
 * Navigation footer template.
 *
 * @package ChriCo
 */

$items_wrap = '';
$items_wrap .= '<nav class="chrico-navigation chrico-navigation__footer" role="navigation">';
$items_wrap .= '<ul id="%1$s" class="%2$s chrico-navigation__footer-list">';
$items_wrap .= '<li>' . __( '© ChriCo - seit 2008', 'theme_chrico' ) . '</li>';
$items_wrap .= '%3$s</ul>';
$items_wrap .= '</nav>';

$nav_args = array(
	'theme_location' => 'chrico_footer',
	'container'      => false,
	'depth'          => 1,
	'items_wrap'     => $items_wrap,
);
wp_nav_menu( $nav_args );
