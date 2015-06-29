	function knownArticle(id) {
	try {
		var query = "?op=pluginhandler&plugin=known&method=getInfo&id=" + param_escape(id);

		console.log(query);

		var d = new Date();
	  var ts = d.getTime();

		var w = window.open('backend.php?op=backend&method=loading', 'ttrss_tweet',
			"status=0,toolbar=0,location=0,width=500,height=400,scrollbars=1,menubar=0");

		new Ajax.Request("backend.php",	{
			parameters: query,
			onComplete: function(transport) {
				var ti = JSON.parse(transport.responseText);
				var share_url = "https://nxd4n.nixekinder.be/share?" +
					"share_title=" + param_escape(ti.title) +
					"&share_url=" + param_escape(ti.link);

				w.location.href = share_url;

			} });


	} catch (e) {
		exception_error("tweetArticle", e);
	}
	}

