<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Implements hook_wysiwyg_editor_settings_alter(&$settings, $context)
 */
// Uncomment this to enable ckeditor accordion template
function admin_wysiwyg_editor_settings_alter(&$settings, $context) {
  if ($context['profile']->editor == 'ckeditor') {
    $settings['customConfig'] = base_path() . drupal_get_path('theme', 'admin') . '/js/ck-config.js';
  }
}
