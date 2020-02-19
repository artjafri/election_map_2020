import States from '/js/stateObjects.js'


$(document).ready(function () {
  var socket = new WebSocket('ws://' + document.location.host + '/ws');
  
  $.ajaxSetup({ 'cache': true });
  $('li').off('dblclick');


  // activate navbar
  $('#menuSelector').click(function () {
    $('#mySideNav').css('width', '250px');
    $('main').css('margin-left', '250px');
    $('body').css('background-color', 'rgba(0,0,0,0.4');
  });

  // main list function, activate by clicking item in navbar
  $('.navItem').click(function () {
    
     // delete previous controller
    $('#countyListDiv').empty();
  
    // reset ul inside of div to start creating controller
    var ul = $('<ul/>')
      .attr('id', 'countyList')
      .appendTo('#countyListDiv');

    // to compare navbar item to data
    let navID = $(this).text();
 
    // create new controller
    $.each(States, function (i, State) {
      
      // find the state you clicked on
      if (State.name == navID) {

        $('#menuSelector').text(navID);
        $('#mySideNav').css('width', '0');
        $('main').css('margin-left', '0');
        $('body').css('background-color', 'white');

        // create url for api GET
        var url =
          'http://10.18.55.37/tickit/blade/election/playlist/' + State.url + '/?format=jsonp&callback=?&pretty=yes';
         
        // AJAX GET to make API call for election playlist specific to state
        $.ajax({
          type: "GET",
          url: url,
          dataType: 'json',
          contentType: "application/json",
          headers: { 'accept': 'application/json' },
          crossDomain: true,
          success: function (data) {

            // GET req data
            var controlData = data;

            // Loop through data and create a controller per contest
            $.each(controlData.ElectionPlaylist.contest, function (i, County) {
              
              var contestId = County.id;
              var countyList = $('#countyList');
              var stateName = State.stateNameLength;
              var countyName = County.area.name;
              
              // make sure the first li is the whole state
              if (countyName.length > stateName) {
                countyName = countyName.substring(stateName, countyName.length);
              } else {
                countyName = 'STATEWIDE';
              }
               // append li 
              var li = $('<li/>')
                .attr('data-contest', contestId)
                .addClass('button')
                .text(countyName);
              var toBeAppended = li;

              toBeAppended.appendTo(countyList);
            });
            
            $("#countyListDiv").columnize({lastNeverTallest: true});
          }
        });
      };  
    });
  });
  
  $(document).on('click', '.button', function () {
    
    $('li').removeClass('selected')

    $(this).addClass('selected')

    console.log($(this).data('contest'))
  });
    // socket.send(selectedCounty);
 
});
