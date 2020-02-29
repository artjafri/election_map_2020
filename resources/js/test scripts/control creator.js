import States from '/js/test scripts/stateObjects.js'
  
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
            controlData = data;
           

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

              var CN = County.area.nameShort;
              var contestName = CN.substring(5, CN.length);

              stateDisplay = State.name;
              stateId = State.id;

              
              if (countyName.length > stateName) {
                // cut out the state name from the county name
                countyName = countyName.substring(stateName, countyName.length);
                countyName = countyName.replace('County', '');
               
              } else {
                // Makes sure to create the first li to be the whole state
                countyName = 'STATEWIDE';
              }
               // append li with county name and data to the ul controller
              var li = $('<li/>')
                .attr('data-contest', contestId)
                .attr('data-contest-name', contestName)
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