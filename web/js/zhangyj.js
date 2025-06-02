/*(function($) {

	"use strict";	

  
    $('.navigation').singlePageNav({
        currentClass : 'active'
    });


    $('.toggle-menu').click(function(){
        $('.responsive-menu').stop(true,true).slideToggle();
        return false;
    });

})(jQuery);
*/
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


/**
 * Single Page Nav Plugin
 * Copyright (c) 2013 Chris Wojcik <hello@chriswojcik.net>
 * Dual licensed under MIT and GPL.
 * @author Chris Wojcik
 * @version 1.1.0
 */

// Utility
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document, undefined) {
    "use strict";
    
    var SinglePageNav = {
        
        init: function(options, container) {
            
            this.options = $.extend({}, $.fn.singlePageNav.defaults, options);
            
            this.container = container;            
            this.$container = $(container);
            this.$links = this.$container.find('a');

            if (this.options.filter !== '') {
                this.$links = this.$links.filter(this.options.filter);
            }

            this.$window = $(window);
            this.$htmlbody = $('html, body');
            
            this.$links.on('click.singlePageNav', $.proxy(this.handleClick, this));

            this.didScroll = false;
            this.checkPosition();
            this.setTimer();
        },

        handleClick: function(e) {
            var self  = this,
                link  = e.currentTarget,
                $elem = $(link.hash);  

            e.preventDefault();             

            if ($elem.length) { // Make sure the target elem exists

                
                // Prevent active link from cycling during the scroll
                self.clearTimer();

                // Before scrolling starts
                if (typeof self.options.beforeStart === 'function') {
                    self.options.beforeStart();
                }

                self.setActiveLink(link.hash);
                
                self.scrollTo($elem, function() { 
                 
                    if (self.options.updateHash) {
                        document.location.hash = link.hash;
                    }

                    self.setTimer();

                    // After scrolling ends
                    if (typeof self.options.onComplete === 'function') {
                        self.options.onComplete();
                    }
                });                            
            }     
        },
        
        scrollTo: function($elem, callback) {
            var self = this;
            var target = self.getCoords($elem).top;
            var called = false;

            self.$htmlbody.stop().animate(
                {scrollTop: target}, 
                { 
                    duration: self.options.speed,
                    easing: self.options.easing, 
                    complete: function() {
                        if (typeof callback === 'function' && !called) {
                            callback();
                        }
                        called = true;
                    }
                }
            );
        },
        
        setTimer: function() {
            var self = this;
            
            self.$window.on('scroll.singlePageNav', function() {
                self.didScroll = true;
            });
            
            self.timer = setInterval(function() {
                if (self.didScroll) {
                    self.didScroll = false;
                    self.checkPosition();
                }
            }, 250);
        },        
        
        clearTimer: function() {
            clearInterval(this.timer);
            this.$window.off('scroll.singlePageNav');
            this.didScroll = false;
        },
        
        // Check the scroll position and set the active section
        checkPosition: function() {
            var scrollPos = this.$window.scrollTop();
            var currentSection = this.getCurrentSection(scrollPos);
            this.setActiveLink(currentSection);
        },        
        
        getCoords: function($elem) {
            return {
                top: Math.round($elem.offset().top) - this.options.offset
            };
        },
        
        setActiveLink: function(href) {
            var $activeLink = this.$container.find("a[href='" + href + "']");
                            
            if (!$activeLink.hasClass(this.options.currentClass)) {
                this.$links.removeClass(this.options.currentClass);
                $activeLink.addClass(this.options.currentClass);
            }
        },        
        
        getCurrentSection: function(scrollPos) {
            var i, hash, coords, section;
            
            for (i = 0; i < this.$links.length; i++) {
                hash = this.$links[i].hash;
                
                if ($(hash).length) {
                    coords = this.getCoords($(hash));
                    
                    if (scrollPos >= coords.top - this.options.threshold) {
                        section = hash;
                    }
                }
            }
            
            // The current section or the first link
            return section || this.$links[0].hash;
        }
    };
    
    $.fn.singlePageNav = function(options) {
        return this.each(function() {
            var singlePageNav = Object.create(SinglePageNav);
            singlePageNav.init(options, this);
        });
    };
    
    $.fn.singlePageNav.defaults = {
        offset: 0,
        threshold: 120,
        speed: 400,
        currentClass: 'current',
        easing: 'swing',
        updateHash: false,
        filter: '',
        onComplete: false,
        beforeStart: false
    };
    
})(jQuery, window, document);




function getAbsoluteTop(pElementId) {
    o = document.getElementById(pElementId);
    oTop = o.offsetTop;
    while(o.offsetParent!=null)
    {  
        oParent = o.offsetParent ;
        oTop += oParent.offsetTop ; // 加父层级顶部位置
        o = oParent ;
    }
    return oTop ;
}

