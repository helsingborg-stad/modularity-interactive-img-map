var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.MapImage = (function ($) {

    var pinNumber = 0;

    var _categories;
    var _mediaModal;
    var _mapImage;

    function MapImage() {
        this.handleEvents();

        if ($('[name="interactive-map-image-id"]').val()) {
            this.mapSelected();
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
            $('#map-image .map-container img').remove();
            $('#map-image .map-container').prepend('<img src="' + map.url + '">');
            $('[name="interactive-map-image-id"]').val(map.id);
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

