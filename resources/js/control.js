import States from '/js/stateObjects.js'


$(document).ready(function () {
  var socket = new WebSocket('ws://' + document.location.host + '/ws');
  
  $.ajaxSetup({ 'cache': true });

  $('li').off('dblclick');

  let stateDisplay = null;

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
  
    // create ul inside of main div for the controller to go into
    var ul = $('<ul/>')
      .attr('id', 'countyList')
      .appendTo('#countyListDiv');

    // to compare navbar item text to data to see which state you're using
    let navID = $(this).text();
 
    // create new controller
    $.each(States, function (i, State) {
      
      // find the state you clicked on
      if (State.name == navID) {

        // update header
        $('#menuSelector').text(navID);
        
        // close navbar
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

            // returned API data object
            var controlData = data;

            // Loop through data and create a controller per contest
            $.each(controlData.ElectionPlaylist.contest, function (i, County) {
              
              // contestId is the id of the county
              var contestId = County.id;

              // ul that holds the counties
              var countyList = $('#countyList');
              // Number used to substring the returned name to remove "state name - "
              var stateName = State.stateNameLength;
              // the county name with the state identifier attached
              var countyName = County.area.name;

              stateDisplay = State.name;

              
              if (countyName.length > stateName) {
                // cut out the state name from the county name
                countyName = countyName.substring(stateName, countyName.length);
               
              } else {
                // Makes sure to create the first li to be the whole state
                countyName = 'STATEWIDE';
              }
               // append li with county name and data to the ul controller
              var li = $('<li/>')
                .attr('data-contest', contestId)
                .addClass('button')
                .text(countyName);
              
                li.appendTo(countyList);
            });
            
            // format list into columns
            $("#countyListDiv").columnize({lastNeverTallest: true});
          }
        });
      };  
    });
  });
  
  $(document).on('click', '.button', function () { 
    $('li').removeClass('selected');
    $(this).addClass('selected');
    let selectedCounty = $(this).data('contest')
    var suffix = " county";
    
    if ($(this).text() == "STATEWIDE") {
      $('#menuSelector').text(stateDisplay + " statewide");

    } else {

      $('#menuSelector').text($(this).text() + suffix);
    }
    console.log(selectedCounty)
    socket.send(selectedCounty);

  });
     
});
