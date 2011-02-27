/**
 * Node Slideshow
 * Corey Hart @ http://www.codenothing.com
 */
jQuery(function(){

  // Return boolean TRUE/FALSE if platform is iOS
  function isiPhone(){
      return (
          (navigator.platform.indexOf("iPhone") != -1) ||
          (navigator.platform.indexOf("iPod") != -1)
      );
  }

  // return querystring value for a given key
  function getParameterByName( name )
  {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // determine if client is admin; fail closed
  var isAdmin = false;
  var adminParameter = getParameterByName('admin');
  if (adminParameter === 'true') {
    isAdmin = true;
  }

  var deck = jQuery('#deck')
    , slides = deck.children('section')
    , win = $(window)
    , slide = 0
    , width
    , height
    , timeid;

    // Slide Transition
    function change(){
      slide = parseInt(slide);
      window.location.hash = slide + 1;
      deck.stop().animate(
        { marginLeft: ( slide * width ) * -1 }
      , Config.transitions
      );

      // focusing on a div via javascript is broken in webkit & ff
      // if you need to scroll a slide vertically, click on it!
      // https://bugs.webkit.org/show_bug.cgi?id=22261
      /*
        deck.find("section").each(function(i) {
          $(this).removeAttr("tabindex");
        });
        var tmp = deck.find("section")[slide];
        $(tmp).attr("tabindex",0).focus();
      */

      // if admin, treat as controller
      if (socket && isAdmin) {
        socket.send({slide:slide});
      }
    }


    // Handle page resizing
    win.resize(function(){
      // Dimensions
      width = win.width();
      height = win.height();

      // Reset dimensions
      slides.width( width - 60 ).height( height - 30 );
      deck.width( width * slides.length + 100 );

      // Wait for resizing to finish before handling adjustments
      if ( timeid ) {
              timeid = clearTimeout( timeid );
      }
      timeid = setTimeout( change, 200 );
    })
    // Configure Dimensions
    .resize();

    // Capture mobile swipe events
    if ( isiPhone() === true ) {

      // add ui-page-active to all section elements
      $("section").each(function( index ) {
        $(this).addClass('ui-page-active');
      });

      // load jquery mobile
      // prevent scale information from being appended to doc
      $(document).bind("mobileinit", function(){
        $.extend(  $.mobile , {
          metaViewportContent: false
        });
      });

      $.getScript('./scripts/jquery.mobile-1.0a3.min.js', function() {
        
        // set up swipe events
        $(document).swipeleft(function( event ) {
          if ( slide + 1 < slides.length ) {
            slide++;
            change();
          }
          return false;
        });

        $(document).swiperight(function( event ) {
          if ( slide > 0 ) {
            slide--;
            change();
          }
          return false;
        });
      });
    }

    // Allow custom slide views
    // using document element to capture IE8 key events
    $(document).keydown(function( event ) {
      switch ( event.keyCode ) {
        case 9: // Tab
        case 13: // Enter
        case 32: // Spacebar
        case 39: // Right Arrow
                if ( slide + 1 < slides.length ) {
                  slide++;
                  change();
                }
                return false;

        case 8: // Backspace
        case 37: // Left Arrow
                if ( slide > 0 ) {
                  slide--;
                  change();
                }
                return false;
      }
    });


    // Auto select the slide so urls can be shared
    if ( window.location.hash && window.location.hash !== '' ) {
      slide = parseInt( window.location.hash.replace( /^.*#/, '' ), 10 ) - 1;
    }

    // Push the initial slide out
    change();

    // Only create the connection if allowed
    if ( Config.enableSocket ) {

      var socket = null;

      // load socket.io libs
      $.getScript('./scripts/socket.io.js', function() {

        // using socket.IO instead of websockets
        // for cross-browser support
        socket = new io.Socket(
            null
          , {port: 8080, rememberTransport: false}
        );
        socket.connect();

        // close connection 
        socket.on('close', function() {
          if ( window.console && window.console.warn ) {
            window.console.warn( 'Connection closed.' );
          }
        });

        // listen for messages
        socket.on('message', function( obj ) {
          var msg = JSON.parse( obj );
          // admin clients ignore slide change requests from other admins
          if ( msg.slide !== undefined && isAdmin === false ) {
            slide = msg.slide;
            change();
          }
        });

        // Garbage Collection
        window.onbeforeunload = function(){
          socket.disconnect();
        };

    }); // end socket.io
  } // end Config.enableSocket
});
