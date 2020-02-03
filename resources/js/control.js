$(document).ready(function () {
  var socket = new WebSocket('ws://' + document.location.host + '/ws')

  $('li').click(function () {
    var selectedCounty = $(this).data('contest');
    var counties = $("[class|= 'county']");

    $('li').removeClass('active-county');
    $(this).addClass('active-county');

    socket.send(selectedCounty);
  });
});
