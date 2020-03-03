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
		$('<div/>', { class: 'candidate' }).append(
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
