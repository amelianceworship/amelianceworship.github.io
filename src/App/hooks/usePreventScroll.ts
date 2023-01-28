// DESKTOP

// TRIGGER
function switchScroll() {
	if (document.getElementById('scroll').checked == true) {
		enable_scroll();
	} else {
		disable_scroll();
	}
}

// PREVENT DEFAULT HANDLER
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.returnValue = false;
}
// PREVENT SCROLL KEYS
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
// (Source: http://stackoverflow.com/a/4770179)
function keydown(e) {
	const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
	for (let i = keys.length; i--;) {
		if (e.keyCode === keys[i]) {
			preventDefault(e);
			return;
		}
	}
}
// PREVENT MOUSE WHEEL
function wheel(event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
}
// DISABLE SCROLL
function disable_scroll() {
	if (document.addEventListener) {
		document.addEventListener('wheel', wheel, false);
		document.addEventListener('mousewheel', wheel, false);
		document.addEventListener('DOMMouseScroll', wheel, false);
	} else {
		document.attachEvent('onmousewheel', wheel);
	}
	document.onmousewheel = document.onmousewheel = wheel;
	document.onkeydown = keydown;

	x = window.pageXOffset || document.documentElement.scrollLeft,
	y = window.pageYOffset || document.documentElement.scrollTop,
	window.onscroll = function () {
		window.scrollTo(x, y);
	};
	// document.body.style.overflow = 'hidden'; // CSS
	disable_scroll_mobile();
}
// ENABLE SCROLL
function enable_scroll() {
	if (document.removeEventListener) {
		document.removeEventListener('wheel', wheel, false);
		document.removeEventListener('mousewheel', wheel, false);
		document.removeEventListener('DOMMouseScroll', wheel, false);
	}
	document.onmousewheel = document.onmousewheel = document.onkeydown = null;
	window.onscroll = function () {};
	// document.body.style.overflow = 'auto'; // CSS
	enable_scroll_mobile();
}

// MOBILE
function disable_scroll_mobile() {
	document.addEventListener('touchmove', preventDefault, false);
}
function enable_scroll_mobile() {
	document.removeEventListener('touchmove', preventDefault, false);
}

// https://codepen.io/wesleypimentel/pen/KpgXJW
