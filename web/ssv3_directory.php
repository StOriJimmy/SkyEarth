<?php
error_reporting(0);
@ini_set('cgi.fix_pathinfo', 1);
if (is_dir($_POST['directory']) && !is_dir_empty($_POST['directory'])) {
	echo 1;
} else {
	echo 0;
}

	function is_dir_empty($dir) {
	if (!is_readable($dir)) return null;
		$handle = opendir($dir);
		while (false !== ($entry = readdir($handle))) {
			if ($entry != "." && $entry != "..") {
				return false;
			}
		}
	return true;
	}


exit;