<?php
/**
 * Entry header.
 *
 * @package ChriCo
 */
?>
<header class="chrico-post__header">
	<?php get_template_part( 'parts/post', 'thumbnail' ); ?>
	<?php get_template_part( 'parts/post', 'meta' ); ?>

	<?php
	if ( is_archive() || is_home() ) :
		$tag = 'h2';
	else:
		$tag = 'h1';
	endif;
	?>
	<<?php echo $tag; ?> class="chrico-post__title">
		<a class="chrico-post__link" href="<?php the_permalink() ?>" title="<?php echo esc_attr( the_title() ) ?>" rel="bookmark">
			<?php the_title(); ?>
		</a>
	</<?php echo $tag; ?>>
</header>
