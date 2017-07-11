/**
 * Created by Ron on 10/30/2016.
 */
$(document).ready(function () {
  var colors = ['#EEEEEE', '#5B8E3F'];
  var nav = $('nav');
  var logo = $('#logo');
  var scrolled = false;

  //animations on page load
  $('#title').children('h2').css({
    opacity: '1',
    'transform': 'translateY(0)'
  });
  $('#content').find('div').css({
    opacity: '1',
    'transform': 'translateY(0)'
  });

  //scroll event handler
  var el = $(window), lastY = el.scrollTop();
  el.on('scroll', function() {
    // get current scroll position
    var currY = el.scrollTop(),
      // determine current scroll direction
      y = (currY > lastY) ? 'down' : ((currY === lastY) ? 'none' : 'up');

    //how far before navbar changes
    var dist = 50;

    //if user scrolled up
    if (y == 'up') {
      if (scrolled && currY <= dist) {
        navChange(0);
      }
    }
    //if user scrolled down
    else if (y == 'down') {
      if (!scrolled && currY > dist) {
        navChange(1);
      }
    }
    lastY = currY;
  });

  //function that changes the navbar on scroll
  function navChange(color) {
    logo.fadeOut(200, function () {
      logo.css('color', colors[color]);
    });
    logo.fadeIn(100);
    nav.fadeToggle(500);
    scrolled = !scrolled;
  }
});