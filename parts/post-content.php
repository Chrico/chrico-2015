<?php
/**
 * Render post content
 *
 * @package ChriCo
 */
?>
<div class="chrico-post__content">
	<?php the_content(); ?>
</div>
<?php if ( is_page() ) :
	get_template_part( 'parts/pagination', 'page' );
endif;
