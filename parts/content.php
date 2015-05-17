<?php
/**
 * The default template for displaying content. Used for both single and index/archive/search.
 *
 * @package ChriCo
 */
?>
<article <?php post_class(); ?>>
	<div class="chrico-post__inner">
		<?php
		get_template_part( 'parts/post', 'header' );
		get_template_part( 'parts/post', 'excerpt' );
		if ( is_singular() ) :
			get_template_part( 'parts/post', 'content' );
		endif;
		?>
	</div>
</article>
