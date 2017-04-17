"use strict"

pars = $('p')
clickIcons = $('li')
icons = $('i')
count=0

changeState =  (newIndex) -> 
	pars.eq(count).fadeOut 200, () -> 
		icons.eq(count).toggleClass 'visibility'
		if newIndex != undefined then count = newIndex else count++ 
		icons.eq(count).toggleClass 'visibility'
		pars.eq(count).fadeIn(500)



pars.toggleClass('hide')
pars.eq(0).toggleClass('hide fadeIn')
icons.eq(0).toggleClass('visibility')

pars.on 'click', () -> 
	changeState()

clickIcons.on 'click', () ->
	changeState(clickIcons.get().indexOf(this))


$('i.fa-home').on 'click', () -> 
		$('nav').toggleClass('bounceInLeft bounceOutLeft')
