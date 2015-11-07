// Myers-Briggs personality type quiz in HTML5

// Setup, dirty style!
var mb = {};
mb.moving = false;

// DOM cache
mb.$page = document.getElementById('js-page');
mb.$cells = document.getElementsByTagName('td');
mb.$hi = document.getElementsByClassName('highlight');
mb.$ei = document.getElementById('js-ei');
mb.$sn = document.getElementById('js-sn');
mb.$tf = document.getElementById('js-tf');
mb.$jp = document.getElementById('js-jp');

// Shhh... listen... ers
// using start/move/end to allow scrolling, prob could have used form elements without this
mb.$page.addEventListener('touchstart', cell, false);
mb.$page.addEventListener('touchmove', moving, false);
//mb.$page.addEventListener('touchend', cellclick, false);
detectEventClickOrTouch(mb.$page, cellclick);
function cell(e) {
	mb.moving = false;
}
function moving() {
	mb.moving = true;
}
function cellclick(e) {
	if (!mb.moving && ( e.target.cellIndex === 0 || e.target.cellIndex === 1 ) ) {
		e.target.parentNode.children[0].classList.remove('highlight');
		e.target.parentNode.children[1].classList.remove('highlight');
		e.target.classList.add('highlight');
		calc();
	}
}

// Run on both desktop and touch
function detectEventClickOrTouch(element, functionToCall){
  if(isTouchDevice()){
    element.addEventListener("touchend", functionToCall, false);
  } else{
    element.addEventListener("click", functionToCall, false);
  }
}
function isTouchDevice() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }  
}

// Do the work
function calc() {
	// reset counter
	mb.e = 0;
	mb.i = 0;
	mb.s = 0;
	mb.n = 0;
	mb.t = 0;
	mb.f = 0;
	mb.j = 0;
	mb.p = 0;

	// loop over table cells
	for (var i = 0, max = mb.$cells.length; i < max; i++) {
		if ( mb.$cells[i].classList.contains('highlight') ) {
			// true, add to the counter
			mb[mb.$cells[i].dataset.mb]++;
		}
	}

	// check counters for values and display type based on which has more
	if (mb.e > 0 || mb.i > 0) {
		mb.$ei.innerHTML = (mb.e > mb.i ? "e" : "i");
		mb.$ei.classList.add('full');
	}
	if (mb.s > 0 || mb.n > 0) {
		mb.$sn.innerHTML = (mb.s > mb.n ? "s" : "n");
		mb.$sn.classList.add('full');
	}
	if (mb.t > 0 || mb.f > 0) {
		mb.$tf.innerHTML = (mb.t > mb.f ? "t" : "f");
		mb.$tf.classList.add('full');
	}
	if (mb.j > 0 || mb.p > 0) {
		mb.$jp.innerHTML = (mb.j > mb.p ? "j" : "p");
		mb.$jp.classList.add('full');
	}
}