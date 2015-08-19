<?php
/**
 * The template for displaying Comments
 *
 * @package ChriCo
 */

if (post_password_required()) :
    return;
endif;
?>
<section id="comments" class="chrico-comments">

    <?php if (have_comments()) : ?>

        <h2 class="chrico-comments__title">
            <?php _e('Das denkt Ihr über diesen Beitrag:', 'theme_chrico') ?>
        </h2>

        <?php get_template_part('parts/comment/comments'); ?>

        <?php get_template_part('parts/pagination/comment'); ?>

    <?php endif; // have_comments() ?>

    <?php get_template_part('parts/comment/pingbacks'); ?>

    <?php get_template_part('parts/comment/form'); ?>

</section>
