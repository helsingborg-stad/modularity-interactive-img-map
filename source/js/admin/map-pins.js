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

        var $svg = $('<div><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="100"/></svg></div>');

        if (category) {
            if (_categories[category].svg) {
                $svg = $('<div>' + _categories[category].svg + '</div>');
            }

            $('svg', $svg).css({ fill: _categories[category].color  });
        }

        //console.log($svg.html());

        // Pin template and for fields
        var $pin = $('\
            <div class="map-pin" data-pin-id="' + pinNumber + '" style="position: absolute;top: ' + posTop + ';left: ' + posLeft + ';">\
            ' + $svg.html() + '\
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

    MapPins.prototype.categoryPinIcon = function(pinId, iconUrl, color) {
        console.log('pinId');
        $('[data-pin-id="' + pinId + '"]').append('<div>Kalle</div>');
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

