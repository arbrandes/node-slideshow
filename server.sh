#!/bin/bash
#
# Node Slideshow [VERSION]
# [DATE]
# Corey Hart @ http://www.codenothing.com
#

SLIDESHOW=${1:-slideshow}

node node/server.js ${SLIDESHOW}
