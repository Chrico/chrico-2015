<?php
/**
 * Feature Name:    Post Functions for solingen-Theme
 * Version:            0.1
 * Author:            Inpsyde GmbH for MarketPress.com
 * Author URI:        http://inpsyde.com/
 */


/**
 * Adding custom classes to post
 * @wp-hook post_class
 *
 * @param   array $classes
 *
 * @return  array $classes
 */
function chrico_filter_post_class($classes)
{

    if (is_singular()) {
        $classes[] = 'chrico-post--is-singular';
    } else {
        $classes[] = 'chrico-post--is-archive';
    }

    return $classes;
}

/**
 *  Paginated posts navigation. Used instead of next_posts()/previous_posts(). Displays an unordered list.
 *
 * @global $wp_query
 * @return String
 */
function chrico_get_posts_pagination()
{
    global $wp_query;

    $paginated = $wp_query->max_num_pages;

    if ($paginated < 2)
        return '';

    $current = get_query_var('paged') ? get_query_var('paged') : 1;
    $format = get_option('permalink_structure') ? 'page/%#%/' : '&page=%#%';
    $args = array(
        'base' => get_pagenum_link(1) . '%_%',
        'current' => $current,
        'format' => $format,
        'mid_size' => 2,
        'total' => $paginated,
        'type' => 'list',
    );

    return paginate_links($args);
}


/**
 * Callback for the excerpt_more
 *
 * @wp-hook excerpt_more
 *
 * @param   Integer $length
 * @return  String
 */
function chrico_filter_excerpt_more($length)
{
    return '';
}
