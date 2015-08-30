<?php
/**
 * The comments list
 *
 * @package ChriCo/Parts/Comment
 */
?>

<ol class="chrico-comments__list">
	<?php wp_list_comments(
		array(
			'type'     => 'comment',
			'callback' => 'chrico_the_comment',
			'style'    => 'ol'
		)
	); ?>
</ol>
