<?php
class Known extends Plugin {
	private $host;

	function init($host) {
		$this->host = $host;

		$host->add_hook($host::HOOK_ARTICLE_BUTTON, $this);
	}

	function about() {
		return array(1.1,
			"Share article on Known (templated from Twitter plugin)",
			"nxd4n",
			false);
	}

	function get_js() {
		return file_get_contents(dirname(__FILE__) . "/known.js");
	}

	function hook_article_button($line) {
		$article_id = $line["id"];

		$rv = "<img height=\"16px\" 
			width=\"16px\" 
			src=\"plugins/known/known.png\"
			class='tagsPic' style=\"cursor : pointer\"
			onclick=\"knownArticle($article_id)\"
			title='".__('Share on Known')."'>";

		return $rv;
	}

	function getInfo() {
		$id = db_escape_string($_REQUEST['id']);

		$result = db_query("SELECT title, link
				FROM ttrss_entries, ttrss_user_entries
				WHERE id = '$id' AND ref_id = id AND owner_uid = " .$_SESSION['uid']);

		if (db_num_rows($result) != 0) {
			$title = truncate_string(strip_tags(db_fetch_result($result, 0, 'title')),
				100, '...');
			$article_link = db_fetch_result($result, 0, 'link');
		}

		print json_encode(array("title" => $title, "link" => $article_link,
				"id" => $id));
	}

	function api_version() {
		return 2;
	}

}
