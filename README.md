[Socket.IO + Node Slideshow]
===========================
Socket.IO + Node Slideshow is a web-based presentation app that uses [node.js](http://nodejs.org) and [socket.IO](http://socket.io/) to both serve a slideshow and allow an administrator to control all browsers viewing the slideshow. 

This is a fork of Corey Hart's [Node Slideshow](http://www.codenothing.com/archives/2010/node-slideshow/). See the original Node Slideshow [video](http://www.youtube.com/watch?v=rSzyarICWiU) for a demonstration.


Usage
===========================
1. Install [node.js](http://nodejs.org/).
2. Checkout Socket.IO + Node Slideshow.
3. Start the node server:

./server.sh

By default, the slideshow in the /slideshow directory will be served.

To serve another directory, pass the name of the directory as the second argument to the server.sh script:

./server.sh foobarbaz

To demo the control function:

1. Open the slideshow url in a browser:

http://localhost:8080/index.html

2. Open the slideshow admin url in a separate browser:

http://localhost:8080/index.html?admin=true

Changing the slide viewed in the admin instance will cause the non-admin instance to also change.

This version of Socket.IO + Node Slideshow also integrates the alpha version of jQuery Mobile and has limited support of iOS swipe left and swipe right gestures. 


Credits
===========================
[Guillermo Rauch](http://devthought.com/) - Socket.IO
[Corey Hart](http://codenothing.com) - Original Websocket + Node Slideshow integration
[Rob Flaherty](http://www.ravelrumba.com) - Original Slideshow
[Hiroshi Ichikawa](http://github.com/gimite/web-socket-js) - Node.js Websocket
[Alex Gorbathev](http://alexgorbatchev.com) - SyntaxHighlighter
[Jon Fuller](http://erg7.com) - Socket.IO + Node Slideshow integration
