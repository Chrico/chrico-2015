<?php
/**
 * Pagination for pages.
 *
 * @package ChriCo\Parts\Pagination
 */

$args = array(
	'before'         => '<nav class="chrico-pagination__page">',
	'after'          => '</nav>',
	'next_or_number' => 'number',
);
wp_link_pages( $args );
