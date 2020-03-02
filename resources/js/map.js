$(document).ready(function() {
	var socket = new WebSocket('ws://' + document.location.host + '/ws');

	socket.onmessage = function(event) {
		var DATA = JSON.parse(event.data);
		var selectedCounty = DATA.selectedCounty;
		var selectedState = DATA.name;
		var namelength = DATA.namelength;
		var states = $('div.map');
		var key = DATA.url;
		var url = 'http://10.18.55.37/tickit/blade/election/playlist/' + key + '/?format=jsonp&callback=?&pretty=yes';
		var mapBlocks = null;

		//console.log(selectedCounty, selectedState, states);
		// activate state
		$.each(states, function(i, STATES) {
			$(this).removeClass('active-state');
			if ($(this).attr('id') == selectedState) {
				var counties = $("[class|= 'county']");

				$(this).removeClass('inactive-state');
				$(this).addClass('active-state');
				mapBlocks = $(this).find('path');

				$.ajax({
					type        : 'GET',
					url         : url,
					dataType    : 'json',
					contentType : 'application/json',
					headers     : { accept: 'application/json' },
					crossDomain : true,
					success     : function(data) {
						// returned API data object
						var controlData = data;

						$.each(controlData.ElectionPlaylist.contest, function (i, contest) {

							

							if (contest.id == selectedCounty) {
								
								var name = this.area.name;
								var contestName = name.substring(10, name.length);
								contestName = contestName.toLowerCase();
								
								$.each(counties, function (i, contestCounty) {

									$('.county').removeClass('selected-county');

									var id = this.id;
									var ID = id.toLowerCase();

									if (ID == contestName) {
										$(this).addClass('selected-county');

										return false;
									} 
								})

								
							}
						})
						console.log(controlData);
					}
				});
			}
			else {
				$(this).addClass('inactive-state');
			}
		});
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
