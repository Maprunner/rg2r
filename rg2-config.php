<?php
/**
 * The configuration file for RG2.
 *
 * This file should be modified to set up the details for a specific Routegadget installation.
 *
 */
  // Location of directory where Routegadget is installed.
  // This should have /kartat and /rg2 sub-directories.
  // Example define('RG_BASE_DIRECTORY', 'http://www.happyherts.routegadget.co.uk');
  define('RG_BASE_DIRECTORY', '//localhost');
  
  // allow js and css to be loaded from a separate location if needed
  // probably only relevant for routegadget.co.uk to avoid 100 copies of source files
  //define('OVERRIDE_SOURCE_DIRECTORY', 'http://www.routegadget.co.uk');

  // allow relocating kartat directory: only really relevant for development environment
  // path is relative to RG_BASE_DIRECTORY
  define('OVERRIDE_KARTAT_DIRECTORY', '../rg2-test-data/hh/kartat/');
   
  
    // location of Splitsbrowser files if required: see Wiki for details of how to install Splitsbrowser
  //define(  'SPLITSBROWSER_DIRECTORY', 'http://www.routegadget.co.uk/splitsbrowser');
  define(  'SPLITSBROWSER_DIRECTORY', '//localhost/splitsbrowser');

  // default language if not English: this is overridden if the query includes a language (e.g. ?lang=fi)
  // requires a dictionary file xx.js in the lang directory
  // define('START_LANGUAGE', 'no');

  // Set encoding for input data default UTF-8
  define('RG_INPUT_ENCODING', 'UTF-8');
  //
  // Set encoding for output data returned through API
  define('RG_OUTPUT_ENCODING', 'UTF-8//TRANSLIT//IGNORE');

  // User interface colour theme: see gallery at http://jqueryui.com/themeroller/
  // Example define('UI_THEME', 'smoothness');
  define('UI_THEME', 'base');

  // set these to an RGB colour definition to override default configuration of white text on blue background for the header
  // if you change them make sure the text shows up on the background
  define('HEADER_COLOUR', '#002bd9');
  define('HEADER_TEXT_COLOUR', '#ffffff');

  // text displayed at bottom of info dialog. Use '' to leave blank.
  // OS licence text below is neeeded for installations on routegadget.co.uk site.
  define('ADDITIONAL_INFO_TEXT', 'Maps published on this web site that contain OS data by permission of Ordnance Survey® Licence Number 100046745.');

  // proj4 co-ordinate reference system for new maps
  // see http://spatialreference.org/ref/epsg/ for master list
  // see http://spatialreference.org/ref/epsg/27700/ for example of UK National Grid
  // select "proj4" in the list see http://spatialreference.org/ref/epsg/27700/proj4/ for example parameter string
  //
  // Note: EPSG:27700 is built in to RG2 as default so you do NOT need to declare it here: this is just an example
  // EPSG:900913 (Google) is also built in
  // Uncomment the following lines and edit for the required co-ordinate system
  //
  //define('EPSG_CODE', "EPSG:32722");
  //define('EPSG_PARAMS', "+proj=utm +zone=22 +south +ellps=WGS84 +datum=WGS84 +units=m +no_defs ");