"use strict";

var pars = $('p');
var clickIcons = $('li');
var icons = $('i');

var count=0;

var other=0;

const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
function anime (el,animation) {
	el.toggleClass('animated ' + animation);
};
function toggle() {
		pars.eq(count).toggleClass('hidde');
		icons.eq(count).toggleClass('visibility');
}
function changeState (newIndex) {

	var elem = pars.eq(count);

	elem.one(animationEnd, function() {
		toggle();
		pars.eq(count).toggleClass('animated fadeIn fadeOut');
		if(newIndex != undefined ){count=newIndex}else{count++};
		toggle();
		anime(pars.eq(count), 'fadeIn');
	});
	anime(elem,'fadeOut');
}


pars.toggleClass('hidde');
pars.eq(0).toggleClass('hidde fadeIn');
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