<?php
/**
 * Render post content
 *
 * @package ChriCo
 */
?>
<div class="chrico-post__content">
	<?php
		the_content();
		get_template_part( 'parts/post', 'author' );
		comments_template( '', true );
	?>
</div>