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


var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.MapPinCategories = (function ($) {

    var numCategories = 0;
    var numMultiselectors = 0;

    function MapPinCategories() {
        this.handleEvents();
    }

    /**
     * Handle evets
     * @return {void}
     */
    MapPinCategories.prototype.handleEvents = function() {
        $('[data-action="interactive-map-add-pin-category"]').on('click', function (e) {
            e.preventDefault();
            this.addCategory();
        }.bind(this));

        $(document).on('click', '[data-action="interactive-map-add-remove-category"]', function (e) {
            e.preventDefault();
            var $btn = $(e.target).closest('[data-action="interactive-map-add-remove-category"]');
            this.removeCategory($btn.attr('data-category-name'));
        }.bind(this));

        $(document).on('change', '.map-pin [data-map-category-selector]', function (e) {
            var $pin = $(this).parents('.map-pin');
            var color = $(this).find('option:selected').attr('data-color');

            $pin.css('backgroundColor', color);
        });
    };

    MapPinCategories.prototype.getSelector = function(name, current, classes) {
        if (typeof current === 'undefined') {
            current = null;
        }

        if (typeof classes === 'undefined') {
            classes = 'widefat';
        }

        var categories = this.getAll('numeric');
        var $select = $('<select class="' + classes + '" name="' + name + '" data-map-category-selector></select>');

        $select.append('<option value="" selected>-</option>');

        $.each(categories, function (index, item) {
            if (item.name === current) {
                $select.append('<option style="color:' + item.color + ';" value="' + item.name + '" data-color="' + item.color + '" selected>' + item.name + '</option>');
                return;
            }

            $select.append('<option style="color:' + item.color + ';" value="' + item.name + '" data-color="' + item.color + '">' + item.name + '</option>');
        }.bind(this));

        return $select[0].outerHTML;
    };

    MapPinCategories.prototype.getMultiSelector = function(name, current) {
        numMultiselectors++;

        current = current.split('|');

        if (typeof current === 'undefined') {
            current = null;
        }

        var categories = this.getAll('numeric');

        var $wrapper = $('<div class="ms-wrapper"><input class="ms-toggle" type="checkbox" id="dropdownopen-' + numMultiselectors + '"><label class="ms-placeholder" for="dropdownopen-' + numMultiselectors + '">Välj kategorier</label></div>');
        var $options = $('<div class="ms-options"></div>');

        $.each(categories, function (index, item) {
            if (current.indexOf(item.name) > -1) {
                $options.append('<label><input type="checkbox" name="' + name + '[]" value="' + item.name + '" checked> ' + item.name + '</label>')
                return;
            }

            $options.append('<label><input type="checkbox" name="' + name + '[]" value="' + item.name + '"> ' + item.name + '</label>');
        }.bind(this));

        $wrapper.append($options);
        return $wrapper[0].outerHTML;
    };

    MapPinCategories.prototype.updateSelectors = function(name, color) {
        $('[data-map-category-selector]').append('<option style="color:' + color + ';" value="' + name + '" data-color="' + color + '">' + name + '</option>');
    };

    MapPinCategories.prototype.getAll = function(keys) {
        if (typeof keys === 'undefined') {
            keys = 'name';
        }

        var categories = [];
        var $items = $('.interactive-map-categories-list li');

        $items.each(function (index, item) {
            var name = $(this).find('[data-map-category]').val();
            var color = $(this).find('[data-map-category-color]').val();

            var category = [];
            category['name'] = name;
            category['color'] = color;

            if (keys === 'numeric') {
                categories.push(category);
            } else {
                categories[name] = category;
            }
        });

        return categories;
    };

    /**
     * Add a category
     * @param {string} name  Name of the category
     * @param {string} color Hexadecimal color code
     */
    MapPinCategories.prototype.addCategory = function(name, color) {
        if (numCategories === 0) {
            numCategories = $('.interactive-map-categories-list li').length;
        }

        numCategories++;

        if (typeof name === 'undefined') {
            name = $('[name="map-category-name"]').val();
            //$('[name="map-category-name"]').val('');
        }

        if (typeof color === 'undefined') {
            color = $('[name="map-category-pin-color"]').val();
            //$('[name="map-category-pin-color"]').val('')
        }

        if (!color) {
            color = '#FF0000';
        }

        var existingCategories = [];
        $('[data-map-category]').each(function () {
            existingCategories.push($(this).val());
        });

        if (existingCategories.indexOf(name) > -1) {
            alert('Category name must be unique');
            return;
        }

        $('.interactive-map-categories-list').append('\
            <li data-category="' + name + '">\
                <span style="color:' + color + ';">' + name + '</span>\
                <button type="button" class="button button-link" data-action="interactive-map-add-remove-category" data-category-name="' + name + '"><i class="fa fa-trash"></i></button>\
                \
                <input type="hidden" name="interactive-map-categories[' + numCategories + '][name]" value="' + name + '" data-map-category>\
                <input type="hidden" name="interactive-map-categories[' + numCategories + '][color]" value="' + color + '" data-map-category-color>\
            </li>\
        ');

        this.updateSelectors(name, color);
    };

    MapPinCategories.prototype.removeCategory = function(name) {
        $('.interactive-map-categories-list li[data-category="' + name + '"]').remove();
        $('[data-map-category-selector] option[value="' + name + '"]').remove();
    };

    return new MapPinCategories();

})(jQuery);


