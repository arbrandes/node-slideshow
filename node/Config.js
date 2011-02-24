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

// Port for master server
this.Config.masterport = 8008;

// Time (in milliseconds) for countdown timer
this.Config.timed = 45 * 60 * 1000;

// When to turn on warning color for countdown timer (in milliseconds)
this.Config.timeWarning = 15 * 60 * 1000;
