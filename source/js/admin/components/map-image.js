

    var _mediaModal;
    var _mapImage;

    var $ = (jQuery);

    $(document).ready(function(){
    	mapImage();
    });

    function mapImage() {

        $('[data-action="interactive-map-add-layer"]').on('click', function (e) {
            e.preventDefault();
            openMediaModal();
        }.bind(this));

        $('[data-action="interactive-map-remove-image"]').on('click', function (e) {
            e.preventDefault();
            removeMap();
        }.bind(this));

        $(document).on('click', '[data-action="interactive-map-remove-layer"]', function (e) {
            var layerId = $(e.target).closest('button').attr('data-layer-id');
            removeLayer(layerId);
        }.bind(this));

        $(document).on('click', '[data-action="interactive-map-toggle-layer"]', function (e) {
            var layerId = $(e.target).closest('button').attr('data-layer-id');
            toggleLayerVisibility(layerId, $(e.target).closest('button'));
        }.bind(this));

        if ($('[name="interactive-map-is-selected"]').val() == 1) {
            mapSelected();

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


    function toggleLayerVisibility(layerId, button) {

        if ($('img[data-layer-id="' + layerId + '"]').is(':visible')) {
            button.find('.fa').removeClass('fa-eye-slash').addClass('fa-eye');
            $('img[data-layer-id="' + layerId + '"]').hide();
            return;
        }

        button.find('.fa').removeClass('fa-eye').addClass('fa-eye-slash');
        $('img[data-layer-id="' + layerId + '"]').show();
        return;
    }

    function removeLayer(layerId) {
        $('[data-layer-id="' + layerId + '"]').remove();
    }

    function openMediaModal(btn) {
        if (_mediaModal) {
            // Open the modal
            _mediaModal.open();

            // Default to upload file tab
            $('.media-router a:first-of-type').trigger('click');

            return;
        }

        setupMediaModal();
    }

    function setupMediaModal() {
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

            mapSelected(selected);

        }.bind(this));

        openMediaModal();
    }

    function mapSelected(map) {
        $('[data-map-editor-no-map]').hide();
        $('[data-map-editor]').show();

        if (typeof map !== 'undefined') {
            $('#map-image .map-container').append('<img src="' + map.url + '" data-layer-id="' + map.id + '">');

            $('.no-map').remove();

            $('#map-layers').append('<li data-layer-id="' + map.id + '">\
                <input type="hidden" name="interactive-map-layers[' + map.id + '][id]" value="' + map.id + '">\
                <input type="text" name="interactive-map-layers[' + map.id + '][name]" value="' + map.title + '">\
                ' + ModularityInteractiveMap.MapPinCategories.getMultiSelector('interactive-map-layers[' + map.id + '][category]', null, null) + '\
                <div class="actions">\
                    <button type="button" class="button button-link" data-action="interactive-map-toggle-layer" data-layer-id="' + map.id + '"><span class="dashicons dashicons-hidden"></span></button>\
                    <button type="button" class="button button-link" data-action="interactive-map-remove-layer" data-layer-id="' + map.id + '"><span class="dashicons dashicons-trash"></span></button>\
                </div>\
            </li>');
        }
    }

    function removeMap() {
        $('[data-map-editor-no-map]').show();
        $('[data-map-editor]').hide();

        $('#map-image .map-container img').remove();
        $('[name="interactive-map-image-id"]').val('');
    }
