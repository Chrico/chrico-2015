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
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-52PNZWS');
	</script>

	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta name="google-site-verification" content="AabDB0RNGP6wtWRVaPWeaabjtZBTmeF2SYgbr-4PmyU" />

	<?php if ( is_singular() && comments_open() ) :
		wp_enqueue_script( 'comment-reply' );
	endif; ?>
	<?php wp_head(); ?>

</head>
<body <?php body_class(); ?>>
<noscript>
	<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-52PNZWS"
		height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<?php chrico_the_svg_icons(); ?>

<div class="chrico-site">

	<header class="chrico-header">

		<?php get_search_form(); ?>

		<?php get_template_part( 'parts/navigation/header' ); ?>

		<div class="chrico-header__banner" role="banner">
			<a class="chrico-header__link" href="<?php echo esc_url( home_url( '/' ) ); ?>"
				title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
				<img class="chrico-header__img"
					src="<?php echo get_stylesheet_directory_uri() . '/assets/img/logo.svg'; ?>" width="300"
					height="147" alt="<?php bloginfo( 'name' ); ?>" />
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
