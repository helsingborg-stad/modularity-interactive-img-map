<?php

/**
 * Plugin Name:       Modularity Interactive Image Map
 * Plugin URI:
 * Description:       Build a interactive image map in a Modularity Module
 * Version:           1.0.0
 * Author:            Kristoffer Svanmark
 * Author URI:
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       modularity-interactive-map
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('MODULARITY_INTERACTIVE_MAP_PATH', plugin_dir_path(__FILE__));
define('MODULARITY_INTERACTIVE_MAP_URL', plugins_url('', __FILE__));
define('MODULARITY_INTERACTIVE_MAP_TEMPLATE_PATH', MODULARITY_INTERACTIVE_MAP_PATH . 'templates/');

load_plugin_textdomain('modularity-interactive-map', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once MODULARITY_INTERACTIVE_MAP_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once MODULARITY_INTERACTIVE_MAP_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new ModularityInteractiveMap\Vendor\Psr4ClassLoader();
$loader->addPrefix('ModularityInteractiveMap', MODULARITY_INTERACTIVE_MAP_PATH);
$loader->addPrefix('ModularityInteractiveMap', MODULARITY_INTERACTIVE_MAP_PATH . 'source/php/');
$loader->register();

// Start application
new ModularityInteractiveMap\App();
