<?php
/**
 * The comment form
 *
 * @package ChriCo/Parts/Comment
 */
?>

<?php
if ( comments_open() ) :
	$comment_form_args = array(
		'title_reply'         => __( 'Lass uns Deine Meinung wissen!', 'theme_chrico' ),
		'comment_notes_after' => ''
	);
	comment_form( $comment_form_args );
endif;
?>
