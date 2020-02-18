$(document).ready(function () {
  var socket = new WebSocket('ws://' + document.location.host + '/ws')

  $('#refreshData').click(function () {
    var url = "http://10.18.55.37/tickit/blade/election/event/42/TestSuperTues/?format=jsonp&callback=?&pretty=yes";
    $.ajax({
      type: "GET",
      url: url,
      dataType: 'json',
      contentType: "application/json",
      headers: { 'accept': 'application/json' },
      crossDomain: true,
      success: function (data) {
        console.log(data)
        alert("refresh working");
      }
    });
  });

  $('li').click(function () {
    var selectedCounty = $(this).data('contest');
    var counties = $("[class|= 'county']");

    $('li').removeClass('active-county');
    $(this).addClass('active-county');

    socket.send(selectedCounty);
  });

});
