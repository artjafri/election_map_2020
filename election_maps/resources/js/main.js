

$(document).ready(function () {
    
    // detect click on controller LI
    $('li').click(function () {
       
        var selectedCounty = $(this).data('contest');
        var counties = $("[class|= 'county']");
 
        $('li').removeClass('active-county');
        $(this).addClass('active-county');
        
        $.each(counties, function (i, countyShape) {
            $(".county").removeClass('selected');
            if ($(this).data('contest') == selectedCounty) {
                $(this).addClass('selected');
                return false;
            }
        })

   
        var photoURL = "resources\\images\\candidate_portraits\\";

        var url = "http://10.18.55.37/tickit/blade/election/event/27/Counties-Iowa-2020/?format=jsonp&callback=?&pretty=yes";


        var countyNameDisplay = $('#county-name-display');
        var contestId = selectedCounty//$(this).data('contest');
        
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
               
                //console.log(data.ElectionEvent.contest[0]); 
                $.each(data.ElectionEvent.contest, function (i, contestCounty) {
                   
                    if (contestCounty.id == contestId) {
                        //HEADER
                        var countyName = contestCounty.area.name;
                        var updatedCountyName = countyName.substring(7, countyName.length);
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

                        return false;
                    }
                })
            }
        });
        

       


    });
});


