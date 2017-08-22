# Chrico 2015

## Changelog

### 2.5.0
* Moved fonts from google fonts into theme to avoid request to fonts.google.com
* Inline SVG of logo to save the request.

### 2.4.2
* Removed deprecated google analytics integration.
* Added GTM.

### 2.4.1
* Removed `title`-attribute from permalink.

### 2.4
* improved visibility of variables in `Baguette.js` 
* One `build.js` to rule them all. Browserify'ed.
* Smaller fixes on Baguette.js to replace it later with some self-written lightbox-script.

### 2.3
* Updated baguette.js to 1.5.0.
* Updated fontobserver.js.
* Improved loading of Navigation.js.
* Introduced es6 class for Navigation.js

### 2.2
* Added composer.json to theme.
* Added Author-Widget to theme.

### 2.1
* Removed analytics from footer.

### 2.0
* Removed inline JS.

### 1.9
* Added Version to editor-style.css.
* Added polyfill/fontobserver.js and theme/font.js to improve font-loading performance.
* SASS code-formatting.
* Fixed typo in folder name.

### 1.8
* Some clean ups on parts.
* Code-formatting.
* Improved documentation in parts.

### 1.7
* Added term title to `is_archive()` as `<h1>` and `<h2>` to posts.
* Added `<h1>` to ChriCo on `is_home()` and `<h2>` to posts.
* Changed Widget headlines from `<h3>` to `<h4>`.
* Changed Google Fonts to https.

### 1.6
* Added missing stylings for `<ol>`, `<ul>` and `<p>` in post_content.
* Added missing `clear`-selector for post_content.
* Remove schema.org from search.

### 1.5
* Updated baguette.js/.css.
* Fixed word-break for headlines on mobile view.
* Fixed baguette.js-Bug with translate3d and position:fixed.
* Fixed loading of Fonts
* Reduced transition time from 0.5s to 0.25s.
* Added 'chrico'-css as inline styles to avoid render blocking.

### 1.4
* Added theme-support for `title-tag`.
* Added missing `wp_link_pages`-function.
* Added `editor-style.css`.
* Improved size of search icon for mobile devices.
* Fixed scaling bug for mobile devices when off-canvas navigation opens.
* Improved style.css description stuff.

### 1.3
* Improved navigation.js, added some documentation to methods.
* Removed recent comment styles.

### 1.2
* Added Post Author Widget.
* Added styles for Post Author Widget.
* Removed Post Author Template from Theme.
* Added smaller margin on Tablet view to chrico-box.
* Added new font-size for Desktop and Mobile.
* Added missing padding to Breadcrumbs.
* Added correct maringRight for Search on mobile search.
* Removed marginTop from widget__title.
* Replaced `em` with `$base_padding`.

### 1.1
* Improved CSS-output by combining media-queries with [grunt-combine-mq](https://github.com/buildingblocks/grunt-combine-media-queries).
* Removed loading of additional Google Fonts file.
* Added Filter to load `chrico-theme`- and `chrico-polyfill`-JavaScript inline for better performance.
* Moved `post-author.php`- and comments- out of `post-content`-Template.

### 1.0.1
* Removed unused "js"-/"no-js"-script.
* Added WPseo styles, moved breadcrumbs out of `chrico-main`, added `opacity` for mobile.
* Added Page-Template to load sidebar correctly.
* Fixed min-height for `chrico-post-inner`.

### 1.0
* Release of chrico-2015 Theme.
