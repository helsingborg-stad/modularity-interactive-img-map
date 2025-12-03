<?php

declare(strict_types=1);

namespace ModularityInteractiveMap;

use WpUtilService\Features\Enqueue\EnqueueManager;

class App
{
    public function __construct(
        private EnqueueManager $wpEnqueue,
    ) {
        add_action('admin_enqueue_scripts', [$this, 'enqueueStyles']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueScripts']);

        add_action('init', [$this, 'registerModule']);
    }

    /**
     * Register the module
     * @return void
     */
    public function registerModule()
    {
        if (function_exists('modularity_register_module')) {
            modularity_register_module(MODULARITY_INTERACTIVE_MAP_MODULE_PATH, 'InteractiveMap');
        }
    }

    /**
     * Enqueue required style
     * @return void
     */
    public function enqueueStyles()
    {
        global $current_screen;

        if ($current_screen->id !== 'mod-interactive-map') {
            return;
        }

        $this->wpEnqueue->add('css/modularity-interactive-map.css', [], '3.0.0');
    }

    /**
     * Enqueue required scripts
     * @return void
     */
    public function enqueueScripts()
    {
        global $current_screen;

        if ($current_screen->id !== 'mod-interactive-map') {
            return;
        }

        $this->wpEnqueue
            ->add('js/modularity-interactive-map-admin.js', ['jquery'], '3.0.0')
            ->with()
            ->translation('ModInteractiveMapLang', [
                'close' => __('Close'),
                'remove' => __('Remove'),
                'description' => __('Description'),
                'link' => __('Link', 'modularity-interactive-map'),
                'title' => __('Title'),
            ]);
    }
}
