$(document).ready(function () {
    
    var state = '15/ALI-ST-AL';
    var url =  'http://10.18.55.37/tickit/blade/election/playlist/' + state + '/?format=jsonp&callback=?&pretty=yes';
	function getRequest() {
		$.ajax({
			type        : 'GET',
			url         : url,
			dataType    : 'json',
			contentType : 'application/json',
			headers     : { accept: 'application/json' },
			crossDomain : true,
			success     : function(data) {
				// returned API data object
				controlData = data;
				console.log(data);
			}
		});
    };

    setInterval(getRequest, 5000);
});
