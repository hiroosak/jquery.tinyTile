/*
 * jquery.tinyTile 1.0
 *
 * Licensed same as jquery - under the terms of either the MIT License or the GPL Version 2 License
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {

  $.tinyTile = function(element, options) {
    var defaults = {
      row: 4,
      gutter: 12
    };

    var plugin = this;
    plugin.settings = {};

    var $element = $(element),
        element = element,
        height_data = [];

    plugin.init = function() {
      plugin.settings = $.extend({}, defaults, options);
      var s = plugin.settings,
          l = s.row - 1,
          width = $element.width(),
          col_width = (width - (l * s.gutter)) / s.row;
      plugin.settings = $.extend(plugin.settings, {
        width: width,
        col_width: col_width
      });
      plugin.generate();
    };

    plugin.generate = function() {
      var children = $element.children();
      $element.css('position', 'relative');
      $(children).css('overflow', 'hidden')
                 .css('position', 'absolute');
      $.each(children, _generate);
      $element.height(Math.max.apply(null, height_data));
    };

    var _generate = function(i, elm) {
        var s = plugin.settings,
            $child = $(elm),
            col = i % s.row,
            width = s.col_width,
            padding_left = $child.css('padding-left').replace('px', ''),
            padding_right = $child.css('padding-right').replace('px', '');

        if (!$child.data('tinyTile-generate')) {
          if (!height_data[col]) {
            height_data[col] = 0;
          }
          $child.width(width - padding_left - padding_right);
          $child.css('left', col * width + (col * s.gutter));
          $child.css('top', height_data[col]);
          $child.data('tinyTile-generate', 1);
          height_data[col] += ($child.outerHeight() + s.gutter);
        }
    };
    plugin.init();
  };

  $.fn.tinyTile = function(opt) {
    return this.each(function() {
      var plugin;
      if (plugin = $(this).data('tinyTile')) {
        plugin.generate();
      } else {
        plugin = new $.tinyTile(this, opt);
        $(this).data('tinyTile', plugin);
      }
    });
  };

}(jQuery));
