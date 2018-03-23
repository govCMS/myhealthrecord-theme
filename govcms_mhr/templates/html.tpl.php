<?php
/**
 * @file
 * Returns the HTML for the basic html structure of a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728208
 */
?><!DOCTYPE html>
<!--[if IEMobile 7]><html class="iem7" <?php print $html_attributes; ?>><![endif]-->
<!--[if lte IE 6]><html class="lt-ie9 lt-ie8 lt-ie7" <?php print $html_attributes; ?>><![endif]-->
<!--[if (IE 7)&(!IEMobile)]><html class="lt-ie9 lt-ie8" <?php print $html_attributes; ?>><![endif]-->
<!--[if IE 8]><html class="lt-ie9" <?php print $html_attributes; ?>><![endif]-->
<!--[if (gte IE 9)|(gt IEMobile 7)]><!--><html <?php print $html_attributes . $rdf_namespaces; ?>><!--<![endif]-->

<head>
  <?php print $head; ?>
  <link rel="apple-touch-icon" sizes="144x144" href="<?php print $path_to_theme; ?>/images/favicons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php print $path_to_theme; ?>/images/favicons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="<?php print $path_to_theme; ?>/images/favicons/favicon-16x16.png">
  <link rel="manifest" href="<?php print $path_to_theme; ?>/images/favicons/site.webmanifest">
  <link rel="mask-icon" href="<?php print $path_to_theme; ?>/images/favicons/safari-pinned-tab.svg" color="#FFA700">
  <link rel="shortcut icon" href="<?php print $path_to_theme; ?>/images/favicons/favicon.ico">
  <meta name="msapplication-TileColor" content="#ffffff">
  <meta name="msapplication-config" content="<?php print $path_to_theme; ?>/images/favicons/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

  <title><?php print $head_title; ?></title>

  <?php if ($default_mobile_metatags): ?>
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width">
  <?php endif; ?>
  <!--[if (gte IE 9)|(gt IEMobile 7)]><!--><meta http-equiv="cleartype" content="on"><!--<![endif]-->

  <?php print $styles; ?>
  <?php print $scripts; ?>
  <?php if ($add_html5_shim and !$add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5.js"></script>
    <![endif]-->
  <?php elseif ($add_html5_shim and $add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/html5-respond.js"></script>
    <![endif]-->
  <?php elseif ($add_respond_js): ?>
    <!--[if lt IE 9]>
    <script src="<?php print $base_path . $path_to_zen; ?>/js/respond.js"></script>
    <![endif]-->
  <?php endif; ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <?php if ($skip_link_text && $skip_link_anchor): ?>
      <a id="skip-link" href="#<?php print $skip_link_anchor; ?>" class="element-invisible element-focusable"><?php print $skip_link_text; ?></a>
  <?php endif; ?>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>
