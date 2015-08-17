	function KnownArticle(id) {
	try {
		var query = "?op=pluginhandler&plugin=known&method=getInfo&id=" + param_escape(id);

		console.log(query);

		var d = new Date();
	  var ts = d.getTime();

		var w = window.open('backend.php?op=backend&method=loading', 'ttrss_tweet',
			"status=0,toolbar=0,location=0,width=500,height=600,scrollbars=1,menubar=0");

		new Ajax.Request("backend.php",	{
			parameters: query,
			onComplete: function(transport) {
				var ti = JSON.parse(transport.responseText);
				
				// edit the following line to match your site
				var share_url = "https:/url.to.your.KnownSite/share?" +
					"share_title=" + param_escape(ti.title) +
					"&share_url=" + param_escape(ti.link);

				w.location.href = share_url;

			} });


	} catch (e) {
		exception_error("Share to Known", e);
	}
	}

