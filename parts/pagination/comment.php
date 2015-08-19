<?php
/**
 * Pagination for comments.
 *
 * @package ChriCo\Parts\Pagination
 */

$args = array(
	'mid_size'  => 2,
	'type'      => 'list',
	'prev_text' => sprintf(
		'<div class="chrico-pagination--previous chrico-pagination__comments--previous">%s</div>',
		__( '&larr; Ältere Kommentare', 'theme_chrico' )
	),
	'next_text' => sprintf(
		'<div class="chrico-pagination--next chrico-pagination__comments--next">%s</div>',
		__( 'Neuere Kommentare &rarr;', 'theme_chrico' )
	),
);
?>
<nav class="chrico-pagination chrico-pagination__comments" role="navigation">
	<?php
	paginate_comments_links( $args );
	?>
</nav>
