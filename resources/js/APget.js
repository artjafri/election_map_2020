$(document).ready(function () {

	var socket = new WebSocket('ws://' + document.location.host + '/ws');
    
    var state = '15/ALI-ST-AL';
	var url = 'http://10.18.55.37/tickit/blade/election/playlist/15/ALI-ST-AL/?format=jsonp&callback=?&pretty=yes';

	
    setInterval(getRequest, 5000);
});
