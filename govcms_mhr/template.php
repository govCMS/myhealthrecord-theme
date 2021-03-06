<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function govcms_mhr_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  GOVCMS_MHR_preprocess_html($variables, $hook);
  GOVCMS_MHR_preprocess_page($variables, $hook);
}
// */

/**
 * Implements hook_js_alter
 */
function govcms_mhr_js_alter(&$javascript) {
  // Swap out jQuery to use an updated version of the library.
  $javascript['misc/jquery.js']['data'] = drupal_get_path('theme', 'govcms_mhr') . '/js/jquery-1.7.2.min.js';
}

/**
 * Implements hook_html_head_alter
 */
function govcms_mhr_html_head_alter(&$head_elements) {
  // Search the head elements for the Favicon
  foreach ($head_elements as $key => $element) {
    if (!empty($element['#attributes'])) {
      if (array_key_exists('rel', $element['#attributes'])) {
        if ($element['#attributes']['rel'] == 'shortcut icon') {
          // delete the favicon link entirely
          unset($head_elements[$key]);
        }
      }
    }
  }
}

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */

function govcms_mhr_css_alter(&$css) {
  /* Removing all rtl css' */
  if ($css['modules/system/system.base-rtl.css']) {
    unset($css['modules/system/system.base-rtl.css']);
  }
  if ($css['modules/system/system.menus-rtl.css']) {
    unset($css['modules/system/system.menus-rtl.css']);
  }
  if ($css['modules/system/system.messages-rtl.css']) {
    unset($css['modules/system/system.messages-rtl.css']);
  }
  if ($css['modules/system/system.theme-rtl.css']) {
    unset($css['modules/system/system.theme-rtl.css']);
  }
  if ($css['profiles/govcms/modules/contrib/date/date_api/date-rtl.css']) {
    unset($css['profiles/govcms/modules/contrib/date/date_api/date-rtl.css']);
  }
  if ($css['modules/field/theme/field-rtl.css']) {
    unset($css['modules/field/theme/field-rtl.css']);
  }
  if ($css['modules/search/search-rtl.css']) {
    unset($css['modules/search/search-rtl.css']);
  }
  if ($css['modules/user/user-rtl.css']) {
    unset($css['modules/user/user-rtl.css']);
  }
  if ($css['profiles/govcms/modules/contrib/views/css/views-rtl.css']) {
    unset($css['profiles/govcms/modules/contrib/views/css/views-rtl.css']);
  }
  if ($css['modules/contextual/contextual-rtl.css']) {
    unset($css['modules/contextual/contextual-rtl.css']);
  }
  if ($css['profiles/govcms/modules/contrib/navbar/css/navbar.menu-rtl.css']) {
    unset($css['profiles/govcms/modules/contrib/navbar/css/navbar.menu-rtl.css']);
  }
  if ($css['profiles/govcms/modules/contrib/navbar/css/navbar.module-rtl.css']) {
    unset($css['profiles/govcms/modules/contrib/navbar/css/navbar.module-rtl.css']);
  }
  if ($css['profiles/govcms/modules/contrib/navbar/css/navbar.theme-rtl.css']) {
    unset($css['profiles/govcms/modules/contrib/navbar/css/navbar.theme-rtl.css']);
  }
  if ($css['profiles/govcms/modules/contrib/navbar/css/navbar.icons-rtl.css']) {
    unset($css['profiles/govcms/modules/contrib/navbar/css/navbar.icons-rtl.css']);
  }
}

