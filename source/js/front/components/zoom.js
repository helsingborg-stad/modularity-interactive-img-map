
document.addEventListener('DOMContentLoaded', function() {
    zoom();
});

function zoom() {
    init();
    resize();

    window.addEventListener('orientationchange', function() {
        resize();
    });

    window.addEventListener('resize', function() {
        resize();
    });
}

function init() {
    document.querySelectorAll('.mod-interactive-map-container').forEach(function(obj, key) {    
        var zoomObj = obj.querySelector('.mod-interactive-map-zoomable');
        const panzoom = Panzoom(zoomObj, {
            duration: 150,
            panOnlyWhenZoomed: false,
            minScale: 1,
            maxScale: (obj.querySelector('img').naturalWidth / obj.querySelector('img').clientWidth),
            increment: 0.1,
            contain: false
        });

        document.querySelector('.zoom-in').addEventListener('click', function (event) {    
            panzoom.zoomIn();
        });

        document.querySelector('.zoom-out').addEventListener('click', function (event) {  
            panzoom.zoomOut();
        });
    });
}

function resize() {
    document.querySelectorAll('.mod-interactive-map-container').forEach(function(obj, key) {  
        if ((obj.querySelector('img').naturalWidth / obj.querySelector('img').clientWidth) < 1.4) {
            obj.querySelector('.mod-iteractive-map-buttons').classList.add('mod-interactive-map-pin-info-hidden');
        } else {
            obj.querySelector('.mod-iteractive-map-buttons').classList.remove('mod-interactive-map-pin-info-hidden');
        }
    });
}