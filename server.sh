#!/bin/bash
#
# Node Slideshow [VERSION]
# [DATE]
# Corey Hart @ http://www.codenothing.com
#

p1=$1 # capture slideshowName

node node/socket-io-server.js $p1
