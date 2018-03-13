<?php
/**
* @file
* Returns the HTML for a single Drupal page.
*
* Complete documentation for this file is available online.
* @see https://drupal.org/node/1728148
*/
?>

<header class="header" id="header" role="banner">
  <div class="header__inner">

    <?php if ($secondary_menu): ?>
      <nav class="header__secondary-menu" id="secondary-menu" role="navigation">
        <?php print theme('links__system_secondary_menu', array(
          'links' => $secondary_menu,
          'attributes' => array(
            'class' => array(
              'links',
              'inlineLinks--bordered--double',
              'clearfix',
            ),
          ),
          'heading' => array(
            'text' => isset($secondary_menu_heading) ? $secondary_menu_heading : '',
            'level' => 'h2',
            'class' => array('element-invisible'),
          ),
        )); ?>
      </nav>
    <?php endif; ?>

    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo" id="logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header__logo-image" /></a>
    <?php endif; ?>

    <?php print render($page['header']); ?>
  </div>
</header>

<div id="navigation-content">
  <div class="container">
    <?php print render($page['navigation']); ?>
  </div>
</div> <!-- /#navigation -->

<div id="header-content">
  <div class="inner-wrapper">
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <div class="page-header">
        <div class="container">
          <?php print $breadcrumb; ?>
          <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
        </div>
      </div>
    <?php endif; ?>
  </div>
</div> <!-- /#header-content -->

<div id="page">

  <?php print render($page['highlighted']); ?>

  <div id="main">
    <div class="inner-wrapper clearfix">
    <?php print render($title_suffix); ?>
    <?php print $messages; ?>
    <?php print render($tabs); ?>
    <?php print render($page['help']); ?>
    <?php if ($action_links): ?>
      <ul class="action-links"><?php print render($action_links); ?></ul>
    <?php endif; ?>

      <div id="content" class="column" role="main">

        <span id="skip-content" class="element-invisible">Start of content</span>

        <a id="main-content"></a>
        <div id="readspeaker-content">
          <?php print render($page['content']); ?>
        </div>
        <?php print $feed_icons; ?>
      </div>

      <?php
      // Render the sidebars to see if there's anything in them.
      $sidebar_first  = render($page['sidebar_first']);
      $sidebar_second = render($page['sidebar_second']);
      ?>

      <?php if ($sidebar_first || $sidebar_second): ?>
        <aside class="sidebars" role="complementary">
          <?php print $sidebar_first; ?>
          <?php print $sidebar_second; ?>
        </aside>
      <?php endif; ?>

    </div>

    <?php if ($page['content_bottom']) : ?>
      <?php print render($page['content_bottom']); ?>
    <?php endif; ?>


  </div>

</div>


<div id="page-bottom">
  <?php if ($footer = render($page['footer'])) : ?>
    <div id="footer-content">
      <?php print $footer; ?>
    </div> <!-- /#footer -->
  <?php endif; ?>

  <?php if ($footer = render($page['bottom'])) : ?>
    <div id="bottom-content">
      <?php print $footer; ?>
    </div> <!-- /#footer -->
  <?php endif; ?>
</div>

<div id="hidden-region">
  <!-- External link popup window -->
  <div id="external-link-popup-content" class="external-link-popup mfp-hide">
    <?php
      $block_l = block_load('block', '11');
      $block = module_invoke('block', 'block_view', '11');
    ?>
    <h2><?php print $block_l->title; ?></h2>
    <div class="external-link-popup__content">
      <?php print render($block['content']); ?>
      <div>
        <ul>
          <li><a href="#" id="external-link-action-cancel">Cancel</a></li>
          <li><a href="#" id="external-link-action-continue">Continue</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
