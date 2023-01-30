
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

/**
 * Resolves promise when all child images of provided parent Element have been loaded.
 * 
 * @param {Element} parent 
 * @returns {Promise<void>} when all found child images are loaded.
 * @throws {Error} if no images are found as children.
 */
function onImageChildrenLoaded(parent) {
    return new Promise(async (resolve) => {

        const imageNodes = parent.querySelectorAll('img')
        if (imageNodes.length === 0) throw new Error('No child image elements found.')
        const notLoadedYet = Array.from(imageNodes).filter(img => !img.complete)

        const loadedPromises = notLoadedYet.map(img => {
            return new Promise((imageLoaded) => {
                img.addEventListener('load', () => { imageLoaded() })
            })
        })

        await Promise.all(loadedPromises)
        resolve();

    });
}

const handleClick = (scale, resetButton, overflowContainer) => {
    if(scale) {
        resetButton.classList.remove('u-display--none');
        overflowContainer.style.pointerEvents = 'all';
    } else {
        resetButton.classList.add('u-display--none');
        overflowContainer.style.pointerEvents = 'none';
    }
}

function init() {
    document.querySelectorAll('.mod-interactive-map-container').forEach(function(obj, key) {
        let zoomObj = obj.querySelector('.mod-interactive-map-zoomable');
        const overflowContainer = obj.querySelector('.mod-interactive-map-overflower');
        const resetButton = obj.querySelector('.mod-interactive-map-reset-button');

        onImageChildrenLoaded(obj)
            .then(() => {
                const panzoom = Panzoom(zoomObj, {
                    duration: 150,
                    panOnlyWhenZoomed: true,
                    minScale: 1,
                    maxScale: (obj.querySelector('img').naturalWidth / obj.querySelector('img').clientWidth),
                    increment: 0.1,
                    contain: 'outside',
                });

                obj.querySelector('.mod-interactive-map-reset-button').addEventListener('click', function (event) {
                    panzoom.reset(true);
                    handleClick(false, resetButton, overflowContainer);
                });

                obj.querySelector('.zoom-in').addEventListener('click', function (event) {
                    panzoom.zoomIn();
                    handleClick(true, resetButton, overflowContainer);
                });

                obj.querySelector('.zoom-out').addEventListener('click', function (event) {
                    panzoom.zoomOut();
                    const zoomStatus = panzoom.getScale() < 1.1 ? false : true;
                    handleClick(zoomStatus, resetButton, overflowContainer);
                });
            }).catch((error) => { console.error(error.message) });
        
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