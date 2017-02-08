var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.MapImage = (function ($) {
    var _mediaModal;
    var _mapImage;

    function MapImage() {
        this.handleEvents();

        if ($('[name="interactive-map-is-selected"]').val() == 1) {
            this.mapSelected();

            $(document).ready(function () {
                $('#map-layers li').each(function () {
                    var id = $(this).attr('data-layer-id');
                    var category = $(this).attr('data-layer-category');

                    if (id) {
                        $(this).find('.actions').before(
                            ModularityInteractiveMap.MapPinCategories.getMultiSelector('interactive-map-layers[' + id + '][category]', category, null)
                        );
                    }
                });
            });

        }
    }

    MapImage.prototype.handleEvents = function() {
        $('[data-action="interactive-map-add-layer"]').on('click', function (e) {
            e.preventDefault();
            this.openMediaModal();
        }.bind(this));

        $('[data-action="interactive-map-remove-image"]').on('click', function (e) {
            e.preventDefault();
            this.removeMap();
        }.bind(this));

        $(document).on('click', '[data-action="interactive-map-remove-layer"]', function (e) {
            var layerId = $(e.target).closest('button').attr('data-layer-id');
            this.removeLayer(layerId);
        }.bind(this));
    };

    MapImage.prototype.removeLayer = function(layerId) {
        $('[data-layer-id="' + layerId + '"]').remove();

    };

    MapImage.prototype.openMediaModal = function(btn) {
        if (_mediaModal) {
            // Open the modal
            _mediaModal.open();

            // Default to upload file tab
            $('.media-router a:first-of-type').trigger('click');

            return;
        }

        this.setupMediaModal();
    };

    MapImage.prototype.setupMediaModal = function() {
        _mediaModal = wp.media({
            title: 'Map image',
            button: {
                text: 'Select'
            },
            multiple: false
        });

        _mediaModal.on('select', function () {
            var selected = _mediaModal.state().get('selection').first().toJSON();

            if (typeof selected === 'undefined') {
                return;
            }

            this.mapSelected(selected);

        }.bind(this));

        this.openMediaModal();
    };

    MapImage.prototype.mapSelected = function(map) {
        $('[data-map-editor-no-map]').hide();
        $('[data-map-editor]').show();

        if (typeof map !== 'undefined') {
            $('#map-image .map-container').append('<img src="' + map.url + '" data-layer-id="' + map.id + '">');

            $('.no-map').remove();

            $('#map-layers').append('<li data-layer-id="' + map.id + '">\
                <input type="hidden" name="interactive-map-layers[' + map.id + '][id]" value="' + map.id + '">\
                <input type="text" name="interactive-map-layers[' + map.id + '][name]" value="' + map.title + '">\
                ' + ModularityInteractiveMap.MapPinCategories.getMultiSelector('interactive-map-layers[' + map.id + '][category]', null, null) + '\
            </li>');
        }
    };

    MapImage.prototype.removeMap = function() {
        $('[data-map-editor-no-map]').show();
        $('[data-map-editor]').hide();

        $('#map-image .map-container img').remove();
        $('[name="interactive-map-image-id"]').val('');
    };

    return new MapImage();

})(jQuery);

