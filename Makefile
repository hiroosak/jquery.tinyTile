
#
# BUILD
# uglifyjs is required
#

tinyTile:
	mkdir -p build
	uglifyjs -nc src/jquery.tinyTile.js > build/jquery.tinyTile.min.js
