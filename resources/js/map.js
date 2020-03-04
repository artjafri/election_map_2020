$(document).ready(function() {
	var socket = new WebSocket('ws://' + document.location.host + '/ws');
	var previousState;
			var currentState;
	socket.onmessage = function(event) {
		var DATA = JSON.parse(event.data);
		var selectedCounty = DATA.selectedCounty;
		var selectedState = DATA.name;
		var nameSize = parseInt(DATA.stateNameSize);
		var states = $('div.map');
		var key = DATA.url;
		var url = 'http://10.18.55.37/tickit/blade/election/playlist/' + key + '/?format=jsonp&callback=?&pretty=yes';
	
		const counties = $("[class|= 'county']");
		
		//console.log(selectedCounty);

		var controlData;
		
		

		function callBack(response) {
			controlData = response;

			console.log("selected county" + selectedCounty);
			
			currentState = selectedState;
			
			countyLead();

			if (previousState != currentState) {

				console.log(previousState, currentState, "did it change?");
				activateState();
			}
			
			displayUpdate();
			selectedPath();
			previousState = currentState;
			
		}

		$.ajax({
			type        : 'GET',
			url         : url,
			dataType    : 'json',
			contentType : 'application/json',
			headers     : { accept: 'application/json' },
			crossDomain : true,
			success     : callBack
		});


		var selectedPath = function () {
		
		}

		var countyLead = function () {
			console.log("county lead " + selectedCounty)
			
			$.each(controlData.ElectionPlaylist.contest, function (i, contest) {
				
				if (contest.id == selectedCounty) {
					
					$.each(counties, function (i, colorCounty) {				
					
					$('.county').removeClass('selected-county');
					$('.county').removeClass('not-selected-county')
						
					var countyId = $(this).data('contest')

					if (countyId == selectedCounty) {
						console.log("counties in county lead " + $(this).attr('id'))
						$(this).addClass('selected-county');
						return false
					}
				});



				}

				
				//add the color attribute here and then fill in the choice in the sidebar when selected
			});
		};

		var displayUpdate = function () {
			
			$.each(controlData.ElectionPlaylist.contest, function(i, contest) {
				let contestID = this.id;

				if (contestID == selectedCounty) {	
					// delete candidates
					$('#candidates').empty();

					// update side bar
					var countyNameDisplay = this.area.nameShort;
					var reportingPercentDisplay = this.polls.reportedPercent;
					if (countyNameDisplay.length <= 5) {
						$('#county-name-display').text('Statewide');
					}
					else {
						countyNameDisplay = countyNameDisplay.substring(5, countyNameDisplay.length);
						$('#county-name-display').text(countyNameDisplay);
					}

					// update reporting percent
					if (reportingPercentDisplay.length <= 0) {
						$('#reporting-display').text('none');
					} else {
						$('#reporting-display').text(reportingPercentDisplay + " %");	
					}
					

					// create candidates
					for (var i = 0; i < 5; i++) {
						var currentChoice = this.choice[i];

						let candidate = {
							fName          : currentChoice.firstName,
							lName          : currentChoice.lastName,
							totalVotes     : currentChoice.votes.total,
							votePercentage : currentChoice.votes.votePercent,
							photo          : '/images/candidate_portraits/' + currentChoice.headShot.media.fileName
						};

						$('#candidates').append(
							$('<div/>', { class: 'candidate'}).append(
								$('<img/>', { class: 'portrait', src: candidate.photo }),
								$('<div/>', { class: 'subSec-1' }).append(
									$('<h1/>', {
										class : 'fName',
										text  : candidate.fName
									}),
									$('<h1/>', {
										class : 'lName',
										text  : candidate.lName
									})
								),
								$('<div/>', { class: 'subSec-2' }).append(
									$('<h1/>', {
										class : 'vote-percent',
										text  : candidate.votePercentage
									}).append($('<span/>', { class: 'perc-symbol', text: '%' })),
									$('<h1/>', {
										class : 'total-votes',
										text  : candidate.totalVotes + ' votes'
									})
								)
							)
						);
					}
				}
			});
		};

		var activateState = function () {
			
			$('#state-name-display').text(selectedState);
			// activate state
			animateOff();

			// $.each(states, function (i, STATES) {

			// 	$(this).removeClass('active-state');

			// 	if ($(this).attr('id') != selectedState) {
			// 		$(this).addClass('inactive-state')

			// 	}
			// 	else {
			// 		$(this).removeClass('inactive-state');
			// 		$(this).addClass('active-state');
			// 	}
			// });
			animateOn();
		};

		var animateOff = function() {
			$('.map').animate(
				{
					right : '-100%'
				},
				500,
				function() {
					$.each(states, function(i, STATES) {
						$(this).removeClass('active-state');

						if ($(this).attr('id') != selectedState) {
							$(this).addClass('inactive-state');
							console.log('changed')
						}
						else {
							$(this).removeClass('inactive-state');
							$(this).addClass('active-state');
						}
					});
				}
			);
		};

		var animateOn = function() {
			$('.map').animate(
				{
					right : '0'
				},
				500, function () {
					displayUpdate();
				}
			);
		};
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
