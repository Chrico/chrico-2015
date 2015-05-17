<?php
/**
 * The main template file.
 *
 * @package ChriCo
 */

get_header();

if ( have_posts() ) :

	while( have_posts() ) : the_post();
		get_template_part( 'parts/content', get_post_format() );
	endwhile;

	get_template_part( 'parts/pagination', 'site' );

endif;

get_footer();
