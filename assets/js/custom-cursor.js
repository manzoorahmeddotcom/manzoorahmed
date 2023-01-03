// Custom Cursor
function customCursor(options) {
  let settings = $.extend({
      targetClass: 'custom-cursor', // create element with this class
      wrapper: $('body'), // jQuery
      speed: .1,
      movingDelay: 300, // fire event onStop after delay
      hasHover: false, // has hover events
      hoverTarget: $('a[href], button, .pointer_large'),
      touchDevices: false, // show on touch devices
      onMove: function (data) {
      }
    }, options),
    data = {},
    checkTouch = !settings.touchDevices && "undefined" !== typeof document.documentElement.ontouchstart,
    timer = null;
  // Exit
  if (checkTouch || !settings.wrapper.length) return;
  // Append the ball
  settings.wrapper.append(`<div class="${settings.targetClass}"></div>`);
  let $cursor = $('.' + settings.targetClass),
    position = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    },
    mouse = {
      x: position.x,
      y: position.y
    },
    setX = gsap.quickSetter($cursor, "x", "px"),
    setY = gsap.quickSetter($cursor, "y", "px");
  // up<a href="https://www.jqueryscript.net/time-clock/">date</a> data
  data.cursor = $cursor;
  // On mousemove
  window.addEventListener("mousemove", init);

  function init() {
    // Remove default mousemove event
    window.removeEventListener("mousemove", init);
    // Add new custom event
    window.addEventListener("mousemove", e => {
      mouse.x = e.x;
      mouse.y = e.y;
      // Update data and trigger event
      data.isMoving = true;
      settings.onMove(data);
      timer = setTimeout(function () {
        // update data and trigger event
        data.isMoving = false;
        settings.onMove(data);
      }, settings.movingDelay);
    });
    // fade-out cursor
    document.addEventListener("mouseleave", e => {
      // update data and trigger event
      data.isInViewport = false;
      settings.onMove(data);
    });
    // update cursor's position
    document.addEventListener("mouseenter", e => {
      mouse.x = position.x = e.x;
      mouse.y = position.y = e.y;
      // update data and trigger event
      data.isInViewport = true;
      settings.onMove(data);
    });
    gsap.ticker.add((time, deltaTime) => {
      let fpms = 60 / 1000,
        delta = deltaTime * fpms,
        dt = 1 - Math.pow(1 - settings.speed, delta);
      position.x += (mouse.x - position.x) * dt;
      position.y += (mouse.y - position.y) * dt;
      setX(position.x);
      setY(position.y);
    });
    data.isInViewport = true;
  }

  // On hover
  if (settings.hasHover && settings.hoverTarget.length) {
    setTimeout(function () {
      settings.hoverTarget.hover(function () {
        data.hoverTarget = $(this);
        data.isHover = true;
        settings.onMove(data);
      }, function () {
        data.hoverTarget = $(this);
        data.isHover = false;
        settings.onMove(data);
      });
    }, 100);
  }
}

// Big ball
customCursor({
  hasHover: true,
  onMove: function (data) {
    if (data.isInViewport) {
      // In viewport
      if (data.isMoving) {
        if (data.isHover) {
          gsap.to(data.cursor, {
            opacity: .5,
            scale: 1.5
          });
        } else {
          gsap.to(data.cursor, {
            opacity: .5,
            scale: .8
          });
        }
      } else {
        if (data.isHover) {
          gsap.to(data.cursor, {
            opacity: .5,
            scale: 1.5
          });
        } else {
          gsap.to(data.cursor, {
            opacity: .25,
            scale: 1
          });
        }
      }
    } else {
      // Out viewport
      gsap.to(data.cursor, {
        opacity: 0,
        scale: 0
      });
    }
  },
});
// Dot inside
customCursor({
  targetClass: 'custom-cursor-dot',
  speed: .5,
  onMove: function (data) {
    if (data.isInViewport) {
      gsap.to(data.cursor, {
        opacity: 1
      });
    } else {
      gsap.to(data.cursor, {
        opacity: 0
      });
    }
  },
});

// Buttons
function magneticButton(options) {
  let settings = $.extend({
      target: $('[data-magnetic]'), // jQuery element
      class: 'magnetizing',
      attraction: 0.45, // 1 is weak, 0 is strong
      distance: 50, // magnetic area around element
      onEnter: function (data) {
      },
      onExit: function (data) {
      },
      onUpdate: function (data) {
      },
    }, options),
    isEnter = false,
    // distance from mouse to center of target
    distanceFromMouse = function ($target, mouseX, mouseY) {
      let centerX = $target.offset().left + $target.outerWidth() / 2,
        centerY = $target.offset().top + $target.outerHeight() / 2,
        pointX = mouseX - centerX,
        pointY = mouseY - centerY,
        distance = Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2));
      return Math.floor(distance);
    },
    // Processing
    magnetize = function ($this, e) {
      let mouseX = e.pageX,
        mouseY = e.pageY;
      $this.each(function () {
        let $this = $(this),
          centerX = $this.offset().left + $this.outerWidth() / 2,
          centerY = $this.offset().top + $this.outerHeight() / 2,
          deltaX = Math.floor(centerX - mouseX) * -1 * settings.attraction,
          deltaY = Math.floor(centerY - mouseY) * -1 * settings.attraction,
          mouseDistance = distanceFromMouse($this, mouseX, mouseY),
          data = {
            target: $this,
            y: deltaY,
            x: deltaX,
            distance: mouseDistance
          };
        if (mouseDistance < settings.distance) {
          gsap.to($this, {
            y: deltaY,
            x: deltaX
          });
          // enter
          if (!isEnter) {
            isEnter = true;
            $this.addClass(settings.class);
            settings.onEnter(data);
          }
          // update
          settings.onUpdate(data);
        } else {
          gsap.to($this, {
            y: 0,
            x: 0
          });
          // exit
          if (isEnter) {
            isEnter = false;
            $this.removeClass(settings.class);
            settings.onExit(data);
          }
        }
      });
    };
  // exit
  if (!settings.target.length) return;
  // on mouse move
  $(window).on('mousemove', function (e) {
    magnetize(settings.target, e);
  });
}

// init
magneticButton({
  distance: 50,
  onEnter: function (data) {
    gsap.to(data.target, {scale: 0.75});
  },
  onExit: function (data) {
    gsap.to(data.target, {scale: 1});
  },
  onUpdate: function (data) {
    gsap.to(data.target, {scale: 1});
  }
});

//   Follower
function cursorFollowAndReturn(options) {
  let settings = $.extend({
    follower: '', // jQuery element
    container: '', // jQuery element
  }, options);
  // exit if elements are not found
  if (!settings.follower.length && !settings.container.length) return;
  // set button position when mouse move inside wrapper
  settings.container.on("mousemove", function (e) {
    let x = e.pageX,
      y = e.pageY, // mouse offset
      offsetX = settings.container.offset().left, // container offset
      offsetY = settings.container.offset().top,
      valX = x - offsetX - (settings.container.outerWidth() / 2),
      valY = y - offsetY - (settings.container.outerHeight() / 2);
    gsap.to(settings.follower, .5, {
      x: valX,
      y: valY
    });
  });
  // set button to center of wrapper when mouse out
  settings.container.on("mouseout", function (e) {
    gsap.to(settings.follower, .5, {
      x: 0,
      y: 0
    });
  });
}

// init
cursorFollowAndReturn({
  follower: $('.follower'),
  container: $('.follower-area'),
});
// Custom Cursor End