<?php

/**
 * Class Chrico_Frontend_Widget_Author
 */
class Chrico_Frontend_Widget_Author extends \WP_Widget {

	/**
	 * Start the widget.
	 *
	 * @return Chrico_Frontend_Widget_Author
	 */
	public function __construct() {

		parent::__construct(
			'chrico-author-widget',
			_x( 'Chrico Author Widget', 'widget title', 'chrico-author-widget' ),
			array(
				'classname'   => 'chrico-author-widget-author-posts',
				'description' => __( 'The widget shows on single posts the current Author', 'chrico-author-widget' )
			)
		);

	}

	/**
	 * Widget output.
	 *
	 * @param    array $args
	 * @param    array $instance
	 */
	public function widget( $args, $instance ) {

		// showing widget only on single-pages!
		if ( ! is_single() ) {
			return;
		}

		$author_id = get_the_author_meta( 'ID' );
		if ( ! $author_id ) {
			return;
		}

		// We require content in the author bio field
		if ( get_post_type() !== 'post' || get_the_author_meta( 'description' ) === '' ) {
			return;
		}

		// before Widget
		echo $args[ 'before_widget' ];

		// the title
		printf(
			'%1$s<span class="author-by">%2$s </span><cite class="fn">%3$s</cite>%4$s',
			$args[ 'before_title' ],
			_x( 'Über den Autor', 'Author Headline', 'chrico-author-widget' ),
			get_the_author_meta( 'display_name' ),
			$args[ 'after_title' ]
		);

		// the avatar
		$avatar = get_avatar( get_the_author_meta( 'user_email' ), 264 );
		printf(
			'<div class="chrico-author-widget__avatar">%s</div>',
			$avatar
		);

		// the description
		$description = wpautop( get_the_author_meta( 'description' ) );
		printf(
			'<div class="chrico-author-widget__description">%s</div>',
			$description
		);

		echo $args[ 'after_widget' ];
	}

}
