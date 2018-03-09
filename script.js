window.onscroll = scroll;
window.onresize = scroll;
window.onload = load;
//calc((73vw + 2rem) * 1)
var slideshowNum = 0;
var slideshowInterval;
function load() {
    scroll();
    initSlideShow();
}

function scroll(){
    updateHeaderColor();
    scrollSectionBackground();
}

function initSlideShow() {
    for(var i = 0; i < document.querySelector('.slideshow').childElementCount; i++) {
        document.querySelector('.slideshow-bubbles').innerHTML += '<div class="slide-bubble-' + i + '" onclick="clearInterval(slideshowInterval);slideshowInterval = setInterval(function(){moveSlideShow(1)},5000);goToSlideshowSlide(' + i + ')"></div>';
    }
    moveSlideShow(0);
}

function moveSlideShow(dir) {
    slideshowNum = slideshowNum + dir;
    if(slideshowNum >= document.querySelector('.slideshow').childElementCount) {
        slideshowNum = 0;
    } else if(slideshowNum < 0) {
        slideshowNum = document.querySelector('.slideshow').childElementCount - 1;
    }
    goToSlideshowSlide(slideshowNum);
}

function goToSlideshowSlide(slide) {
    slideshowNum = slide;
    var bubbles = document.querySelectorAll('.slideshow-bubbles > *');
    for(var i = 0; i < bubbles.length; i++) {
        bubbles[i].style.background = 'white';
    }
    document.querySelector('.slide-bubble-' + slideshowNum).style.background = 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)';
    document.querySelector('.slideshow').style.left = 'calc((73vw + 2rem) * ' + (0 - slide) + ')';
}

function scrollSectionBackground() {
    var sections = document.getElementsByTagName('section');
    for(var i = 0; i < sections.length; i++) {
        var section = sections[i];
        var dir = i % 2 === 0 ? -1 : 1;
        if(!section.hasAttribute('noscroll')) {
            if(section.getBoundingClientRect().top < 0) {
                section.style.backgroundPositionX = (0 +/*<- change to - if want to reverse after peak */ dir*section.getBoundingClientRect().top - window.innerHeight) + 'px';
            } else {
                section.style.backgroundPositionX = (dir*section.getBoundingClientRect().top - window.innerHeight) + 'px';
            }
        }
    }
    
}

function updateHeaderColor(){
    var sections = document.getElementsByTagName('section');
    var header = document.querySelector('header');
    var logo = document.querySelector('header h1 img');
    for(var i = 0; i < sections.length; i++) {
        if(isOverlapping(header,sections[i])) {
            if(sections[i].hasAttribute('dark')) {
                header.style.color = 'white';
                logo.setAttribute('src','img/logo_clipped_white.svg');
            } else {
                header.style.color = 'black';
                logo.setAttribute('src','img/logo_clipped_black.svg');
            }
        }
    }
}

function isOverlapping(elem1, elem2) {
    rect1 = elem1.getBoundingClientRect();
    rect2 = elem2.getBoundingClientRect();
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

function showVideo() {
    var title = document.querySelector('#hero h1');
    title.style.marginTop = 'calc(-8rem - 0.5em)';
    title.style.opacity = 0;
    
    var videoElem = document.querySelector('#hero iframe.yt');
    videoElem.style.height = 315;
    videoElem.style.width = 560;
    
    var videoBtn = document.querySelector('#hero .video-btn');
    videoBtn.innerHTML = '<span class="icon-back-circle"></span> Go back';
    videoBtn.setAttribute('href','javascript:hideVideo()');
}

function hideVideo() {
    var title = document.querySelector('#hero h1');
    title.style.marginTop = 0;
    title.style.opacity = 1;
    
    var videoElem = document.querySelector('#hero iframe.yt');
    videoElem.style.height = 0;
    videoElem.style.width = 0;
    
    var videoBtn = document.querySelector('#hero .video-btn');
    videoBtn.innerHTML = '<span class="icon-play-circle"></span> Watch the video';
    videoBtn.setAttribute('href','javascript:showVideo()');
}