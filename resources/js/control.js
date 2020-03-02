import States from '/js/stateObjects.js';

$(document).ready(function() {
	var socket = new WebSocket('ws://' + document.location.host + '/ws');

	// $.ajaxSetup({ 'cache': true });
	let stateDisplay = null;
	let stateId = null;
  let url = null;
	let controlData = null;

	// activate navbar
	$('#menuSelector').click(function() {
		$('#mySideNav').css('width', '250px');
		$('main').css('margin-left', '250px');
		$('body').css('background-color', 'rgba(0,0,0,0.4');
	});

	// main list function, activate by clicking item in navbar
	$('.navItem').click(function() {
	// to compare navbar item text to data to see which state you're using
    let navID = $(this).text();
    url = $(this).data('url');

    stateDisplay = navID;
    //url for the controller file
		let navURL = '/controllers/' + navID + '.html';

    //load url file
    $('#countyListDiv').load(navURL);
    //update header
		$('#menuSelector').text(navID);

		// close navbar
		$('#mySideNav').css('width', '0');
		$('main').css('margin-left', '0');
		$('body').css('background-color', 'white');
  });
  
  $(document).on('click', '.button', function() {
			$('li').removeClass('selected');
			$(this).addClass('selected');

    var selectedCounty = $(this).data('contest');
    var nameLength = stateDisplay.length;
  
    

			if ($(this).text() == 'STATEWIDE') {
				$('#menuSelector').text(stateDisplay + ' statewide');
			}
			else {
				$('#menuSelector').text($(this).text() + ' county');
    }
    

			var dataSet = {
				selectedCounty : selectedCounty,
        name: stateDisplay,
        nameLength: nameLength,
				url            : url,
			};

			socket.send(JSON.stringify(dataSet));
			console.log(stateDisplay, selectedCounty, url, nameLength);
		});
});
