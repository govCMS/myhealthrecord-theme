<?php
  $total = 0;
  // $letters = range('0', '9');
  // $letters = array_merge($letters, range('A', 'Z'));
 // $letters = array_merge($letters, range('!', '/'));
 // $letters = range('A', 'Z');
 $letters[] = "All";
 $letters = array_merge($letters, range('A', 'Z'));
 $existing_letters[] = "All";
  foreach ($rows as $id => $row) {
      $existing_letters[] = $row->link;
      $urls[$row->link] = $row->url;
      $counts[$row->link] = $row->count;
      $total += $row->count;
  }
  $url = explode('/', $row->url);
  array_pop($url);
  $urls['All'] = implode('/', $url) . '/all';
  $counts['All'] = $total;

  $first = true;
  foreach ($letters as $letter) {
      // $divider = !$first ? ' | ' : '';
      $first = false;

      $active_class = '';
      if (arg(1) == drupal_strtolower($letter)) {
          $active_class = 'active';
      }
      if (in_array($letter, $existing_letters)) {
          $nav[] = '<li class="views-summary views-summary-unformatted result"><a href=' . $urls[$letter] . ' class=" ' . $active_class . '">' . $letter . '</a></li>';
      } else {
          //  commented out for displaying chars with no results
          $nav[] = '<li class="views-summary views-summary-unformatted no-result ' . $active_class . '">' . $letter . '</li>';
      }
  }
  print '<ul>';
  print implode(' ', $nav);
  print '</ul>';
?>
