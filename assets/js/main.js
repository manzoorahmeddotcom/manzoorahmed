/* --------------------------------------------------------
    NIJHUM - Table of Contents
===========================================================
    1. Preloader
    2. Page Scroll Percentage
    3. Back to Top
    4. Hero Banner Scroll Button
    5. Color mode switcher
    6. Mini Contact Form
    7. Main Menu
    8. Sub-Menu
    9. Sticky Header
    10. Header Search
    11. Portfolio Gallery Grid
    12. Counter-up
    13. Testimonial Style-1
    14. Services Slider
    15. Gallery Slider
    16. Gallery Slider : with thumbs
    17. Parallaxie
    18. Skill Bar
    19. Google Map
    20. AOS
    21. Count-down
    22. Slider : Fullscreen
    23. Slider : Hero Thumbs
    24. Gallery Slider : Ribbon
    25. Home - Video Background
    26. Accordion
    27. Sliding Menu GSAP
    28. Typed JS
    29. Particles App
    30. Call all functions
-------------------------------------------------------- */
(function ($) {
  'use strict';

  window.Priyo = {
    init: function () {
      // jQuery: Selectors and variables
      this.slidingSocialItem = $(".priyo-social-list.slidingbar li");
      this.slidingContactItem = $(".slidingbar-contact-info .contact-info a");
      this.slidingNavAvatar = $(".nav-avatar img");
      this.slidingDividerLine = $(".divider.line");
    }
  };

  // 1. Preloader
  $(window).on("load", (event) => {
    setTimeout(() => {
    }, 3500);
    $(".loader-mask").delay(3000).fadeOut(400);

    function progress() {
      let count = 4;
      let per = 16;
      let loading = setInterval(animate, 15);

      function animate() {
        if (count === 100 && per === 400) {
          $(".percent").addClass("text-blink");
          $(".text").css("display", "block");
          clearInterval(loading);
        } else {
          per = per + 4;
          count = count + 1;
          $(".loading-progress").css("width", per + 'px');
          $(".percent").text(count + '%');
        }
      }
    }

    progress(event);
  });

  // 2. Page Scroll Percentage
  function pageScroll() {
    const scrollPercentage = () => {
      const scrollTopPosition = document.documentElement.scrollTop;
      const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = Math.round((scrollTopPosition / calcHeight) * 100);

      $('#progress').css("background", `conic-gradient(var(--color-primary) ${scrollValue}%, #edf1f4 ${scrollValue}%)`);
      $("#progress-value").text(`${scrollValue}%`);

      // ScrollProgress
      if (scrollTopPosition > 80 && scrollValue < 96) {
        $("#progress").addClass("active");
        $(".modal-show-btn").addClass("active");
      } else {
        $("#progress").removeClass("active");
        $(".modal-show-btn").removeClass("active");
      }
      // Back to Top
      const backToTop = $("#back_to_top");
      if (scrollValue > 95) {
        if (backToTop) {
          backToTop.addClass("active");
        }
      } else {
        if (backToTop) {
          backToTop.removeClass("active");
        }
      }
    }
    window.onscroll = scrollPercentage;
    window.onload = scrollPercentage;

    // 3. Back to Top
    $("#back_to_top").on("click", scrollToTop);
    $("#progress").on("click", scrollToTop);

    function scrollToTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

  }

  // 4. Hero Banner Scroll Button
  $(".scroll-btn").on("click", function () {
    $("html,body").animate({
        scrollTop: $("#down").offset().top - 62,
      },
      1250
    );
  });

  // 5. Color mode switcher
  function colorSwitcher() {
    let lightMode = localStorage.getItem("lightMode");

    // Set light-mode
    const enableLightMode = () => {
      $(document.body).addClass("light-mode");
      $(".toggle-text").text("Dark");
      $(".toggle-lightmode i").removeClass("fa-sun").addClass("fa-moon");
      $('.toggle-lightmode').addClass("animate");
      $(".nav-logo .light-version").css("display", "block");
      $(".nav-logo .dark-version").css("display", "none");
      localStorage.setItem("lightMode", "enabled");
    };

    // Disable light-mode
    const disableLightMode = () => {
      $(document.body).removeClass("light-mode");
      $(".toggle-text").text("Light");
      $(".toggle-lightmode i").removeClass("fa-moon").addClass("fa-sun");
      $('.toggle-lightmode').removeClass("animate");
      $(".nav-logo .light-version").css("display", "none");
      $(".nav-logo .dark-version").css("display", "block");
      localStorage.setItem("lightMode", null);
    };

    // Save LightMode History
    if (lightMode === "enabled") {
      enableLightMode();
    }

    // Add Event Listener
    $(".toggle-lightmode").on("click", () => {
      let lightMode = localStorage.getItem("lightMode");

      if (lightMode !== "enabled") {
        enableLightMode();
      } else {
        disableLightMode();
      }
    });
  }

  // 6. Mini Contact Form - Priyo Fixed Modal
  function miniContactForm() {
    const priyoModalWrapper = $('.modal-wrapper');
    const modalCloseBtn = $('.modal-close-btn');
    const modalShowBtn = $(".modal-show-btn");

    const priyoModal = () => {
      const priyoModalHeader = $('.modal-header');
      const scrollTopPosition = document.documentElement.scrollTop;
      const pageOffsetHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = Math.round((scrollTopPosition / pageOffsetHeight) * 100);

      // Modal Header Dynamic Background Color
      if (scrollPercentage <= 20) {
        priyoModalHeader.css("background", `linear-gradient(334deg, #fc269d, #3b0d43)`);
      } else if (scrollPercentage <= 40) {
        priyoModalHeader.css("background", `linear-gradient(141deg, #63e9c5, #1a1966)`);
      } else if (scrollPercentage <= 60) {
        priyoModalHeader.css("background", `linear-gradient(39deg, #464f68, #0d0c08)`);
      } else if (scrollPercentage <= 80) {
        priyoModalHeader.css("background", `linear-gradient(324deg, #14df9f, #3f5ea6)`);
      } else {
        priyoModalHeader.css("background", `linear-gradient(120deg, rgb(255, 0, 242) 0%, rgba(128, 0, 255, 1) 100%)`);
      }
    }
    // Live update
    $(window).on("load", priyoModal);
    $(window).on("scroll", priyoModal);

    // Close/Collapse Modal
    function closePriyoModal() {
      priyoModalWrapper.removeClass("show-modal-content");
      modalShowBtn.removeClass("show-btn-remove");
    }

    // Show/Expand Modal
    function showPriyoModal() {
      priyoModalWrapper.addClass("show-modal-content");
      modalShowBtn.addClass("show-btn-remove");
    }

    modalCloseBtn.on("click", closePriyoModal)
    modalShowBtn.on("click", showPriyoModal)
  }

  // 7. Main Menu
  // Current active menu
  $(".nav-menu-wrapper .menu-main li a").filter(function () {
    return this.href === location.href.replace(/#.*/, "");
  }).parents("li").addClass("current");

  $(".menu-open").on("click", () => {
    $(".menu-open, .nav-container, .offcanvas-overlay").addClass(
      "active"
    );
  });
  $(".menu-close, .offcanvas-overlay").on("click", () => {
    $(".menu-open, .nav-container, .offcanvas-overlay").removeClass(
      "active"
    );
  });

  // 8. Sub-Menu
  $('.menu-item-has-children').on("click", function () {
    $(this).find('.sub-menu').addClass('opened');
    $('.menu-main > li > a').addClass('hide');
    $('.sub-menu-close').addClass('active');
  });

  $('.sub-menu-close').on("click", function () {
    $('.sub-menu').removeClass('opened');
    $('.menu-main > li > a').removeClass('hide');
    $('.sub-menu-close').removeClass('active');
  }); // Sub-Menu End

  // 9. Sticky Header
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      $(".site-header").addClass("is-sticky");
    } else {
      $(".site-header").removeClass("is-sticky");
    }
  });

  // 10. Header Search
  $(".header-search").on("click", () => {
    $(".header-search, .search-container").addClass("active");
  });
  $(".search-close").on("click", () => {
    $(".header-search, .search-container").removeClass("active");
  });
  $(document).on("keydown", (e) => {
    if (e.key === "Escape") {
      $(".header-search, .search-container").removeClass("active");
    }
  });

  // 11. Portfolio Gallery Grid
  $(".grid").imagesLoaded(function () {
    $(".filter-item-btn").on("click", "button", function () {
      let filterValue = $(this).attr("data-filter");
      $grid.isotope({
        filter: filterValue,
      });
    });

    let $grid = $(".grid").isotope({
      itemSelector: ".grid-item, .grid-gallery",
      percentPosition: true,
      masonry: {
        columnWidth: ".grid-item, .grid-gallery"
      },
    });
  });
  // Filter Active
  $(".filter-item-btn > button").on("click", function (event) {
    $(this).siblings(".active").removeClass("active");
    $(this).addClass("active");
    event.preventDefault();
  });

  // 12. Counter-up
  $(".counter").counterUp();

  // 13. Testimonial Style-1
  $(".simple__slider-style-1").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4000,
    smartSpeed: 1500,
    responsive: {
      0: {
        items: 1,
      },
      481: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });

  // 14. Services Slider
  $(".simple__slider-style-2").owlCarousel({
    loop: true,
    nav: true,
    navText: [
      '<div class="priyo-icon-arrow left"></div>',
      '<div class="priyo-icon-arrow right"></div>',
    ],
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 1500,
    items: 1
  });

  // 15. Gallery Slider
  $(".gallery__slider").owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    smartSpeed: 1500,
    items: 1
  });

  // 16. Gallery Slider : with thumbs
  let swiper_widget_thumbs = new Swiper(".swiper__widget-thumb", {
    loop: true,
    spaceBetween: 18,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true
  });
  let swiper_widget_slide = new Swiper(".swiper__widget-slide", {
    loop: true,
    spaceBetween: 18,
    effect: "fade",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper_widget_thumbs,
    },
  });

  // 17. Parallaxie
  $(".parallaxie").parallaxie({
    speed: 1.1,
    offset: 50,
  });

  // 18. Skill Bar
  const priyoSkillBar = function () {
    $('.skillbar').each(function () {
      $(this).find('.skillbar-bar').animate({
        width: $(this).attr('data-skill-percent'),
      }, 3000);
      $(this).find('.skill-bar-percent').text($(this).attr('data-skill-percent'));
      $(this).find('.skill-bar-percent').animate({
        left: $(this).attr('data-skill-percent'),
      }, 3000);
    });
  }

  // 19. Google Map
  function basicmap() {
    let mapOptions = {
      zoom: 35,
      scrollwheel: false,
      center: new google.maps.LatLng(30.2026324, 66.9870024), // Quetta
      // This is where you would paste any style found on Snazzy Maps.
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "weight": "2.00"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#00010e"
            }
          ]
        },
        {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 45
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#020315"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#ea252c"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ea252c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#070707"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        }
      ] // End styles
    };
    let mapElement = document.getElementById("map");
    let map = new google.maps.Map(mapElement, mapOptions);
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(30.2026324, 66.9870024),
      map: map,
      title: "Manzoor Ahmed",
      icon: "/assets/images/shape/location.png",
    });
  }

  if ($("#map").length !== 0) {
    google.maps.event.addDomListener(window, "load", basicmap);
  }

  // 20. AOS
  AOS.init({
    offset: 0,
    duration: 1500,
    once: true
  });

  // 21. Count-down
  $("#countdown-active").countdown("2023/12/31", function (event) {
    $(this).html(
      event.strftime(
        '<div class="single-countdown"><h2>%D</h2><span>Days</span></div>' +
        '<div class="single-countdown"><h2>%H</h2><span>Hours</span></div>' +
        '<div class="single-countdown"><h2>%M</h2><span>Minutes</span></div>' +
        '<div class="single-countdown count-seconds"><h2>%S</h2><span>Seconds</span></div>'
      )
    );
  });

  // 22. Slider : Fullscreen
  let swiperSlider = new Swiper(".swiper__slider-fullscreen", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    mousewheel: true,
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000
  });

  // 23. Slider : Hero Thumbs
  let swiperSimpleSlider = new Swiper(".swiper__simple-slider", {
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1000
  });

  // 24. Gallery Slider : Ribbon
  let swiper = new Swiper(".swiper__gallery-ribbon", {
    slidesPerView: 1,
    breakpoints: {
      576: {
        slidesPerView: 2
      }
    },
    spaceBetween: 24,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 1500,
    centeredSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  // 25. Home - Video Background
  const YTPlayerID = document.getElementById('homeVideo');

  if (YTPlayerID) {
    $("#homeVideo").YTPlayer();
  }

  // 26. Accordion
  $(".accordion")
    .find(".accordion-title")
    .on("click", function () {
      $(this).toggleClass("active");
      $(this).next().slideToggle("fast");
      $(".accordion-content").not($(this).next()).slideUp("fast");
      $(".accordion-title").not($(this)).removeClass("active");
    });

  // 27. Sliding Menu GSAP
  const slidingMenu = () => {
    const menuTrigger = $(".menu-open");
    const offCanvas = $(".offcanvas-overlay");
    const menuClose = $(".menu-close");

    let slidingMenu = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "back.inOut(1.7)"
      },
    });

    let slidingSocial = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "back.inOut(1.7)"
      },
    });

    let slidingContact = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "back.inOut(1.7)"
      },
    });

    let slidingDivider = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "back.inOut(1.7)"
      },
    });

    let slidingAvatar = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "back.inOut(1.7)"
      },
    });

    if (menuTrigger) {
      menuTrigger.on("click", () => {
        slidingSocial.to(Priyo.slidingSocialItem, {
          opacity: 1,
          y: "0",
          stagger: 0.1
        });
        slidingContact.to(Priyo.slidingContactItem, {
          opacity: 1,
          y: "0",
          stagger: 0.05
        });
        slidingDivider.to(Priyo.slidingDividerLine, {
          opacity: 1,
          width: "calc(100% - 80px)"
        });
        slidingAvatar.to(Priyo.slidingNavAvatar, {
          opacity: 1,
          scale: 1
        });
      });
    }
    if (menuClose) {
      menuClose.on("click", () => {
        slidingSocial.to(Priyo.slidingSocialItem, {
          opacity: 0,
          y: "50px",
          stagger: 0.1
        });
        slidingContact.to(Priyo.slidingContactItem, {
          opacity: 0,
          y: "30px",
          stagger: 0.05
        });
        slidingDivider.to(Priyo.slidingDividerLine, {
          opacity: 0,
          width: "0"
        });
        slidingAvatar.to(Priyo.slidingNavAvatar, {
          opacity: 0,
          scale: 0
        });
      });
    }
    if (offCanvas) {
      offCanvas.on("click", () => {
        slidingSocial.to(Priyo.slidingSocialItem, {
          opacity: 0,
          y: "50px",
          stagger: 0.1
        });
        slidingContact.to(Priyo.slidingContactItem, {
          opacity: 0,
          y: "30px",
          stagger: 0.05
        });
        slidingDivider.to(Priyo.slidingDividerLine, {
          opacity: 0,
          width: "0"
        });
        slidingAvatar.to(Priyo.slidingNavAvatar, {
          opacity: 0,
          scale: 0
        });
      });
    }
  }

  // 28. Typed JS
  function priyoTypedJS() {
    // Animation timing
    var animationDelay = 2500,
      barAnimationDelay = 3800,
      barWaiting = barAnimationDelay - 3000,
      lettersDelay = 50,
      typeLettersDelay = 150,
      selectionDuration = 500,
      typeAnimationDelay = selectionDuration + 800,
      revealDuration = 600,
      revealAnimationDelay = 1500;

    initHeadline();

    function initHeadline() {
      singleLetters($('.cd-headline.letters').find('b'));
      animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
      $words.each(function () {
        var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
        let i;
        for (i in letters) {
          if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
          letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
        }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
      });
    }

    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function () {
        var headline = $(this);

        if (headline.hasClass('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(function () {
            headline.find('.cd-words-wrapper').addClass('is-loading')
          }, barWaiting);
        } else if (headline.hasClass('clip')) {
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10
          spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type')) {
          // assign to .cd-words-wrapper the width of its longest word
          var words = headline.find('.cd-words-wrapper b'),
            width = 0;
          words.each(function () {
            var wordWidth = $(this).width();
            if (wordWidth > width) width = wordWidth;
          });
          headline.find('.cd-words-wrapper').css('width', width);
        }

        // Trigger animation
        setTimeout(function () {
          hideWord(headline.find('.is-visible').eq(0))
        }, duration);
      });
    }

    function hideWord($word) {
      var nextWord = takeNext($word);

      if ($word.parents('.cd-headline').hasClass('type')) {
        var parentSpan = $word.parent('.cd-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');
        setTimeout(function () {
          parentSpan.removeClass('selected');
          $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function () {
          showWord(nextWord, typeLettersDelay)
        }, typeAnimationDelay);

      } else if ($word.parents('.cd-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length);
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          width: '2px'
        }, revealDuration, function () {
          switchWord($word, nextWord);
          showWord(nextWord);
        });

      } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
        $word.parents('.cd-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function () {
          hideWord(nextWord)
        }, barAnimationDelay);
        setTimeout(function () {
          $word.parents('.cd-words-wrapper').addClass('is-loading')
        }, barWaiting);

      } else {
        switchWord($word, nextWord);
        setTimeout(function () {
          hideWord(nextWord)
        }, animationDelay);
      }
    }

    function showWord($word, $duration) {
      if ($word.parents('.cd-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');

      } else if ($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({
          'width': $word.width() + 10
        }, revealDuration, function () {
          setTimeout(function () {
            hideWord($word)
          }, revealAnimationDelay);
        });
      }
    }

    function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');

      if (!$letter.is(':last-child')) {
        setTimeout(function () {
          hideLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else if ($bool) {
        setTimeout(function () {
          hideWord(takeNext($word))
        }, animationDelay);
      }

      if ($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
      }
    }

    function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');

      if (!$letter.is(':last-child')) {
        setTimeout(function () {
          showLetter($letter.next(), $word, $bool, $duration);
        }, $duration);
      } else {
        if ($word.parents('.cd-headline').hasClass('type')) {
          setTimeout(function () {
            $word.parents('.cd-words-wrapper').addClass('waiting');
          }, 200);
        }
        if (!$bool) {
          setTimeout(function () {
            hideWord($word)
          }, animationDelay)
        }
      }
    }

    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }
  }

  // 29. Particles App
  function particlesApp() {
    const particlesID = document.getElementById('particles-js');

    if (particlesID) {
      particlesJS('particles-js',

        {
          "particles": {
            "number": {
              "value": 40,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#FF4B6A"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#FF4B6A"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 5,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#FF4B6A",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
          "config_demo": {
            "hide_card": false,
            "background_color": "#FF4B6A",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
          }
        }
      );
    }
  }

  // 30. Call all functions
  window.onload = () => {
    Priyo.init();
    slidingMenu();
    pageScroll();
    colorSwitcher();
    miniContactForm();
    priyoSkillBar();
    priyoTypedJS();
    particlesApp();
  };

})(jQuery);