<?php
require(dirname(__FILE__) . '/app/user.php');
require(dirname(__FILE__) . '/app/utils.php');

// version replaced by Gruntfile as part of release
define('RG2VERSION', '1.5.4');
define("RG_LOG_FILE", dirname(__FILE__)."/log/rg2log.txt");

if (!file_exists(dirname(__FILE__) . '/index.html')) {
  echo "Routegadget 2: index.html not found.";
  return;
}

if (file_exists(dirname(__FILE__) . '/rg2-config.php')) {
    require_once(dirname(__FILE__) . '/rg2-config.php');
} else {
    echo "Routegadget 2: Configuration file " . dirname(__FILE__) . "/rg2-config.php not found.";
    return;
}

if (defined('UI_THEME')) {
    $ui_theme = UI_THEME;
} else {
    $ui_theme = 'base';
}

if (isset($_GET['debug'])) {
    $debug = TRUE;
  } else {
    $debug = FALSE;
  }

if (defined('HEADER_COLOUR')) {
    $header_colour = HEADER_COLOUR;
} else {
    $header_colour = '#002bd9';
}
if (defined('HEADER_TEXT_COLOUR')) {
    $header_text_colour = HEADER_TEXT_COLOUR;
} else {
    $header_text_colour = '#ffffff';
}

$json_url = RG_BASE_DIRECTORY . "/rg2/rg2api.php";
if (defined('OVERRIDE_SOURCE_DIRECTORY')) {
  $source_url = OVERRIDE_SOURCE_DIRECTORY . "/rg2";
} else {
  $source_url = RG_BASE_DIRECTORY . "/rg2";
}

// messy but works OK for now
// Overrides work OK on a local server which is what they are intended for
if (defined('OVERRIDE_KARTAT_DIRECTORY')) {
    $debug = true;
    $maps_dir = OVERRIDE_KARTAT_DIRECTORY;
    $maps_url = OVERRIDE_KARTAT_DIRECTORY;
} else {
    $maps_dir = "../kartat/";
    $maps_url = RG_BASE_DIRECTORY . "/kartat/";
}
define('KARTAT_DIRECTORY', $maps_dir);

// include manager function as parameter for now until we decide the best way forward
if (isset($_GET['manage'])) {
    $manager = true;
    $keksi = user::generateNewKeksi();
} else {
    $manager=  false;
}

// include language file if requested
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
} else {
    if ((defined('START_LANGUAGE'))) {
        $lang = START_LANGUAGE;
    } else {
        $lang = "en";
    }
}

// read in original index.html
$index = file_get_contents(dirname(__FILE__) . '/index.html');

// replace rg2Config
//$index = str_replace('./static/', './static/');
$index = str_replace('%RG_JSON_URL%', $source_url.'/rg2api.php', $index);
$index = str_replace('%RG_MAPS_URL%', $maps_url, $index);

header('Content-type: text/html; charset=utf-8');
echo $index
?>
