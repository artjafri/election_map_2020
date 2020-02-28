$(document).ready(function() {
	var socket = new WebSocket('ws://' + document.location.host + '/ws');

	socket.onmessage = function(event) {
		var DATA = JSON.parse(event.data);
		var selectedCounty = DATA.selectedCounty;
    var selectedState = DATA.map;
    var APdata = DATA.data;
		var counties = $("[class|= 'county']");
		var states = $('div.map');
    var $path = null;
    
    console.log(APdata)

		// activate state
		$.each(states, function(i, STATES) {
			$(this).removeClass('active-state');

			if ($(this).data('state') == selectedState) {
				$(this).removeClass('inactive-state');
				$(this).addClass('active-state');

				$path = $(this).find('path');
			}
			else {
				$(this).addClass('inactive-state');
			}
		});

		// console.log($path)

		$.each($path, function(i, COUNTY) {
			$(this).removeClass('selected-county');
			var id = $(this).attr('id') + ' county';
			id = id.toLowerCase();
			// console.log(id)
			if (id == selectedCounty.toLowerCase()) {
				$(this).removeClass('not-selected-county');
				$(this).addClass('selected-county');
			}
			else {
				$(this).addClass('not-selected-county');
			}
		});

    $.each($path, function (i, contestCounty) {
      
			var thisCounty = contestCounty.id + ' county';
			thisCounty = thisCounty.toLocaleLowerCase();
			selectedCounty = selectedCounty.toLocaleLowerCase();

			if (thisCounty == selectedCounty) {
				c1 = APdata.choice[1];
				var c1Fname = $('.fName');
				var c1Lname = $('.lName');
				var c1VotePercentage = $('.vote-percent');
				var c1TotalVotes = $('.total-votes');
				var c1Photo = $('#cOnePhoto');

				c1Fname.text(c1.firstName);
				c1Lname.text(c1.lastName);
				c1VotePercentage.text(c1.votes.votePercent + '%');
				c1TotalVotes.text(c1.votes.total);
			}
		});

		$('#county-name').text(selectedCounty);
		$('#state-name').text(DATA.name);

		// $.each(counties, function (i, countyshape) {

		// });
	};
});

// $.each(counties, function(i, countyShape) {
// 			$('.county').removeClass('selected');
// 			if ($(this).data('contest') == selectedCounty) {
// 				$(this).addClass('selected');
// 				return false;
// 			}
// 		});
//CANDIDATE ONE
// var c1 = contestCounty.choice[0];
// var c1Fname = $('#cOneFirstName');
// var c1Lname = $('#cOneLastName');
// var c1VotePercentage = $('#cOneVotePercentage');
// var c1TotalVotes = $('#cOneTotalVotes');
// var c1Photo = $('#cOnePhoto');
// var c1PhotoSrc = $(c1Photo).attr('src');
// // if (c1.lastName == "Total Write-ins") {
// //   c1.lastName == "Write-ins"
// // }

// //UPDATE CANDIDATE ONE
// c1Fname.text(c1.firstName);
// c1Lname.text(c1.lastName);
// c1VotePercentage.text(c1.votes.votePercent + "%");
// c1TotalVotes.text(c1.votes.total);
// c1Photo.attr('src', photoURL + c1.headShot.media.fileName);
