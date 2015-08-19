<?php
/**
 * Feature Name:    Comment Functions for ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */


/**
 * Callback for text comments.
 *
 * @since      0.1
 * @created    03.12,2013, cb
 * @updated    03.12,2013, cb
 *
 * @return void
 */
function chrico_the_comment($comment, Array $args, $depth)
{
    ?>
<li <?php comment_class('chrico-comment'); ?>>
    <article id="comment-<?php comment_ID(); ?>">
        <header class="chrico-comment__meta vcard">
            <?php
            echo get_avatar($comment, 45);
            printf(
                '<cite class="fn">%1$s</cite>',
                get_comment_author_link()
            );
            printf('<a href="%1$s"><time pubdate datetime="%2$s">%3$s</time></a>',
                esc_url(get_comment_link($comment->comment_ID)),
                get_comment_time('c'),
                sprintf(
                    _x(
                        '%1$s @ %2$s',
                        '1: date, 2: time for comment meta',
                        'theme_chrico'
                    ),
                    get_comment_date(),
                    get_comment_time())
            );
            edit_comment_link(
                _x('[Bearbeiten]', 'Comment edit link text', 'theme_chrico'),
                ' <span class="chrico-comment__edit-link">',
                '</span>'
            );
            ?>
        </header>

        <?php if ('0' == $comment->comment_approved) : ?>
            <p class="chrico-comment__notice--awaiting-moderation"><?php _e('Dein Kommentar muss von einem Administrator freigeschalten werden bevor du ihn siehst.', 'theme_chrico'); ?></p>
        <?php endif; ?>

        <section class="chrico-comment__content">
            <?php
            // comment-text
            comment_text();

            // reply link
            comment_reply_link(
                array_merge(
                    $args,
                    array(
                        'reply_text' => __('Auf diesen Kommentar antworten &raquo;', 'theme_chrico'),
                        'depth' => $depth,
                        'max_depth' => 999
                    )
                )
            );
            ?>
        </section>
    </article>
    <?php
}


/**
 * Count amount of pingbacks + trackbacks for a post.
 *
 * @link    http://wordpress.stackexchange.com/a/96596/23011
 *
 * @param   int $post_id Post ID for comment query. Default is current post.
 *
 * @return  int
 */
function chrico_get_count_pings($post_id = null)
{
    global $wp_query;

    $pings = 0;
    $comments = false;

    if ($post_id !== null) {
        $comments = get_comments(
            array(
                'post_id' => $post_id, # Note: post_ID will not work!
                'status' => 'approve'
            )
        );
    } else if (!empty ($wp_query->comments)) {
        $comments = $wp_query->comments;
    }

    if (!$comments) {
        return 0;
    }

    foreach ($comments as $comment) {
        if (in_array($comment->comment_type, array('pingback', 'trackback'))) {
            $pings += 1;
        }
    }

    return $pings;
}


/**
 * Callback for wp_list_comments( array ( 'type' => 'pings' ) ); pings is pingback and trackback together
 *
 * @link       http://wordpress.stackexchange.com/a/96596/23011
 * @link       http://codex.wordpress.org/Function_Reference/wp_list_comments#Parameters
 *
 * @param   object $comment
 *
 * @return  Void
 */
function chrico_the_pings($comment)
{
    $url = esc_url($comment->comment_author_url);
    $icon_args = array('url' => $url);
    $icon = chrico_get_external_favicon($icon_args);
    $name = esc_html($comment->comment_author);

    printf(
        '<li><a href="%s">%s %s</a>',
        $url,
        $icon,
        $name
    );
}


/**
 * Get an img element for a favicon from Google.
 *
 * @link       http://wordpress.stackexchange.com/a/96596/23011
 *
 * @param   Array $args array( 'url' => String, 'class' => String, 'size' => Integer, 'alt' => String )
 *
 * @return  string
 */
function chrico_get_external_favicon(Array $args = array())
{

    $default_args = array(
        'url' => '',
        'class' => 'icon',
        'size' => '16',
        'alt' => ''
    );

    $rtn = apply_filters('pre_chrico_get_external_favicon', false, $args, $default_args);
    if ($rtn !== false) {
        return $rtn;
    }

    $args = wp_parse_args($args, $default_args);
    $args = apply_filters('chrico_get_external_favicon_args', $args);

    $output = '';

    if ($args['url'] !== '') {
        $host = parse_url($args['url'], PHP_URL_HOST);
        $icon_url = 'https://plus.google.com/_/favicon?domain=' . $host;

        $output = sprintf(
            '<img class="%s" width="%d" height="%d" alt="%s" src="%s" />',
            $args['class'],
            esc_attr($args['size']),
            esc_attr($args['size']),
            esc_attr($args['alt']),
            $icon_url
        );
    }

    return apply_filters('chrico_get_external_favicon', $output, $args);
}
