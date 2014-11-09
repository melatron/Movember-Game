<?php
require_once '../app/Core/_init.php';

?>
<div id="fb-root"></div>
<script src="//connect.facebook.net/en_US/all.js"></script>
<script>
FB.init({
	appId  : '1559772020925764',
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml  : true, // parse XFBML
	channelUrl : 'http://54.93.196.194/Movember-Game/public/channel.html', // channel.html file
	oauth  : true // enable OAuth 2.0
});
</script>
