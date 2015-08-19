<?php
/**
 * Post post thumbnail
 *
 * @package    ChriCo\Parts\Post
 */

// We require content in the author bio field
if ( ! has_post_thumbnail() ) :
	return;
endif;
?>

<figure class="chrico-post__thumbnail">
	<?php if ( is_singular() ) : ?>

		<?php the_post_thumbnail( 'medium' ); ?>

	<?php else : ?>

		<a class="chrico-post__link chrico-post__thumbnail-link" href="<?php the_permalink() ?>"
			title="<?php echo esc_attr( the_title() ) ?>" rel="bookmark">
			<?php the_post_thumbnail( 'post-thumbnail' ); ?>
			<?php
			/*
			 * TODO: helle Bilder und weißer Text verträgt sich nicht. :-(
			 * <span class="chrico-post__link-read-more"><?php _e( 'Artikel lesen', 'theme_chrico' ); ?></span>
			 */
			?>
		</a>

	<?php endif; ?>

</figure>
