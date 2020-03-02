$(document).ready(function () {
	var socket = new WebSocket('ws://' + document.location.host + '/ws');

	socket.onmessage = function (event) {
		var DATA = JSON.parse(event.data);
		var selectedCounty = DATA.selectedCounty;
		var selectedState = DATA.name;
		var counties = $("[class|= 'county']");
		var states = $('div.map');
		var mapBlocks = null;
		
		
		//console.log(selectedCounty, selectedState, states);

		// activate state
		$.each(states, function (i, STATES) {
			$(this).removeClass('active-state');
			if ($(this).attr('id') == selectedState) {
				$(this).removeClass('inactive-state');
				$(this).addClass('active-state');

				mapBlocks = $(this).find('path');
			}
			else {
				$(this).addClass('inactive-state');
			}
		});

	}
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
