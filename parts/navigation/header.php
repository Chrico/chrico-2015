<?php
/**
 * Navigation header template.
 *
 * @package ChriCo\Parts\Navigation
 */

$items_wrap = '';
$items_wrap .= '<a id="chrico-navigation__toggle" class="chrico-navigation__toggle" href="#chrico-navigation__header" title="' . __( 'Menü', 'theme_chrico' ) . '"><span></span></a>';
$items_wrap .= '<nav id="chrico-navigation__header" class="chrico-navigation chrico-navigation__header" role="navigation">';
$items_wrap .= '<ul id="%1$s" class="%2$s chrico-navigation__header-list">%3$s</ul>';
$items_wrap .= '</nav>';

$nav_args = array(
	'theme_location' => 'chrico_main',
	'container'      => FALSE,
	'depth'          => 2,
	'items_wrap'     => $items_wrap,
	'walker'         => new ChriCo_Frontend_Walker_Navigation()
);
wp_nav_menu( $nav_args );
