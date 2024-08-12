<?php
/**
 * Plugin Name:       Frames
 * Plugin URI:        https://github.com/transistorpress/frames
 * Description:       Frame your content in UI chrome.
 * Requires at least: 6.6
 * Requires PHP:      8.3
 * Version:           0.1.0
 * Author:            TransistorPress
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       frames
 * Domain Path:       tp-frames
 *
 * @package Transistorpress
 */
namespace TransistorPress\Frames;

defined( '\\ABSPATH' ) || exit;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', __NAMESPACE__ . '\\init' );