function govcms_mhr_preprocess_html(&$variables, $hook) {
  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  // $variables['classes_array'] =
  //  array_diff($variables['classes_array'], array('class-to-remove'));

  // Add path to current theme
  $variables['path_to_theme'] = $GLOBALS['base_url'] . $GLOBALS['base_path'] . path_to_theme();

  // Add the Page's Parent Menu Item as body class
  // @see https://www.drupal.org/forum/support/theme-development/2011-07-21/adding-top-parent-menu-item-as-body-class#comment-6595334
  $menu_parent = menu_get_active_trail();
  if (isset($menu_parent[1]['link_title'])) {
      $menu_parent = drupal_html_class($menu_parent[1]['link_title']);
      $variables['classes_array'][] = 'section-top-' . $menu_parent;
  }

  // Prints the top level Category if we're in a How to's node
  if (arg(0) == 'node') {
    $nid = arg(1);
    $node = node_load($nid);
    if ($node->type == 'how_to_page') {
      if (isset($node->field_how_to_category['und'][0])) {
        $tid = $node->field_how_to_category['und'][0]['tid'];
        $category = taxonomy_term_load($tid);
        $variables['classes_array'][] = 'category-top-id-' . $tid;
        $variables['classes_array'][] = 'category-top-name-' . strtolower($category->name);
      }
    }
    if (isset($node->field_page_style['und'][0]['value'])) {
      $variables['classes_array'][] = $node->field_page_style['und'][0]['value'];
    }
  }

  // ReadSpeker plugin
  // Post config for htaccess auth
  // TODO: remove this when live
  drupal_add_js('window.rsConf = {general: {usePost: true}};', array(
    'type' => 'inline',
    'group' => JS_THEME,
  ));

  drupal_add_js('//f1-oc.readspeaker.com/script/9846/ReadSpeaker.js?pids=embhl', array(
    'type' => 'external',
    'group' => JS_THEME,
  ));

  // Colorbox
  drupal_add_js('//cdnjs.cloudflare.com/ajax/libs/jquery.colorbox/1.6.4/jquery.colorbox-min.js', array(
    'type' => 'external',
    'group' => JS_THEME,
  ));

  // Magnific Popup
  drupal_add_css('//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css', array(
    'type' => 'external',
  ));

  drupal_add_js('//cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js', array(
    'type' => 'external',
    'group' => JS_THEME,
  ));


}

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
 /*
function govcms_mhr_preprocess_page(&$variables, $hook) {}
//*/

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function govcms_mhr_preprocess_node(&$variables, $hook) {
  // Optionally, run node-type-specific preprocess functions, like
  // GOVCMS_MHR_preprocess_node_page() or GOVCMS_MHR_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }

/*
  // Add addthis widget script, to every node (still needs to hook the container for placement)
  drupal_add_js('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b3afda82b800d73', array(
    'type' => 'external',
    'scope' => 'header',
    'group' => JS_THEME,
    // 'every_page' => TRUE,
    // 'weight' => -1,
  ));
*/

  // Only on Cards or Compacts...
  if ($variables['view_mode'] == 'card' || $variables['view_mode'] == 'compact') {
    // Shorten the title on word wraps, max 60 chars
    $max_width = 60;
    if (strlen($variables['title']) > $max_width) {
      $title = $variables['title'];
      $title = wordwrap($title, $max_width);
      $title = substr($title, 0, strpos($title, "\n"));
      $title .= '...';
      if (isset($variables['content']['title'])) {
        $variables['content']['title'][0]['#markup'] = '<h2><a href="/' . $variables['path']['alias'] . '">' . $title . '</a></h2>';
      }
    }
    // Strip html from card view mode
    if (isset($variables['content']['body'])) {
      $variables['content']['body'][0]['#markup'] = strip_tags($variables['content']['body'][0]['#markup']);
    }
  }
}

function govcms_mhr_preprocess_node_how_to_page(&$variables) {
  // Prints the categories as classes, both id and term name,
  // highlighting the "top" one
  if(isset($variables['field_how_to_category'])) {
    $categories = (isset($variables['field_how_to_category']['und'])) ? $variables['field_how_to_category']['und'] : $variables['field_how_to_category'];
    foreach ($categories as $key => $term) {
      if (isset($term['tid'])) {
        $category = taxonomy_term_load($term['tid']);
        if ($key == 0) {
          $variables['classes_array'][] = 'category-top-id-' . $term['tid'];
          $variables['classes_array'][] = 'category-top-name-' . str_replace(" ", "-", strtolower($category->name));
        } else {
          $variables['classes_array'][] = 'category-id-' . $term['tid'];
          $variables['classes_array'][] = 'category-name-' . str_replace(" ", "-", strtolower($category->name));
        }
      }
    }
  }
}

