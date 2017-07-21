var ModularityInteractiveMap = ModularityInteractiveMap || {};
ModularityInteractiveMap.MapPinCategories = (function ($) {
    var _mediaModal;
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
            var selected = $('option:selected', this).text();
            var categories = MapPinCategories.prototype.getAll();
            var $pin = $(this).parents('.map-pin');
            var color = $(this).find('option:selected').attr('data-color');

            $('svg', $pin).replaceWith(categories[selected].svg);
            $('svg', $pin).css('fill', color);
        });

        $(document).on('click', '[data-action="interactive-map-add-edit-category"]', function (e) {
            e.preventDefault();
            var $btn = $(e.target).closest('[data-action="interactive-map-add-edit-category"]');
            this.editCategory($btn.attr('data-category-name'));
        }.bind(this));

        $('[data-action="interactive-map-stop-edit-pin-category"]').on('click', function (e) {
            e.preventDefault();
            $('.interactive-map-categories-form').show();
            $('.interactive-map-categories-form-edit').hide();
        });

        $('[data-action="interactive-map-edit-pin-category"]').on('click', function (e) {
            e.preventDefault();
            this.savePinEdit(e);
        }.bind(this));

        $('[data-action="interactive-map-add-icon"]').on('click', function (e) {
            e.preventDefault();
            this.openMediaModal();
        }.bind(this));

        $('[data-action="interactive-map-remove-icon"]').on('click', function (e) {
            e.preventDefault();
            $(e.target).hide();
            $('#map-category-pin-icon > svg', '').show();
            $('[name="map-category-pin-icon"]').attr('src', '');
        }.bind(this));
    };

    MapPinCategories.prototype.openMediaModal = function(btn) {
        if (_mediaModal) {
            // Open the modal
            _mediaModal.open();

            // Default to upload file tab
            $('.media-router a:first-of-type').trigger('click');

            return;
        }

        this.setupMediaModal();
    };

    MapPinCategories.prototype.setupMediaModal = function() {
        _mediaModal = wp.media({
            title: 'Pin icon',
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

            if (selected.mime !== 'image/svg+xml') {
                alert('Only icons of file type SVG are allowed');
                return;
            }

            $('#map-category-pin-icon > svg').hide();
            $('[name="map-category-pin-icon"]').attr('src', selected.url).attr('data-layer-id', selected.id);

        }.bind(this));

        this.openMediaModal();
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

        if (typeof current === 'undefined') {
            current = null;
        }

        if (current) {
            current = current.split('|');
        }

        var categories = this.getAll('numeric');

        var $wrapper = $('<div class="ms-wrapper"><input class="ms-toggle" type="checkbox" id="dropdownopen-' + numMultiselectors + '"><label class="ms-placeholder" for="dropdownopen-' + numMultiselectors + '">Välj kategorier</label></div>');
        var $options = $('<div class="ms-options"></div>');

        $.each(categories, function (index, item) {
            if (current && current.indexOf(item.name) > -1) {
                $options.append('<label data-category="' + item.name + '"><input type="checkbox" name="' + name + '[]" value="' + item.name + '" checked> <span>' + item.name + '</span></label>')
                return;
            }

            $options.append('<label data-category="' + item.name + '"><input type="checkbox" name="' + name + '[]" value="' + item.name + '"> <span>' + item.name + '</span></label>');
        }.bind(this));

        $wrapper.append($options);
        return $wrapper[0].outerHTML;
    };

    MapPinCategories.prototype.updateSelectors = function(name, color) {
        // Default select
        $('[data-map-category-selector]').append('<option style="color:' + color + ';" value="' + name + '" data-color="' + color + '">' + name + '</option>');

        // Multiselect
        var $row = $('.ms-wrapper .ms-options label:first').clone();
        $row.attr('data-category', name);
        $row.find('input[type="checkbox"]').val(name);
        $row.find('span').text(name);
        $row.appendTo('.ms-wrapper .ms-options');
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
            var icon = $(this).find('[data-map-category-pin-icon]').val();
            var svg = $(this).find('[data-map-category-svg]').val();

            var category = [];
            category['name'] = name;
            category['color'] = color;
            category['icon'] = icon;
            category['svg'] = svg;

            if (keys === 'numeric') {
                categories.push(category);
            } else {
                categories[name] = category;
            }
        });

        return categories;
    };

    MapPinCategories.prototype.editCategory = function(categoryName) {
        var $createForm = $('.interactive-map-categories-form');
        var $editForm = $('.interactive-map-categories-form-edit');
        var $category = $('.interactive-map-categories-list li[data-category="' + categoryName + '"]');

        $editForm.find('[name="map-category-name-before"]').val(categoryName);
        $editForm.find('[name="map-category-name"]').val($category.find('input[name*="name"]').val());
        $editForm.find('[name="map-category-pin-color"]').val($category.find('input[name*="color"]').val());
        $editForm.find('[name="map-category-pin-icon"]').attr('src', $category.find('input[name*="icon"]').val());
        if ($category.find('input[name*="icon"]').val()) {
            $('svg', $editForm).hide();
            $('[data-action="interactive-map-remove-icon"]').show();
        } else {
            $('svg', $editForm).show();
            $('[data-action="interactive-map-remove-icon"]').hide();
        }

        $createForm.hide();
        $editForm.show();
    };

    MapPinCategories.prototype.savePinEdit = function(e) {
        var $createForm = $('.interactive-map-categories-form');
        var $editForm = $('.interactive-map-categories-form-edit');

        var nameBefore = $editForm.find('[name="map-category-name-before"]').val();
        var name = $editForm.find('[name="map-category-name"]').val();
        var color = $editForm.find('[name="map-category-pin-color"]').val();
        var icon = $editForm.find('[name="map-category-pin-icon"]').attr('src');

        var $categoryRow = $('.interactive-map-categories-list li[data-category="' + nameBefore + '"]');

        if (!color) {
            color = '#FF0000';
        }

        if (!name) {
            alert('You need to give your category a unique name');
            return;
        }

        var existingCategories = [];
        $('[data-map-category]').each(function () {
            existingCategories.push($(this).val());
        });

        if (existingCategories.indexOf(name) > -1 && name !== nameBefore) {
            alert('Category name must be unique');
            return;
        }

        // Change category details
        $categoryRow.attr('data-category', name);
        $categoryRow.find('[data-category-name]').attr('data-category-name', name);
        $categoryRow.find('span').text(name);
        $categoryRow.find('input[name*="name"]').val(name).attr('data-map-category', name);
        $categoryRow.find('input[name*="color"]').val(color).attr('data-map-category-color', color);
        $categoryRow.find('input[name*="icon"]').val(icon).attr('data-map-category-color', color);

        // Chage category dropdowns and pin
        $('[data-map-category-selector]').each(function (index, element) {
            var $this = $(element);
            $this.find('option[value="' + nameBefore + '"]').val(name).text(name).css('color', color);

            if ($this.val() == nameBefore) {
                var $pin = $this.parents('.map-pin');
                $pin.css('fill', color);
            }
        });

        // Change multiselects
        $('.ms-wrapper').each(function (index, element) {
            var $this = $(element);
            var $label = $this.find('.ms-options label[data-category="' + nameBefore + '"]');

            $label.attr('data-category', name);
            $label.find('input').val(name);
            $label.find('span').text(name);
        });


        $createForm.show();
        $editForm.hide();
    };

    /**
     * Add a category
     * @param {string} name  Name of the category
     * @param {string} color Hexadecimal color code
     * @param {string} icon  Image url
     */
    MapPinCategories.prototype.addCategory = function(name, color, icon, svg) {
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

        if (typeof icon === 'undefined') {
            icon = (typeof $('[name="map-category-pin-icon"]').attr('src') !== 'undefined') ? $('[name="map-category-pin-icon"]').attr('src') : '';
        }

        if (typeof svg === 'undefined') {
            svg = '<img src="' + icon + '">';
        }

        if (!color) {
            color = '#FF0000';
        }

        if (!name) {
            alert('You need to give your category a unique name');
            return;
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
                <button type="button" class="button button-link" data-action="interactive-map-add-edit-category" data-category-name="' + name + '"><i class="fa fa-edit"></i></button>\
                \
                <input type="hidden" name="interactive-map-categories[' + numCategories + '][name]" value="' + name + '" data-map-category>\
                <input type="hidden" name="interactive-map-categories[' + numCategories + '][color]" value="' + color + '" data-map-category-color>\
                <input type="hidden" name="interactive-map-categories[' + numCategories + '][icon]" value="' + icon + '" data-map-category-pin-icon>\
                <input type="hidden" value=\'' + svg + '\' data-map-category-svg>\
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

