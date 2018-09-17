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

    var pos1 = new qq.maps.LatLng(30.525992, 114.360051);
    var marker1 = new qq.maps.Marker({ position: pos1, map: map });
    var info1 = new qq.maps.InfoWindow({
        map: map
    });
    qq.maps.event.addListener(marker1, 'click', function() {
        info1.open(); 
        info1.setContent('<div style="text-align:center;white-space:wrap;'+
        'margin-bottom:0px;">武汉大学遥感信息工程学院5号楼220机房</div>');
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