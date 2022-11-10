
document.addEventListener('DOMContentLoaded', function() {
    pinTooltip();
});

function pinTooltip() {

    // Show panel
    var pins = document.querySelectorAll('.mod-interactive-map-pin');
    pins.forEach(function(pin) {
        //['click', 'touchstart'].forEach(function(event) {
        ['click'].forEach(function(event) {
            pin.addEventListener(event, function(e) {
                e.preventDefault();
                var timeout = 0;
                if (!(e.target.parentElement.parentElement.parentElement.querySelector('.mod-interactive-map-pin-info').classList.contains('mod-interactive-map-pin-info-hidden'))) {
                    hideTooltip(e);
                    timeout = 301;
                }    
                setTimeout(function () {
                    populateTooltip(e);
                    placeTooltip(e);
                    showTooltip(e);
                }, timeout);
            });                 
        });
    });

    // Hide panel
    var closeTooltips = document.querySelectorAll('[data-interactive-map-close-tooltip]');
    closeTooltips.forEach(function(closeTooltip) {    
        //['click', 'touchstart'].forEach(function(event) {
        ['click'].forEach(function(event) {   
            closeTooltip.addEventListener(event, function(e) {
                e.preventDefault();
                hideTooltip(e);                
            }); 
        });        
    });  

    window.addEventListener('resize', function() {
        document.querySelectorAll('.mod-interactive-map-pin-info').forEach(function(obj, key) {  
            obj.classList.add('mod-interactive-map-pin-info-hidden');
        });    
    });

    window.addEventListener('orientationchange', function() {
        document.querySelectorAll('.mod-interactive-map-pin-info').forEach(function(obj, key) {  
            obj.classList.add('mod-interactive-map-pin-info-hidden');
        });    
    });


}

function populateTooltip(e) {

    //Tooltip element
    toolTip = e.target.parentElement.parentElement.parentElement.querySelector('.mod-interactive-map-pin-info');

    //Title
    toolTip.querySelector('h3').textContent = e.target.getAttribute('data-title');    

    //Content
    toolTip.querySelector('.description').textContent = e.target.getAttribute('data-description'); 

    //Link
    toolTip.querySelector('.link').href = e.target.getAttribute('data-link'); 
    if (!e.target.getAttribute('data-link')) {
        toolTip.querySelector('.link').style.display = 'none';
    }
}

function showTooltip(e) {
    e.target.parentElement.parentElement.parentElement.querySelector('.mod-interactive-map-pin-info').classList.remove('mod-interactive-map-pin-info-hidden');
}

function hideTooltip(e) {
    e.target.parentElement.parentElement.parentElement.querySelector('.mod-interactive-map-pin-info').classList.add('mod-interactive-map-pin-info-hidden');
}

function placeTooltip(e) {
    toolTip = e.target.parentElement.parentElement.parentElement.querySelector('.mod-interactive-map-pin-info');
    var topOffset = e.target.offsetHeight;
    var leftOffset = e.target.offsetWidth/2;   
    toolTip.style.top = 'calc('+e.target.style.top+' - '+topOffset+'px)';
    toolTip.style.left = 'calc('+e.target.style.left+' - '+leftOffset+'px)';
}