<?php
/**
 * Post meta data
 *
 * @package    ChriCo
 */

if ( is_page() )
	return;
?>
<p class="chrico-post__meta">
	<?php
		// Translators: used between list items, there is a space after the comma.
		$categories_list = get_the_category_list( __( ', ', 'theme_chrico' ) );

		$date = sprintf(
			'<time class="chrico-post__date" datetime="%1$s">%2$s</time>',
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() )
		);

		// comments
		$comment_number = get_comments_number();

		$comment_text = '<a href="' . get_comments_link() .'" title="'. __( 'Das denkt Ihr über diesen Beitrag', 'theme_chrico' ) . '">';
		$comment_text .= $comment_number . ' ';
		$comment_text .= chrico_get_icon( 'comment' );
		$comment_text .= ' <span class="screen-reader-text">';
		$comment_text .= _n( 'Meinung', 'Meinungen', $comment_number, 'theme_chrico' );
		$comment_text .= '</a>';

		// Translators: 1 is category, 2 is the date and 3 is the author's name, 4 is the comment link
		printf(
			_x( '%1$s | %2$s | %3$s', 'post meta strings for categories_list, post_date, comments_text', 'theme_chrico' ),
			$categories_list,
			$date,
			$comment_text
		);
	?>
</p>
