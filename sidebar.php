<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package ChriCo
 */
?>

<div class="chrico-sidebar chrico-sidebar__right" role="complementary">
	<?php
	if ( is_single() && is_active_sidebar( 'cc-sidebar-post' ) ) :
		dynamic_sidebar( 'cc-sidebar-post' );
	elseif ( is_page() && is_active_sidebar( 'cc-sidebar-page' ) ) :
		dynamic_sidebar( 'cc-sidebar-page' );
	endif;
	?>
</div>
