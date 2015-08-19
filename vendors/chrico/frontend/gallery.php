<?php
/**
 * Feature Name:    Template-Helpers for Gallery on ChriCo-Theme
 * Version:            0.1
 * Author:            Christian Brückner
 * Author URI:        http://www.chrico.info
 */

/**
 * Callback to build a pretty caption
 *
 * @wp-hook img_caption_shortcode
 *
 * @param   String $output
 * @param   Array $attr
 * @param   String $content
 *
 * @return String
 */
function chrico_filter_img_caption_shortcode($output, $attr, $content)
{

    /* We're not worried abut captions in feeds, so just return the output here. */
    if (is_feed())
        return $output;

    /* Merge the defaults with user input. */
    $attr = shortcode_atts(
        array(
            'id' => '',
            'align' => '',
            'width' => '',
            'caption' => ''
        ),
        $attr
    );

    /* If the width is less than 1 or there is no caption, return the content wrapped between the [caption]< tags. */
    if (1 > $attr['width'] || empty($attr['caption']))
        return $content;

    /* Set up the attributes for the caption <div>. */
    $attributes = (!empty($attr['id']) ? ' id="' . esc_attr($attr['id']) . '"' : '');
    $attributes .= ' class="wp-caption ' . esc_attr($attr['align']) . ' chrico-gallery"';

    /* Open the caption <div>. */
    $output = '<figure' . $attributes . '>';
    $output .= do_shortcode($content);
    $output .= '<figcaption class="chrico-gallery__caption">' . $attr['caption'] . '</figcaption>';
    $output .= '</figure>';

    return $output;
}

/**
 * Callback to build a pretty gallery
 *
 * @wp-hook post_gallery
 *
 * @param   String $output
 * @param   Array $attr
 *
 * @return String
 */
function chrico_filter_post_gallery($output, $attr)
{

    $post = get_post();

    $default_attr = array(
        'order' => 'ASC',
        'orderby' => 'menu_order ID',
        'id' => $post->ID,
        'itemtag' => 'figure',
        'icontag' => '',
        'captiontag' => '',
        'columns' => 3,
        'size' => 'thumbnail',
        'include' => '',
        'exclude' => ''
    );

    $attr = shortcode_atts($default_attr, $attr);

    if (!empty($attr['id'])) {
        $attr['id'] = intval($attr['id']);
    }

    if (!empty($attr['include'])) {
        $include = preg_replace('/[^0-9,]+/', '', $attr['include']);
        $post_args = array(
            'include' => $include,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => $attr['order'],
            'orderby' => $attr['orderby']
        );
        $_attachments = get_posts($post_args);
        $attachments = array();
        foreach ($_attachments as $key => $val) {
            $attachments[$val->ID] = $_attachments[$key];
        }

    } else if (!empty($attr['exclude'])) {
        $exclude = preg_replace('/[^0-9,]+/', '', $attr['exclude']);
        $post_args = array(
            'post_parent' => $attr['id'],
            'exclude' => $exclude,
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => $attr['order'],
            'orderby' => $attr['orderby']
        );
        $attachments = get_children($post_args);

    } else {
        $post_args = array(
            'post_parent' => $attr['id'],
            'post_status' => 'inherit',
            'post_type' => 'attachment',
            'post_mime_type' => 'image',
            'order' => $attr['order'],
            'orderby' => $attr['orderby']
        );
        $attachments = get_children($post_args);
    }

    if (empty($attachments)) {
        return '';
    }

    if (is_feed()) {
        $output = "\n";
        foreach ($attachments as $att_id => $attachment)
            $output .= wp_get_attachment_link($att_id, $attr['size'], true) . "\n";
        return $output;
    }

    $output .= '<div class="chrico-gallery">';
    foreach ($attachments as $id => $attachment) {
        $origin_attachment = wp_get_attachment_image_src($id, 'large');
        $caption = '';
        if (trim($attachment->post_content)) {
            $caption = $attachment->post_content;
        } else if (trim($attachment->post_title)) {
            $caption = $attachment->post_title;
        }

        $output .= '<' . $attr['itemtag'] . ' class="wp-caption alignleft">';
        $output .= '<a href="' . $origin_attachment[0] . '" title="' . esc_attr($caption) . '">';
        $output .= wp_get_attachment_image($id, 'thumbnail');
        $output .= '</a>';
        $output .= '</' . $attr['itemtag'] . '>';

    }
    $output .= '</div>';

    return $output;
}
