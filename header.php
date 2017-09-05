<?php
/**
 * The Header for our theme.
 *
 * @package ChriCo
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7 no-js" <?php language_attributes(); ?>><![endif]-->
<!--[if IE 8]>
<html class="ie ie8 no-js" <?php language_attributes(); ?>><![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html class="no-js" <?php language_attributes(); ?> itemscope itemtype="http://schema.org/Blog"><!--<![endif]-->
<head>

	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta name="google-site-verification" content="AabDB0RNGP6wtWRVaPWeaabjtZBTmeF2SYgbr-4PmyU" />

	<?php if ( is_singular() && comments_open() ) :
		wp_enqueue_script( 'comment-reply' );
	endif; ?>
	<?php wp_head(); ?>
	<script>document.documentElement.className = document.documentElement.className.replace( "no-js", "js" );</script>
</head>
<body <?php body_class(); ?>>
<?php chrico_the_svg_icons(); ?>

<div class="chrico-site">

	<header class="chrico-header">

		<?php get_search_form(); ?>

		<?php get_template_part( 'parts/navigation/header' ); ?>

		<div class="chrico-header__banner" role="banner">
			<a class="chrico-header__link" href="<?php echo esc_url( home_url( '/' ) ); ?>"
				title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
				<div class="chrico-header__img">
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="146.459" viewBox="0 0 300 146.459" overflow="visible" enable-background="new 0 0 300 146.459" xml:space="preserve"><g display="none"><image display="inline" width="244" height="141" transform="matrix(0.9999 0 0 0.9999 29 3.3398)"/></g><g display="none"><circle display="inline" cx="71.875" cy="46.104" r="20.125"/><circle display="inline" cx="232.875" cy="46.104" r="20.125"/><circle display="inline" cx="232.875" cy="57.104" r="20.125"/><circle display="inline" cx="168.125" cy="100.104" r="20.125"/><circle display="inline" cx="71.875" cy="104.104" r="20.125"/></g><path fill="#2E969D" d="M278.458 75.189C290.908 71.538 300 60.029 300 46.397V30c0-16.569-13.431-30-30-30H30C13.431 0 0 13.431 0 30v86.459c0 16.569 13.431 30 30 30h103.416v-30.932H40.994V32.795h216.894c0 0 0 4.472 0 9.316 0 4.845-0.435 5.094-2.422 5.901 0 0-92.133 34.209-93.417 34.739 -10.9 4.494-18.571 15.223-18.571 27.744v35.963H300v-30.745H183.913c0 0-0.372-4.658 5.031-6.895L278.458 75.189z"/></svg>
				</div>
				<?php
				if ( is_home() ) :
					$tag = 'h1';
				else :
					$tag = 'span';
				endif;
				?>
				<<?php echo $tag; ?> class="chrico-header__title">ChriCo</<?php echo $tag; ?>>
			</a>
		</div>

	</header>

	<?php
	if ( function_exists( 'yoast_breadcrumb' ) ) :
		yoast_breadcrumb( '<nav class="chrico-breadcrumbs">', '</nav>' );
	endif;
	?>

	<main class="chrico-main" role="main">
