<?php
/**
 * The main template file.
 *
 * @package ChriCo
 */

get_header();

if ( is_archive() ) : ?>
	<h1 class="chrico-archive__title"><?php echo single_cat_title( "", false ); ?></h1>
<?php endif; ?>

	<div class="chrico-main__content">
		<?php
		if ( have_posts() ) :

			while ( have_posts() ) : the_post();
				get_template_part( 'parts/content', get_post_format() );
			endwhile;

			get_template_part( 'parts/pagination', 'site' );

		endif;
		?>
	</div>

<?php
get_footer();
