<?php
/**
 * Feature Name:    Analytics Functions for our Theme
 * Version:		    0.1
 * Author:		    Christian Brückner
 * Author URI:	    http://www.chrico.info
 */

/**
 * Helper-Function to add Google Analytics to wp_footer
 * @wp-hook wp_footer
 * @return  void
 */
function chrico_filter_wp_footer_add_google_analytics() {
	?>
	<script>
		(function(i,s,o,g,r,a,m) {i['GoogleAnalyticsObject']=r;i[r]=i[r]||function() {
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-37470854-1', 'auto');
		ga('set', 'forceSSL', true);
		ga('set', 'anonymizeIp', true);
		ga('require', 'linkid', 'linkid.js');
		ga('require', 'displayfeatures');
		ga('send', 'pageview');
	</script>
	<?php
}