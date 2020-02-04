$(document).ready(function () {
  var socket = new WebSocket('ws://' + document.location.host + '/ws')
  socket.onmessage = function(event) {
    var selectedCounty = parseInt(event.data);
    var counties = $("[class|= 'county']");

    $.each(counties, function (i, countyShape) {
      $(".county").removeClass('selected');
      if ($(this).data('contest') == selectedCounty) {
        $(this).addClass('selected');
        return false;
      }
    })

    var photoURL = "/images/candidate_portraits/";
    var url = "http://10.18.55.37/tickit/blade/election/event/28/IA-COUNTY-RESULTS/?format=jsonp&callback=?&pretty=yes";
    
    var countyNameDisplay = $('#county-name-display');
    var suffix = $('#suffix');

    $.ajax({
      type: "GET",
      url: url,
      dataType: 'json',
      contentType: "application/json",
      headers: { 'accept': 'application/json' },
      crossDomain: true,
      success: function (data) {
        var $candidateOne = $('#candidateOne');
        //data is counties

        $.each(data.ElectionEvent.contest, function (i, contestCounty) {
          if (contestCounty.id == selectedCounty) {
            //HEADER
            var countyName = contestCounty.area.name;
            var updatedCountyName = countyName.substring(7, countyName.length);

            if (countyName == "Iowa") {
              updatedCountyName = "Iowa";
              suffix.text(" Statewide");
            } else {suffix.text(" County")};
            //UPDATE HEADER
            countyNameDisplay.text(updatedCountyName);

            //CANDIDATE ONE
            var c1 = contestCounty.choice[0];
            var c1Fname = $('#cOneFirstName');
            var c1Lname = $('#cOneLastName');
            var c1VotePercentage = $('#cOneVotePercentage');
            var c1TotalVotes = $('#cOneTotalVotes');
            var c1Photo = $('#cOnePhoto');
            var c1PhotoSrc = $(c1Photo).attr('src');

            //UPDATE CANDIDATE ONE
            c1Fname.text(c1.firstName);
            c1Lname.text(c1.lastName);
            c1VotePercentage.text(c1.votes.votePercent + "%");
            c1TotalVotes.text(c1.votes.total);
            c1Photo.attr('src', photoURL + c1.headShot.media.fileName);

            // CANDIDATE TWO
            var c2 = contestCounty.choice[1];
            var c2Fname = $('#cTwoFirstName');
            var c2Lname = $('#cTwoLastName');
            var c2VotePercentage = $('#cTwoVotePercentage');
            var c2TotalVotes = $('#cTwoTotalVotes');
            var c2Photo = $('#cTwoPhoto');
            var c2PhotoSrc = $(c2Photo).attr('src');

            //UPDATE CANDIDATE Three
            c2Fname.text(c2.firstName);
            c2Lname.text(c2.lastName);
            c2VotePercentage.text(c2.votes.votePercent + "%");
            c2TotalVotes.text(c2.votes.total);
            c2Photo.attr('src', photoURL + c2.headShot.media.fileName);

            // CANDIDATE Three
            var c3 = contestCounty.choice[2];
            var c3Fname = $('#cThreeFirstName');
            var c3Lname = $('#cThreeLastName');
            var c3VotePercentage = $('#cThreeVotePercentage');
            var c3TotalVotes = $('#cThreeTotalVotes');
            var c3Photo = $('#cThreePhoto');
            var c3PhotoSrc = $(c3Photo).attr('src');

            //UPDATE CANDIDATE TWO
            c3Fname.text(c3.firstName);
            c3Lname.text(c3.lastName);
            c3VotePercentage.text(c3.votes.votePercent + "%");
            c3TotalVotes.text(c3.votes.total);
            c3Photo.attr('src', photoURL + c3.headShot.media.fileName);

            // CANDIDATE Three
            var c4 = contestCounty.choice[3];
            var c4Fname = $('#cFourFirstName');
            var c4Lname = $('#cFourLastName');
            var c4VotePercentage = $('#cFourVotePercentage');
            var c4TotalVotes = $('#cFourTotalVotes');
            var c4Photo = $('#cFourPhoto');
            var c4PhotoSrc = $(c4Photo).attr('src');

            //UPDATE CANDIDATE TWO
            c4Fname.text(c4.firstName);
            c4Lname.text(c4.lastName);
            c4VotePercentage.text(c4.votes.votePercent + "%");
            c4TotalVotes.text(c4.votes.total);
            c4Photo.attr('src', photoURL + c4.headShot.media.fileName);



            return false;
          }
        })
      }
    });
  };
});
