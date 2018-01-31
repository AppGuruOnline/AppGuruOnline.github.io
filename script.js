window.onscroll = scroll;
window.onresize = scroll;
window.onload = load;

function load() {
    scroll();
}

function scroll(){
    updateHeaderColor();
    scrollSectionBackground();
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
    for(var i = 0; i < sections.length; i++) {
        if(isOverlapping(header,sections[i])) {
            if(sections[i].hasAttribute('dark')) {
                header.style.color = 'white';
            } else {
                header.style.color = 'black';
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