function govcms_mhr_preprocess_file_entity(&$variables) {
  if ($variables['type'] == 'video') {
    $pieces = explode("/", parse_url($variables['metadata']['media_oembed_local_thumbnail_path'], PHP_URL_PATH));
    if ($pieces[1] == 'i.ytimg.com') {
      $variables['video_provider'] = 'youtube';
      $variables['video_id'] = $pieces[3];
    }
  }
}

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function govcms_mhr_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function govcms_mhr_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] =
  // array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function govcms_mhr_preprocess_block(&$variables, $hook) {

  // Process ACSF site path in blocks. See functions below
  if ($variables['elements']['#block']->module == 'block' && !empty($variables['elements']['#markup'])) {
    $content = $variables['elements']['#markup'];
     // Fix the ACSF site path.
    $content = _govcms_mhr_acsfix_path($content);
     // Apply tokens to body field.
    $variables['content'] = token_replace($content);
  }

  // Readspeaker plugin button
  if ($variables['block_html_id'] == 'block-bean-readspeaker-button') {
    $current_path = urlencode($_SERVER['HTTP_HOST'] . request_uri());
    $variables['content'] = '
      <div id="readspeaker_button1" class="rs_skip rsbtn rs_preserve">
        <a rel="nofollow" class="rsbtn_play link-external__no-icon" accesskey="L" title="Listen to this page using ReadSpeaker" href="//app-oc.readspeaker.com/cgi-bin/rsent?customerid=9846&lang=en_au&readid=readspeaker-content&url='.$current_path.'">
          <span class="rsbtn_left rsimg rspart"><span class="rsbtn_text"><span>Listen</span></span></span>
          <span class="rsbtn_right rsimg rsplay rspart"></span>
        </a>
      </div>';
  }

  // Menu Navigation (Prev & Next)
  if ($variables['block_html_id'] == 'block-bean-menu-navigation-prev-next') {
    if ($traverse_links = _govcms_mhr_get_menu_traverse_links('main-menu')) {
      $variables['content'] = '<div class="menu-nav-prev-next clearfix">';

      // Previous link
      $prev_text = '<p><span>' . t('Previous') . '</span>' . $traverse_links['prev']['title'] . '</p>';
      $previous_link = l($prev_text, $traverse_links['prev']['href'], array(
        'attributes' => array(
          'class' => 'menu-nav-previous',
        ),
        // 'external' => true,
        'html' => true
      ));
      $variables['content'] .= $previous_link;

      // Next link
      $next_text = '<p><span>' . t('Up next') . '</span>' . $traverse_links['next']['title'] . '</p>';
      $next_link = l($next_text, $traverse_links['next']['href'], array(
        'attributes' => array(
          'class' => 'menu-nav-next',
        ),
        'html' => true
      ));
      $variables['content'] .= $next_link;
      $variables['content'] .= '</div>';
    } else {
      $variables['content'] = FALSE;
    }
  }
}

/**
 * Hide the block from the region if condition not applies (Menu)
 */
function govcms_mhr_block_list_alter(&$blocks) {
  if (isset($blocks[195])) {
    // Prev-Next Block
    if (!_govcms_mhr_get_menu_traverse_links('main-menu')) {
      $blocks[195]->region = -1;
    }
  }
}

/**
 * Generates the Previous and Next link variables from the current menu item
 *
 * @param $menu_name
 *   Filters the result for a given menu, where we currently operate.
 */
function _govcms_mhr_get_menu_traverse_links($menu_name = 'main-menu') {
  $links = array();
  // get current menu item
  $current_menu_item = menu_get_item();
  if ($current_menu_item) {
    $links = array('current' => $current_menu_item);
    // try and get mlid from menu_links table
    $menu_info = db_select('menu_links', 'ml')
      ->condition('ml.link_path', $current_menu_item['href'])
      ->condition('ml.menu_name', $menu_name)
      ->fields('ml', array('mlid'))
      ->execute()
      ->fetchAll();
    if (isset($menu_info[0])) {
      $current_mlid = $menu_info[0]->mlid;
      // path is in menu so traverse and flatten all menu items
      $menu_links_tree = menu_tree_all_data($menu_name);
      $menu_links_tree_flattened = _govcms_mhr_flatten_menu_tree($menu_links_tree);
      // get index of current menu item in flattened tree to determin next previous by position in array
      $mlid_tree_index = array_search(intval($current_mlid), $menu_links_tree_flattened);
      if (is_int($mlid_tree_index)) {
        if ($mlid_tree_index == 0) {
          // first item in tree
          $links['next'] = menu_link_load($menu_links_tree_flattened[$mlid_tree_index+1]);
          $links['prev'] = menu_link_load($menu_links_tree_flattened[count($menu_links_tree_flattened)-1]);
        } elseif ($mlid_tree_index == (count($menu_links_tree_flattened) -1)) {
          // last item in tree
          $links['next'] = menu_link_load($menu_links_tree_flattened[0]);
          $links['prev'] = menu_link_load($menu_links_tree_flattened[$mlid_tree_index-1]);
        } else {
          // normal
          $links['next'] = menu_link_load($menu_links_tree_flattened[$mlid_tree_index+1]);
          $links['prev'] = menu_link_load($menu_links_tree_flattened[$mlid_tree_index-1]);
        }
      }
    }
  }
  if (!isset($links['prev']) && !isset($links['next'])) {
    return FALSE;
  }
  return $links;
}

/**
 * Flattens the menu structure of a given menu tree
 *
 * @param $tree
 *   the menu tree array.
 */