var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.MapPins = (function ($) {

    var pinNumber = 0;
    var _categories;

    function MapPins() {
        $('[data-action="interactive-map-add-pin"]').on('click', function (e) {
            e.preventDefault();
            this.addPin();
        }.bind(this));

        $(document).on('click', '.map-pin', function (e) {
            e.preventDefault();

            if ($(e.target).closest('[data-action="interactive-map-pin-close"]').length) {
                return;
            }

            this.showPin(e.target);
        }.bind(this));

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.map-pin').length) {
                this.hidePins();
            }
        }.bind(this));

        $(document).on('click', '[data-action="interactive-map-pin-close"]', function (e) {
            e.preventDefault();
            this.hidePins();
        }.bind(this));

        $(document).on('click', '[data-action="interactive-map-pin-remove"]', function (e) {
            this.removePin(e.target);
        }.bind(this))
    }

    MapPins.prototype.addPin = function(posTop, posLeft, title, link, text, category) {
        if (!_categories) {
            _categories = ModularityInteractiveMap.MapPinCategories.getAll();
        }

        if (typeof category === 'undefined') {
            category = '';
        }

        if (pinNumber === 0) {
             pinNumber = $('#map-image .map-container .map-pin').length;
        }

        pinNumber++;

        if (typeof posTop === 'undefined') {
            posTop = 0;
        }

        if (typeof posLeft === 'undefined') {
            posLeft = 0;
        }

        if (typeof title === 'undefined') {
            title = '';
        }

        if (typeof link === 'undefined') {
            link = '';
        }

        if (typeof text === 'undefined') {
            text = '';
        }

         var categoryColor = '';
        if (category) {
            categoryColor = 'background-color:' + _categories[category].color + ';';
        }

        // Pin template and for fields
        var $pin = $('\
            <div class="map-pin" data-pin-id="' + pinNumber + '" style="position: absolute;top: ' + posTop + ';left: ' + posLeft + ';' + categoryColor + '">\
                <div class="map-pin-popup">\
                    <input type="text" name="interactive-map-pin[' + pinNumber + '][title]" class="widefat" placeholder="' + ModInteractiveMapLang.title + '…" value="' + title +  '">\
                    <input type="text" name="interactive-map-pin[' + pinNumber + '][link]" class="widefat" placeholder="' + ModInteractiveMapLang.link + '…" value="' + link +  '">\
                    <textarea name="interactive-map-pin[' + pinNumber + '][text]" class="widefat" placeholder="' + ModInteractiveMapLang.description + '…">' + text + '</textarea>\
                    ' + ModularityInteractiveMap.MapPinCategories.getSelector('interactive-map-pin[' + pinNumber + '][category]', category) + '\
                    <div class="pin-actions">\
                        <button class="button button-link" type="button" data-action="interactive-map-pin-remove">' + ModInteractiveMapLang.remove + '</button>\
                        <button class="button" type="button" data-action="interactive-map-pin-close">' + ModInteractiveMapLang.close + '</button>\
                    </div>\
                </div>\
                \
                <input type="hidden" name="interactive-map-pin[' + pinNumber + '][top]" value="' + posTop + '" data-map-pin-top>\
                <input type="hidden" name="interactive-map-pin[' + pinNumber + '][left]" value="' + posLeft + '" data-map-pin-left>\
            </div>\
        ');

        // Pin draggable
        $pin.draggable({
            containment: 'parent',
            start: function () {
                ModularityInteractiveMap.MapPins.hidePins();
            },
            stop: function( event, ui ) {
                $(this).find('[data-map-pin-top]').val(parseInt($(this).css('top')) / ($('#map-image .map-container').height() / 100) + '%')
                $(this).find('[data-map-pin-left]').val(parseInt($(this).css('left')) / ($('#map-image .map-container').width() / 100) + '%')
            }
        });

        // Append pin
        $pin.appendTo('#map-image .map-container');
    };

    MapPins.prototype.showPin = function(target) {
        this.hidePins();
        var $pin = $(target).closest('.map-pin');
        $pin.find('.map-pin-popup').show();
    };

    MapPins.prototype.hidePin = function(target) {
        var $pin = $(target).closest('.map-pin');
        $pin.find('.map-pin-popup').hide();
    };

    MapPins.prototype.hidePins = function() {
        $('.map-pin-popup').hide();
    };

    MapPins.prototype.removePin = function(target) {
        $(target).closest('[data-action="interactive-map-pin-remove"]').parents('.map-pin').remove();
    };

    return new MapPins();

})(jQuery);

