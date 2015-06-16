<?php
/**
 * Render the search form.
 *
 * This file will be used by the search widget too.
 *
 * @package ChriCo
 */
?>
<div class="chrico-search">
	<?php
	$search_url = esc_url( home_url( '/' ) );
	?>
	<form class="chrico-search__form" action="<?php echo $search_url; ?>" role="search">
		<?php
		// If the search field has a value, this gets an additional class.
		$class = '';
		if ( '' !== get_search_query() ) :
			$class = 'chrico-search__label--has-value';
		endif;
		?>
		<span class="chrico-search__field <?php echo $class; ?>">
			<input  id="s" name="s" type="text" class="chrico-search__input" value="<?php the_search_query(); ?>" autocomplete="off" />

			<label class="chrico-search__label" for="s">
				<span class="chrico-search__label-text">
					<?php
					if ( get_search_query() === '' ) :
						echo _x(
							'Blog durchsuchen',
							'Search field label (empty)',
							'theme_chrico'
						);
					else :
						echo _x(
							'Gefunden :)',
							'Search field label (filled out)',
							'theme_chrico'
						);
					endif;
					?>
				</span>
			</label>
			<svg class="chrico-search__svg" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
				<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
			</svg>
		</span>

		<button class="chrico-search__submit" type="submit">
			<?php echo chrico_get_icon( 'search' ); ?>
			<span class="screen-reader-text">
				<?php
				echo _x(
					'jetzt finden!',
					'Search form submit button',
					'theme_chrico'
				);
				?>
			</span>
		</button>
	</form>
</div>
