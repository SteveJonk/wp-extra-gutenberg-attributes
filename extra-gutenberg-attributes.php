<?php

/**
 * Plugin Name:       Extra Gutenberg Attributes
 * Description:       A plugin that adds extra attributes to the core Gutenberg blocks.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Stef
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       extra-gutenberg-attributes
 *
 * @package           stef
 */

namespace extra_gutenberg_attributes;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue specific modifications for the block editor.
 *
 * @return void
 */

function enqueue_editor_modifications()
{
	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
	wp_enqueue_script('extra-gutenberg-attributes', plugin_dir_url(__FILE__) . 'build/index.js', $asset_file['dependencies'], $asset_file['version'], true);
}
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_editor_modifications');

function enqueue_styles()
{
	$asset_file = include plugin_dir_path(__FILE__) . 'build/index.asset.php';
	wp_enqueue_style('extra-gutenberg-attributes', plugin_dir_url(__FILE__) . 'build/style-index.css', [], $asset_file['version']);
}

add_action('enqueue_block_assets', __NAMESPACE__ . '\enqueue_styles');
