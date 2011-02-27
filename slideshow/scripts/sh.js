$(document).ready(function() {

  // load stylesheet
  $("head").append("<link>");
  var css = $("head").children(":last");
  css.attr({
    rel: "stylesheet"
  , type: "text/css"
  , href: "./sh-styles/shCoreEclipse.css"
  });

  // load scripts
  $.ajaxSetup({async: false}); // turn off async

  // use version of shCore which fixes defect 220
  // see: https://bitbucket.org/alexg/syntaxhighlighter/issue/220/ie-only-conflict-with-jquery-animate
  $.getScript('./sh-scripts/shCore.js');
  $.getScript('./sh-scripts/shBrushRuby.js');
  $.getScript('./sh-scripts/shBrushPhp.js');
  $.getScript('./sh-scripts/shBrushPerl.js');
  $.getScript('./sh-scripts/shBrushPlain.js');
  $.getScript('./sh-scripts/shBrushJScript.js');

  $.ajaxSetup({async: false}); // turn on async

  // init syntaxhighlighter
  SyntaxHighlighter.highlight({
    gutter: true
  });
});