function enableScroll(){
	var _ch = getAbsoluteTop("social-icons");
    //$(".sidebar-menu").height();

    var _wh = $(window).height();
    if(_ch > _wh - 30){
        $(".sidebar-menu").css("overflow-y","scroll");
    }
    else{
        $(".sidebar-menu").css("overflow-y","hidden");   
    }
}

/* Accordions */

function enableAccordions(){

	$('.accordions').each(function(){
		
		// Set First Accordion As Active
		$(this).find('.accordion-content').hide();
		if(!$(this).hasClass('toggles')){
			$(this).find('.accordion:first-child').addClass('accordion-active');
			$(this).find('.accordion:first-child .accordion-content').show();
		}
		
		// Set Accordion Events
		$(this).find('.accordion-header').click(function(){
			
			if(!$(this).parent().hasClass('accordion-active')){
				
				// Close other accordions
				if(!$(this).parent().parent().hasClass('toggles')){
					$(this).parent().parent().find('.accordion-active').removeClass('accordion-active').find('.accordion-content').slideUp(300);
				}
				
				// Open Accordion
				$(this).parent().addClass('accordion-active');
				$(this).parent().find('.accordion-content').slideDown(300);
			
			}else{
				
				// Close Accordion
				$(this).parent().removeClass('accordion-active');
				$(this).parent().find('.accordion-content').slideUp(300);
				
			}
			
		});
	
	});	

	$('.accordions-title').each(function(){
        
        // Set First Accordion As Active
        $(this).find('.accordion-title-content').hide();
        if(!$(this).hasClass('toggles')){
            $(this).find('.accordion-title:first-child').addClass('accordion-title-active');
            $(this).find('.accordion-title:first-child .accordion-title-content').show();
        }
        
        // Set Accordion Events
        $(this).find('.accordion-title-header').click(function(){
            
            if(!$(this).parent().hasClass('accordion-title-active')){
                
                // Close other accordions
                if(!$(this).parent().parent().hasClass('toggles')){
                    $(this).parent().parent().find('.accordion-title-active').removeClass('accordion-title-active').find('.accordion-title-content').slideUp(300);
                }
                
                // Open Accordion
                $(this).parent().addClass('accordion-title-active');
                $(this).parent().find('.accordion-title-content').slideDown(300);
            
            }else{
                
                // Close Accordion
                $(this).parent().removeClass('accordion-title-active');
                $(this).parent().find('.accordion-title-content').slideUp(300);
                
            }
            
        });
    
    });
}


function enableOwlCarousel(){
	$(".owl-carousel").owlCarousel({
        items:2,
        center:true,
        URLhashListener:true,
        autoplayHoverPause:true,
        autoHeight: true,
        startPosition: 'URLHash',
        center: false
    });

    $('.owl-goto').each(function(){
        $(this).find('li.box-item').hover(function(){
            location.href = '#'+$(this).attr('name');                        
        });
    });
}


function enableFancyBox(e){	
	// Simple image gallery. Uses default settings	
	if (e == ".fancybox") {
		$(e).fancybox();
	}
}


function enableTencentMap(){
	var center = new qq.maps.LatLng(30.525753,114.361174);
    var map = new qq.maps.Map(document.getElementById("tencentmap"),{
        zoom: 16,
        center: center,
    });

    var pos1 = new qq.maps.LatLng(30.526071, 114.362050);
    var marker1 = new qq.maps.Marker({ position: pos1, map: map });
    var info1 = new qq.maps.InfoWindow({
        map: map
    });
    qq.maps.event.addListener(marker1, 'click', function() {
        info1.open(); 
        info1.setContent('<div style="text-align:center;white-space:wrap;'+
        'margin-bottom:-50px;">武汉大学信息学部教学实验大楼12楼</div>');
        info1.setPosition(pos1); 
    });

    var pos2 = new qq.maps.LatLng(30.525471,114.362049);
    var marker2 = new qq.maps.Marker({ position: pos2, map: map });
    var info2 = new qq.maps.InfoWindow({
        map: map
    });
    qq.maps.event.addListener(marker2, 'click', function() {
        info2.open(); 
        info2.setContent('<div style="text-align:center;white-space:wrap;'+
        'margin-bottom:0px;">武汉大学信息学部教学实验大楼910室</div>');
        info2.setPosition(pos2); 
    });
}

$(document).ready(function(){

    $('.navigation').singlePageNav({
          currentClass : 'active'
      });


    $('.toggle-menu').click(function(){
        $('.responsive-menu').stop(true,true).slideToggle();
    });

    enableScroll();

    // On Resize
    $(window).resize(function(){
        
        enableScroll();
        
    });
});