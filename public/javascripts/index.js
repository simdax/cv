"use strict";

var pars = $('p');
var clickIcons = $('li');
var icons = $('i');

var count=0;

const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
function anime (el,animation) {
	el.addClass('animated ' + animation);
};
function toggle() {
		pars.eq(count).toggleClass('display');
		icons.eq(count).toggleClass('visibility');
}
function changeState (newIndex) {

	// chaining
	pars.eq(count).one(animationEnd, function() {
		toggle();
		if(newIndex){count=newIndex}else{count++};
		toggle();
		anime(pars.eq(count), 'fadeIn');
	});
	anime(pars.eq(count),'fadeOut');
}


pars.toggleClass('display');
pars.eq(0).toggleClass('display');
icons.eq(0).toggleClass('visibility');

pars.on('click', function() {
	changeState();
});
clickIcons.on('click', function() {
	changeState(clickIcons.get().indexOf(this));
});

var isIn=true;
var home = $('i.fa-home');
home.on('click',function() {
	if (! isIn) {
		$('nav').toggleClass('bounceInLeft');
		$('nav').toggleClass('bounceOutLeft');
		isIn=true;
	}else{
		$('nav').toggleClass('bounceOutLeft');
		$('nav').toggleClass('bounceInLeft');
		isIn = false;
	}
})