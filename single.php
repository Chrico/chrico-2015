<?php
/**
 * The Template for displaying all single posts.
 *
 * @package ChriCo
 */

get_header(); ?>

<?php if (have_posts()) : the_post(); ?>

    <?php get_template_part('parts/content', 'single'); ?>
    <?php get_sidebar(); ?>

<?php endif; ?>

<?php get_footer();