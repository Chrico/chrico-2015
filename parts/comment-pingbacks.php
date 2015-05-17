<?php
/**
 * Pings with favicons.
 *
 * @link http://wordpress.stackexchange.com/a/96596/23011
 * @package ChriCo
 */
if ( $num = chrico_get_count_pings() ) :
	?>
	<h3 class="chrico-pingbacks__title"><?php
		printf(
			_nx(
				'Ein pingback',
				'%d pingbacks',
				$num,
				'Pingbacks title',
				'theme_chrico'
			),
			$num
		);
		?>
	</h3>
	<ol class="chrico-pingbacks__list">
		<?php
		/**
		 * Custom callback applied adding pings as URLs with favicon.
		 */
		wp_list_comments(
			array (
				'type'        => 'pings',
				'style'       => 'ul',
				'callback'    => 'chrico_the_pings'
			)
		);
		?></ol>
<?php endif;
