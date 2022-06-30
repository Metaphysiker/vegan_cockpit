<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://www.philosophische-insel.ch/
 * @since      1.0.0
 *
 * @package    Vegan_Cockpit
 * @subpackage Vegan_Cockpit/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Vegan_Cockpit
 * @subpackage Vegan_Cockpit/includes
 * @author     Sandro Räss <s.raess@me.com>
 */
class Vegan_Cockpit_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'vegan-cockpit',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
