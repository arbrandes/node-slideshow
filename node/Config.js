/**
 * Node Slideshow [VERSION]
 * [DATE]
 * Corey Hart @ http://www.codenothing.com
 */
// pick up slideshow
var slideshowName = process.argv[2];
if ( slideshowName === undefined ) { slideshowName = 'slideshow' };
console.log( 'loading config for ' + slideshowName );

this.Config = require('../' + slideshowName + '/Config').Config;

// set slideshowName
this.Config.slideshowName = slideshowName;
