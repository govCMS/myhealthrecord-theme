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
 
  /**
   * Trigger menu for specified menu item (the second and the fifth)
   */
  Drupal.behaviors.triggerMegaMenu = {
    attach: function () {
      
      // This is 2 menu items that specified to have megamenu effect
      var secondMenu = $('li.sf-depth-1:nth-child(2) > ul');
      var fifthMenu = $('li.sf-depth-1:nth-child(5) > ul');     
      
      // Trigger megamenu style
      function triggerMegaMenuStyle() {
        var topMenuWidth = $('#block-superfish-1').width();
        var secondLeft = 0 - parseFloat($('li.sf-depth-1:nth-child(1)').width());        
        secondMenu.css({'width':topMenuWidth,'left':secondLeft});       
        fifthMenu.css({'width':topMenuWidth,'left':'auto'});
      }

      // Reset megamenu style
      function resetMegaMenuStyle() {      
        secondMenu.css({'width':'16em','left':'auto'});
        fifthMenu.css({'width':'16em','left':'auto'});
      }

      // On window load
      $(window).load(function () {
        if($(window).width() >= 1024) {
          triggerMegaMenuStyle();
        } else {
          resetMegaMenuStyle();
        }      
      });
      
      // On window resize
      $(window).resize(function () {
        if($(window).width() >= 1024) {
          triggerMegaMenuStyle();
        } else {
          resetMegaMenuStyle();
        }        
      });
      
    }
  }

  Drupal.behaviors.languageMenu = {
    attach: function (context, settings) {

      $languageBlock = $('ul.language-list').parent().parent().parent();

      if (!$('ul.language-list').hasClass('l_tinynav1')) {
        $('ul.language-list').tinyNav({
          active: 'active',
          label: 'Language selector',
          // header: 'Languages', // String: Specify text for "header" and show header instead of the active item
        }).remove();
      }

      // Auto-rotate it //
      var original = $('.tinynav option:selected', $languageBlock);
      var rotateInterval = setInterval( function() { startRotate() }, 2000);

      // Stop on focus and set the original selection
      $('.tinynav', $languageBlock).focus( function(event) {
          clearInterval(rotateInterval);
          var originalIndex = original.index();
          $('.tinynav option', $languageBlock).eq(originalIndex).prop('selected', true);
      });
      // Restart on loosing focus
      $('.tinynav', $languageBlock).blur(function() {
        rotateInterval = setInterval( function() { startRotate($languageBlock) }, 2000);
      });

      // The roating function
      function startRotate ($languageBlock) {
          var actual = $('.tinynav option:selected', $languageBlock);
          var actualIndex = actual.index();
          var nextIndex = (actualIndex + 1 == $('.tinynav option', $languageBlock).length) ? 0 : actualIndex + 1;
          var next = $('.tinynav option', $languageBlock).eq(nextIndex);
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
        var domainWhitelist          = ['my.gov.au', 'ehealth.gov.au', 'health.gov.au', 'myhealthrecord.gov.au'];
        var parsedHostname           = psl.parse(this.hostname); // Parse the domain
        var containsWhitelisted      = domainWhitelist.indexOf(parsedHostname.domain) >= 0;

        if (this.hostname && this.hostname !== location.hostname && !containsWhitelisted && !is_link_external_no_icon && !has_child_image) {
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
        $(this).attr({ tabindex: '0', title: "Press [enter] to view list of How-to's", role: 'button'});
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
   * Accessibility fixes
   */
  Drupal.behaviors.addAttributesHowto = {
    attach: function(context, settings) {
      // Add role="list" attribute to how to tiles on homepage
      $('.front .field-name-field-how-to-items .field-items').each(function(index) {
        $(this).attr({role: 'list'});
      });
      // Add role="listitem" attribute to how to tiles on homepage
      $('.front .field-name-field-how-to-items .field-items .field-item').each(function(index) {
        $(this).attr({role: 'listitem'});
      });
    }
  };

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
      $('article.view-mode-card').matchHeight();
      $('.view-news-and-media .view-mode-compact').matchHeight();
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
      $('select.tinynav').attr("tabindex","-1");
      $('select.tinynav').attr("aria-hidden", "true");
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

  /**
   * Make a shocking RTL hack
   */
  Drupal.behaviors.rtlHack = {
    attach: function(context, settings) {
      if ( $('body.rtl-pages').length ) {
        $("html").attr('dir', 'rtl');
      }
    }
  };

  /**
 * Wrap tables in responsive div
 */
Drupal.behaviors.psaResponsiveTables = {
  attach: function(context, settings) {

    // Create the wrapper div
    $('#main table').each(function(index) {
      $(this).wrap( '<div class="table-responsive"></div>' );
    });

    // Resizing the window adds or removes table wrapper class
    $( window ).resize(function() {

    // Get the width of the wrapper
    var containerWidth = $('.table-responsive').innerWidth();

      $('#main table').each(function() {
        $(this).parent().removeClass('large, small') ;
          // Get the width of the table and add a class depending on the size
          var tableWidth = $(this).width();
          // console.log(containerWidth);
          // console.log(tableWidth);
          if (tableWidth < containerWidth) {
              $(this).parent().addClass('large');
          } else {
              $(this).parent().addClass('small');
          }
      });
    });
  }
};

/*
 * Add a button to language selector
 */
  Drupal.behaviors.mhrLanguageButton = {
    attach: function(context, settings) {
      // Create the button
      $('#block-block-14, #block-block-16, #block-locale-language').prepend( '<a href="/node/1141" title="Information in your language" tabindex="7" class="button-language">Information in your language</a>' );
      //$("html").attr('dir', 'rtl');
    }
  };    

/*
 * Update the html language attribute for non-english content pages
 */
  Drupal.behaviors.mhrContentLanguage = {
    attach: function(context, settings) {
      // variables for content language
      var languages = [
        {name:"Arabic", metaTag:'[content="ar"]', lang:"ar"},
        {name:"Chinese", metaTag:'[content="zh-Hans"]', lang:"zh-Hans"}, //chinense-simplified
        {name:"Croatian", metaTag:'[content="hr"]', lang:"hr"},
        {name:"Greek", metaTag:'[content="el"]', lang:"el"},
        {name:"Hindi", metaTag:'[content="hi"]', lang:"hi"},
        {name:"Italian", metaTag:'[content="it"]', lang:"it"},
        {name:"Japanese", metaTag:'[content="ja"]', lang:"ja"},
        {name:"Korean", metaTag:'[content="ko"]', lang:"ko"},
        {name:"Macedonian", metaTag:'[content="mk"]', lang:"mk"},
        {name:"Persian", metaTag:'[content="fa"]', lang:"fa"},
        {name:"Punjabi", metaTag:'[content="pa"]', lang:"pa"},
        {name:"Russian", metaTag:'[content="ru"]', lang:"ru"},
        {name:"Serbian", metaTag:'[content="sr"]', lang:"sr"},
        {name:"Spanish", metaTag:'[content="es"]', lang:"es"},
        {name:"Thai", metaTag:'[content="th"]', lang:"th"},
        {name:"Turkish", metaTag:'[content="tr"]', lang:"tr"},
        {name:"Vietnamese", metaTag:'[content="vi"]', lang:"vi"}
      ]

      $.each(languages, function(index, lang) {
        // detect the language and update the html lang attribute
        if ($('head').find(lang.metaTag).length > 0) {
          $("html").attr('lang', lang.lang);
        }        
      });

    }
  };

})(jQuery, Drupal, this, this.document);
