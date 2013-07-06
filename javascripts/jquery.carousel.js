// Generated by CoffeeScript 1.6.3
/*
jQuery Carousel
Copyright 2010 - 2013 Kevin Sylvestre
*/


(function() {
  "use strict";
  var $, Animation, Carousel;

  $ = jQuery;

  Animation = (function() {
    function Animation() {}

    Animation.transitions = {
      "webkitTransition": "webkitTransitionEnd",
      "mozTransition": "mozTransitionEnd",
      "msTransition": "msTransitionEnd",
      "oTransition": "oTransitionEnd",
      "transition": "transitionend"
    };

    Animation.transition = function($el) {
      var el, result, type, _ref;
      el = $el[0];
      _ref = this.transitions;
      for (type in _ref) {
        result = _ref[type];
        if (el.style[type] != null) {
          return result;
        }
      }
    };

    return Animation;

  })();

  Carousel = (function() {
    Carousel.defaults = {};

    function Carousel($el, settings) {
      if (settings == null) {
        settings = {};
      }
      this.$el = $el;
      this.settings = $.extend({}, Carousel.defaults, settings);
    }

    Carousel.prototype.next = function() {
      return this.go("next");
    };

    Carousel.prototype.prev = function() {
      return this.go("prev");
    };

    Carousel.prototype.$fallback = function(direction) {
      var method;
      method = (function() {
        switch (direction) {
          case "prev":
            return "last";
          case "next":
            return "first";
        }
      })();
      return this.$(".previews .preview")[method]();
    };

    Carousel.prototype.$active = function() {
      return this.$(".previews .preview.active");
    };

    Carousel.prototype.inverse = function(direction) {
      switch (direction) {
        case "next":
          return "prev";
        case "prev":
          return "next";
      }
    };

    Carousel.prototype.go = function(direction) {
      var $active, $pending, animating, callback, inverse, transition;
      $active = this.$active();
      animating = "" + direction + "ing";
      $pending = $active[direction]();
      if (!$pending.length) {
        $pending = this.$fallback(direction);
      }
      inverse = this.inverse(direction);
      transition = Animation.transition($active);
      $pending.addClass(direction);
      $pending.offset().position;
      $active.addClass(animating);
      $pending.addClass(animating).addClass(direction);
      callback = function() {
        $active.removeClass('active').removeClass(animating);
        return $pending.addClass('active').removeClass(animating).removeClass(direction);
      };
      if (transition != null) {
        return $active.one(transition, callback);
      } else {
        return callback();
      }
    };

    Carousel.prototype.$ = function(selector) {
      return this.$el.find(selector);
    };

    return Carousel;

  })();

  $.fn.extend({
    carousel: function(option) {
      if (option == null) {
        option = {};
      }
      return this.each(function() {
        var $this, action, data, options;
        $this = $(this);
        data = $this.data("carousel");
        options = $.extend({}, $.fn.carousel.defaults, typeof option === "object" && option);
        action = typeof option === "string" ? option : option.action;
        if (data == null) {
          $this.data("carousel", data = new Carousel($this, options));
        }
        if (action != null) {
          return data[action]();
        }
      });
    }
  });

  $(document).on("click.carousel", "[data-action]", function(event) {
    var $target, $this, options;
    event.preventDefault();
    event.stopPropagation();
    $this = $(this);
    $target = $this.closest(".carousel");
    options = $.extend({}, $target.data(), $this.data());
    return $target.carousel(options);
  });

}).call(this);
