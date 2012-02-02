/*
 * jquery.tinyTile 1.0
 */
(function($) {

  test("initialize", function(){
    $("#tile").tinyTile();
    var children = $("div#tile").children();
    ok($("#tile").css('position'), 'relative');
    ok($(children[0]).css("top"), "0px");
    ok($(children[0]).css("left"), "0px");
    ok($(children[0]).outerWidth(), "200px");
    ok($(children[1]).css("left"), "203px");
  });

}(jQuery));