function _govcms_mhr_flatten_menu_tree($tree) {
  $links = array();
  foreach ($tree as $item) {
    $links[] = intval($item['link']['mlid']);
    if (is_array($item['below'])) {
      $links = array_merge_recursive($links, _govcms_mhr_flatten_menu_tree($item['below']));
    }
  }
  return $links;
}

/**
 * Add bredcrumbs to each search api result
 */
function govcms_mhr_preprocess_search_api_page_result(&$variables) {
  $trails = crumbs_get_trail($variables['url']['path']);
  $bredcrumbs = '<span class="crumb-item crumb-home">Home</span>';
  foreach ($trails as $trail) {
    if ($trail['title']) {
      $bredcrumbs .= ' <span class="crumb-sep">/</span> <span class="crumb-item">' . $trail['title'] . '</span>';
    }
  }
  $variables['bredcrumbs'] = $bredcrumbs;
  // Make headings for resuts accessible
  // $variables['snippet'] = filter_xss($variables['snippet'], $allowed_tags = array('strong', 'p', 'br', 'em'));
  $variables['snippet'] = preg_replace('/<h[1-3]>(.*?)<\/h[1-3]>/', '<h4>$1</h4>', $variables['snippet']);
}

/**
 * Addition to an existing glossary view of taxonomy term, grouping by first letter,
 * This snippet only deal with converting the grouping rendered output uppecase,
 * otherwise lowercase and uppercase will be interpreted as different value (A!=a).
 * Taken from https://drupal.stackexchange.com/questions/84120/views-grouping-rows-case-sensitive-i-need-to-ignore-case#answer-95173
 *
 * Implements hook_views_pre_render
 *
 * @param $view
 *   the view array.
 */
function govcms_mhr_views_pre_render(&$view) {
  // only execute code on 'glossary_list' view page
  if ($view->name === 'glossary_list' && $view->current_display === 'page') {
    // 'name' is the field used to regroup the nodes
    // 'glossary_initial_upper' is the new datamember that will be added to node object
    $view->field['name']->field_alias = 'glossary_initial_upper';
    // loop through each node, and assign an uppercased node title to the 'node_title_upper' datamember
    foreach ($view->result as $result) {
      $result->glossary_initial_upper = strtoupper($result->taxonomy_term_data_name);
    }
  }
}

/**
 * ******* Fix ACSF site paths issue *******
 * modified from https://github.com/govCMS/govcms-theme/commit/1281634e9dc185592324ebbb81a693eef80c7164
 * Replace the AcquiaCloudSiteFactory themes reference in the blocks content (@see preprocess_block)
 * with the current one, using per-clone configuration. It checks for local settings as well.
 * Body field for nodes is currently disabled.
 **/

/**
* Preprocess the field.
*
* @param $vars
*/
/*
function govcms_mhr_preprocess_field(&$vars) {
  $function = 'govcms_mhr_preprocess_field__' . $vars['element']['#field_name'];
  if (function_exists($function)) {
    $function($vars);
  }
}
*/

/**
* Preprocess the body field.
*
* @param $vars
*/
/*
function govcms_mhr_preprocess_field__body(&$vars) {
 // Process ACSF site path.
  if (!empty($vars['items'][0]['#markup'])) {
   $content = $vars['items'][0]['#markup'];
    // Fix the ACSF site path.
   $content = _govcms_mhr_acsfix_path($content);
    // Apply tokens to body field.
   $vars['items'][0]['#markup'] = token_replace($content);
  }
}
*/

/**
* Check the ACSF path.
*
* @param $text
*
* @return mixed
*/
function _govcms_mhr_acsfix_path($text) {
  // Return the text as quick as possible.
  if (false === strpos($text, 'sites/g/files/net')) {
    return $text;
  }
  // Find all ACSF links in $content.
  preg_match_all('@/sites/g/files/(net[a-zA-Z0-9]+)/themes/site/@', $text, $matches);
  // Return the text if no matches.
  if (empty($matches) || !isset($matches[0])) {
    return $text;
  }
  // Get ACSF net paths.
  $ascf_paths = $matches[0];
  // Replace the paths to current site path.
  $text = str_replace($ascf_paths, _govcms_mhr_file_path(), $text);
  return $text;
}

/**
* Return the current Drupal site file paths.
*/
function _govcms_mhr_file_path() {
  $conf_path = conf_path(); // On ACSF returns 'sites/g/files/netXXXX'
  if ( $conf_path == 'sites/default') {
    // Local env
    return '/sites/all/themes/';
  }
  return '/' . conf_path() . '/themes/site/';
}
