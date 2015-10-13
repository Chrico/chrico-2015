<?php
/**
 * functions.php to init the Theme
 *
 * @package ChriCo
 */

if ( ! isset( $content_width ) ) {
	$content_width = 1024;
}

add_action( 'after_setup_theme', 'chrico_setup', 0 );

/**
 * Callback on theme_init
 *
 * @since   0.1
 * @created 03.12.2013, cb
 * @updated 03.12.2013, cb
 *
 * @wp-hook after_setup_theme
 * @return  Void
 */
function chrico_setup() {

	$vendor_dir = __DIR__ . '/vendors/';

	load_theme_textdomain(
		'theme_chrico',
		get_template_directory() . '/assets/language'
	);

	// the theme support
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );

	/**
	 * template |   size    |   device  | note
	 * -----------------------------------------
	 * single   |   945x485 |   tablet  | also used for desktop --> medium
	 * archive  |   690x354 |   mobile  | 1-columnar            --> post-thumbnail
	 * archive  |   440x225 |   tablet  | 2-columnar
	 * archive  |   332x170 |   desktop | 3-columnar
	 */
	set_post_thumbnail_size( 690, 354 );

	// general template helpers
	include_once( $vendor_dir . 'chrico/general.php' );

	// walker(s)
	include_once( $vendor_dir . 'chrico/frontend/Walker/Navigation.php' );

	// navigation
	include_once( $vendor_dir . 'chrico/navigation.php' );
	chrico_register_nav_menus();

	// widget
	include_once( $vendor_dir . 'chrico/widget.php' );
	add_action( 'widgets_init', 'chrico_widgets_init' );

	// adding editor styles
	$style = get_template_directory_uri() . '/assets/css/';
	$style .= 'editor-style' . chrico_get_script_suffix() . '.css?v=' . chrico_get_script_version();
	add_editor_style( $style );

	if ( ! is_admin() ) {

		// scripts
		include_once( $vendor_dir . 'chrico/frontend/script.php' );
		add_action( 'wp_enqueue_scripts', 'chrico_wp_enqueue_scripts' );

		// styles
		include_once( $vendor_dir . 'chrico/frontend/style.php' );
		add_action( 'wp_enqueue_scripts', 'chrico_wp_enqueue_styles' );
		add_filter( 'style_loader_tag', 'chrico_filter_style_loader_tag_above_the_fold', 10, 2 );
		// move the styles directly below the wp_title() and after the <meta charset>.
		remove_action( 'wp_head', 'wp_print_styles', 8 );
		add_action( 'wp_head', 'wp_print_styles', 1 );

		include_once( $vendor_dir . 'chrico/frontend/shortcode.php' );
		add_shortcode( 'video', 'chrico_shortcode_video' );

		// comments
		include_once( $vendor_dir . 'chrico/frontend/comment.php' );

		// posts
		include_once( $vendor_dir . 'chrico/frontend/post.php' );
		add_filter( 'post_class', 'chrico_filter_post_class' );

		// gallery
		include_once( $vendor_dir . 'chrico/frontend/gallery.php' );
		add_filter( 'img_caption_shortcode', 'chrico_filter_img_caption_shortcode', 10, 3 );
		add_filter( 'post_gallery', 'chrico_filter_post_gallery', 10, 2 );

		// analytics
		include_once( $vendor_dir . 'chrico/frontend/analytics.php' );
		add_action( 'wp_footer', 'chrico_filter_wp_footer_add_google_analytics' );

		// remove some unused wp-stuff
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'index_rel_link' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'feed_links_extra', 3 );
		remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
		remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
		remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 );
		remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
		remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
		add_filter( 'show_recent_comments_widget_style', '__return_false' );

		// remove admin bar styles
		// using closure..because we just remove the shitty inline-css and i know, that we're using PHP >= 5.6.x
		add_action(
			'get_header', function () {

			remove_action( 'wp_head', '_admin_bar_bump_cb' );
		}
		);

	}

}
