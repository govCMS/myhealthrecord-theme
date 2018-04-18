/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal, window, document, undefined) {
  // To understand behaviors, see https://drupal.org/node/756722#behaviors

  Drupal.behaviors.languageMenu = {
    attach: function (context, settings) {

      if (!$('ul.language-switcher-locale-url').hasClass('l_tinynav1')) {
        $('ul.language-switcher-locale-url').tinyNav({
          active: 'active',
          label: 'Language selector',
          // header: 'Languages', // String: Specify text for "header" and show header instead of the active item
        }).remove();
      }

      // Auto-rotate it //
      var original = $('#block-locale-language .tinynav option:selected');
      var rotateInterval = setInterval( function() { startRotate() }, 2000);

      // Stop on focus and set the original selection
      $('#block-locale-language .tinynav').focus( function(event) {
          clearInterval(rotateInterval);
          var originalIndex = original.index();
          $('#block-locale-language .tinynav option').eq(originalIndex).prop('selected', true);
      });
      // Restart on loosing focus
      $('#block-locale-language .tinynav').blur(function() {
        rotateInterval = setInterval( function() { startRotate() }, 2000);
      });

      // The roating function
      function startRotate () {
          var actual = $('#block-locale-language .tinynav option:selected');
          var actualIndex = actual.index();
          var nextIndex = (actualIndex + 1 == $('#block-locale-language .tinynav option').length) ? 0 : actualIndex + 1;
          var next = $('#block-locale-language .tinynav option').eq(nextIndex);
          next.prop('selected', true);
      }

    }
  };

  /**
   * Add smooth scroll back to top
   */
  Drupal.behaviors.backToTop = {
    attach: function (context, settings) {
      $('a.back-to-top').click(function (e) {
        e.preventDefault();
        console.log('to top!');
        $('body, html').animate({
          scrollTop: 0
        }, 1000);
      });
    }
  };

  /**
   * Open search on click
   */
    Drupal.behaviors.searchButton = {
      attach: function (context, settings) {
        var $form = $('#block-search-api-page-default-search #search-api-page-search-form-default-search');
        $form.find('.form-item').prepend('<p id="search-noresults">Too short, type at least 3 characters.</p>');
        $form.parent().prepend('<div id="search-locker"></div>');

        $form.click(function (e) {
          if (!$(this).hasClass('open')) {
            e.preventDefault();
            $(this).addClass('open');
            $('#search-locker').show();
            $(this).find('input.form-text').focus();
          }
        });

        $('#search-locker').click(function (e) {
          $(this).hide();
          $form.removeClass('open');
          $form.find('#search-noresults').fadeOut(function() {
            // Animation complete
            $form.find('.form-item input[type=text]').val('');
          });
        });

        $form.submit(function (e) {
          var $input = $(this).find('.form-item input[type=text]');
          if ($input.val().length < 3) {
            $form.find('#search-noresults').fadeIn();
            e.preventDefault();
          } else {
            $form.find('#search-noresults').fadeOut();
          }
        });
      }
    };

  /**
   * Add external link behaviour
   */
  Drupal.behaviors.linkExternal = {
    attach: function() {
      $('#main #content a, #page-bottom a').each(function() {

        var $this                    = $(this);
        var is_link_external_no_icon = $this.hasClass('link-external__no-icon');
        var has_child_image          = $this.children("img").length;
        var has_popup                = $this.hasClass('external-link-alert');


        if (this.hostname && this.hostname !== location.hostname && this.hostname !== 'my.gov.au' && !is_link_external_no_icon && !has_child_image) {
          // Read More Links
          if ($this.hasClass('read-more')) {
            $this.addClass('external-link').attr('target','_blank');
            $this.find('svg').before('<svg name="external-link" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet"> <path d="M11.3 6.2c.2 0 .4-.2.4-.4V.7H6.6c-.2 0-.4.2-.4.4s.2.4.4.4h3.7L4.2 7.6c-.2.2-.2.4 0 .6.2.2.4.2.6 0l6.1-6.1v3.7c0 .2.1.4.4.4z"/><path d="M9.5 9c0-.2-.2-.4-.4-.4s-.5.2-.5.4v2.1H1.4V3.8h2.1c.2 0 .4-.2.4-.4S3.7 3 3.5 3H.6v8.9h8.9V9z"/></svg>');
          }
          // Every other link
          else {
            $this.addClass('link-external').attr('target','_blank');
          }
          if (has_popup && $("body").hasClass('html')) {
            $this.click(function (e) {
              e.preventDefault();
              $.magnificPopup.open({
                items: {
                  preloader: true,
                  src: '#external-link-popup-content',
                  type: 'inline'
                }
              });
              $("#external-link-action-continue").attr("href", $this.attr("href"));
              $("#external-link-action-continue").attr("target", $this.attr("target"));
            });
          }
        }
        if ($("body").hasClass('html')) {
          $("#external-link-action-cancel").click(function(e) {
            e.preventDefault();
            var magnificPopup;
            magnificPopup = $.magnificPopup.instance;
            magnificPopup.close();
          });
          $("#external-link-action-continue").click(function(e) {
            var magnificPopup;
            magnificPopup = $.magnificPopup.instance;
            magnificPopup.close();
          });
        }
      });

      // This is opens media files in a new tab
      $('#main #content span.file a').each(function() {
        $(this).attr('target','_blank');
      });

    }
  };

  /**
   * Add 'Helpful?' submit on label click
   */
  Drupal.behaviors.formHelpfulSubmit = {
    attach: function (context, settings) {
      $('#webform-client-form-114 #edit-submitted-helpful label').click(function (e) {
        $(this).parent().find('input[type=radio]').attr('checked', 'checked');
        $('#webform-client-form-114').submit();
      });
    }
  };

  /**
   * Add colorbox viewer to videos
   */
  Drupal.behaviors.videoColorbox = {
    attach: function (context, settings) {
      $('a.colorbox-video').colorbox({ iframe:true, innerWidth:640, innerHeight:360 });
    }
  };

  /**
   * Add expand/collapse to Glossary terms
   */
  Drupal.behaviors.mhrCollapseAccordion = {
    attach: function(context, settings) {
      // Create the collapse button
      $('.view-glossary-of-terms .taxonomy-term.vocabulary-glossary-of-terms h3').each(function(index) {
        $(this).attr({ tabindex: '0', title: 'Press [enter] to read description'});
        $(this).prepend( '<span class="menu-collapser"></span>' );
        $(this).attr("aria-expanded", "false");
      });
      // Do the collapse on click
      $('.view-glossary-of-terms .taxonomy-term.vocabulary-glossary-of-terms h3').click(function(e) {
        expandCollapseGlossary($(this));
      });
      // Do the collapse on 'enter'
      $('.view-glossary-of-terms .taxonomy-term.vocabulary-glossary-of-terms h3').keypress(function(e) {
        if(e.which == 13) {
          expandCollapseGlossary($(this));
        }
      });

      function expandCollapseGlossary($this) {
        $this.parents('.field-name-title').next('.taxonomy-term-description').slideToggle();
        $this.toggleClass( 'menu-collapser-collapsed' );
        if ($this.hasClass("menu-collapser-collapsed")) {
          // It's open
          $this.attr("aria-expanded", "true");
        } else {
          $this.attr("aria-expanded", "false");
        }
      }
    }
  };

  /**
   * Add expand/collapse to How-to listings
   */
  Drupal.behaviors.mhrCollapseHowto = {
    attach: function(context, settings) {
      // Create the collapse button
      $('.vocabulary-how-to-category .field-name-title').each(function(index) {
        $(this).attr({ tabindex: '0', title: "Press [enter] to view list of How-to's"});
        $(this).prepend( '<span class="menu-collapser"></span>' );
        $(this).attr("aria-expanded", "false");
      });
      // Do the collapse on click
      $('.vocabulary-how-to-category .field-name-title').click(function(e) {
        expandCollapseHowTo($(this));
      });
      // Do the collapse on 'enter'
      $('.vocabulary-how-to-category .field-name-title').keypress(function(e) {
        if(e.which == 13) {
          expandCollapseHowTo($(this));
        }
      });
    }
  };

  function expandCollapseHowTo($this) {
    $this.next('.field-name-term-listing').slideToggle();
    $this.toggleClass( 'menu-collapser-collapsed' );
    if ($this.hasClass("menu-collapser-collapsed")) {
      // It's open
      $this.attr("aria-expanded", "true");
    } else {
      $this.attr("aria-expanded", "false");
    }
  }

  /**
   * Activate "keynav" mode, to better highlight tab focus, and to do not display outline on click (when off)
   */
  $(document).bind('keydown',function(event){
    if(event.keyCode == 9 ) {
      $('body').addClass('keynav');
    }
  });

  /**
   * Make landing blocks to match height
   */
  Drupal.behaviors.mhrLandingBlockHeight = {
    attach: function(context, settings) {
      // attach a class for both elements
      $( ".landing-page #content" ).addClass( "match-height" );
      $( ".landing-page aside" ).addClass( "match-height" );
      $( ".pane-bean-how-to-homepage .node-how-to-page .node-title > a, .pane-bean-how-to-homepage .block-contact" ).addClass( "match-height" );
    }
  };

  /**
   * Make the content match height
   */
  Drupal.behaviors.mhrEventMatchHeight = {
    attach: function(context, settings) {
      $('#block-bean-menu-navigation-prev-next a p').matchHeight();
      $('.pane-bean-for-healthcare-professionals-0 a.block-link').matchHeight();
      $('.pane-bean-how-to-home-page a.block-link').matchHeight();
      $('.vocabulary-how-to-category .field-name-title').matchHeight();
      $('.match-height').matchHeight();
      $('.node-how-to-page.view-mode-compact h3 > a').matchHeight();
      $('.statistic-numeric-items .item').matchHeight();
    }
  };

  /**
   * Tab order fixes
   */
  Drupal.behaviors.mhrTabOrder = {
    attach: function(context, settings) {
      $('#skip-link').attr("tabindex","1");
      $('#mhr-navigation-logo a').attr("tabindex","2");
      $('#block-superfish-1 ul li a').attr("tabindex","3");
      $('#edit-submit-1').attr("tabindex","4");
      $('#edit-keys-1').attr("tabindex","5");
      $('#block-block-12 a').attr("tabindex","6");
      $('#block-bean-readspeaker-button a').attr("tabindex","6");
      $('#block-locale-language select').attr("tabindex","7");
    }
  };

  /**
   * Make statistic Tables accessible (legacy)
   */
  Drupal.behaviors.mhrTablesAccessible = {
    attach: function(context, settings) {
      $(".about-statistics-breakdown-table thead th:not([scope])").attr('scope', 'col');
    }
  };

})(jQuery, Drupal, this, this.document);
