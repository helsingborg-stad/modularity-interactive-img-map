
var $ = (jQuery);

$(document).ready(function() {
    pinTooltip();
});


function pinTooltip() {

    //Show panel
    $('.mod-interactive-map-pin').on('click touchstart', function (e) {
        e.preventDefault();

        var timeout = 0;
        if (!$('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent()).hasClass("mod-interactive-map-pin-info-hidden")) {
            hideTooltip(e);
            timeout = 301;
        }

        setTimeout(function () {
            populateTooltip(e);
            placeTooltip(e);
            showTooltip(e);
        }.bind(this), timeout);
    }.bind(this));

    //Hide panel
    $('[data-interactive-map-close-tooltip]').on('click touchstart', function (e) {
        e.preventDefault();
        hideTooltip(e);
    }.bind(this));

    $(window).resize(function() {
        $('.mod-interactive-map-pin-info').addClass("mod-interactive-map-pin-info-hidden");
    });

    $(window).on("orientationchange", function( event ) {
        $('.mod-interactive-map-pin-info').addClass("mod-interactive-map-pin-info-hidden");
    });
}



function populateTooltip(e) {

    //Tooltip element
    toolTip = $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent());

    //Title
    $("h3", toolTip).html($(e.target).attr('data-title'));

    //Content
    $(".description", toolTip).html($(e.target).attr('data-description'));

    //Link
    if($(e.target).attr('data-link')) {
        $(".link", toolTip).attr('href',$(e.target).attr('data-link')).show(0);
    } else {
        $(".link", toolTip).attr('href',$(e.target).attr('data-link')).hide(0);
    }

}

function showTooltip(e) {
    $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent()).removeClass("mod-interactive-map-pin-info-hidden");
}

function hideTooltip(e) {
    $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent()).addClass("mod-interactive-map-pin-info-hidden");
}

function placeTooltip(e) {
    toolTip = $('.mod-interactive-map-pin-info', $(e.target).parent().parent().parent());
    $(toolTip).offset($(e.target).offset());
}
