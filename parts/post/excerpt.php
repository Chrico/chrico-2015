<?php
/**
 * Post thumbnail for a post
 *
 * @package ChriCo\Parts\Post
 */

if ( get_the_excerpt() === '' ) :
	return;
endif;
?>
<div class="chrico-post__excerpt">
	<?php the_excerpt(); ?>
</div>