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

    MapPinCategories.prototype.editCategory = function(categoryName) {
        var $createForm = $('.interactive-map-categories-form');
        var $editForm = $('.interactive-map-categories-form-edit');
        var $category = $('.interactive-map-categories-list li[data-category="' + categoryName + '"]');

        $editForm.find('[name="map-category-name-before"]').val(categoryName);
        $editForm.find('[name="map-category-name"]').val($category.find('input[name*="name"]').val());
        $editForm.find('[name="map-category-pin-color"]').val($category.find('input[name*="color"]').val());

        $createForm.hide();
        $editForm.show();
    };

    MapPinCategories.prototype.savePinEdit = function(e) {
        var $createForm = $('.interactive-map-categories-form');
        var $editForm = $('.interactive-map-categories-form-edit');

        var nameBefore = $editForm.find('[name="map-category-name-before"]').val();
        var name = $editForm.find('[name="map-category-name"]').val();
        var color = $editForm.find('[name="map-category-pin-color"]').val();

        var $categoryRow = $('.interactive-map-categories-list li[data-category="' + nameBefore + '"]');

        // Change category details
        $categoryRow.attr('data-category', name);
        $categoryRow.find('[data-category-name]').attr('data-category-name', name);
        $categoryRow.find('span').text(name);
        $categoryRow.find('input[name*="name"]').val(name).attr('data-map-category', name);
        $categoryRow.find('input[name*="color"]').val(color).attr('data-map-category-color', color);

        // Chage category dropdowns and pin
        $('[data-map-category-selector]').each(function (index, element) {
            var $this = $(element);
            $this.find('option[value="' + nameBefore + '"]').val(name).text(name).css('color', color);

            if ($this.val() == nameBefore) {
                var $pin = $this.parents('.map-pin');
                $pin.css('background-color', color);
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
                <button type="button" class="button button-link" data-action="interactive-map-add-edit-category" data-category-name="' + name + '"><i class="fa fa-edit"></i></button>\
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

