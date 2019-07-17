(function ($) {
	"user strict";
	
	//meanmenu
	$('.mobile_menu').meanmenu({
		meanScreenWidth: 767
	});
	
	//banner slider
	var BannerSlider = $('.banner_slider');
	BannerSlider.owlCarousel({
		items: 1,
		autoplay:true,
		loop:true,
		smartSpeed: 400,
		animateIn:'fadeIn',
		animateOut:'fadeOut',
		autoplayHoverPause:true
	});
	
	$('.banner_content_cell h2').addClass('fadeInLeft');
	$('.banner_content_cell p').addClass('fadeInRight');
	$('.banner_content_cell a').addClass('fadeInLeft');
	$('.banner_bg').addClass('fadeInRight');
	
	BannerSlider.on('translate.owl.carousel',function(){
		$('.banner_content_cell h2').removeClass('fadeInLeft').addClass('fadeOutLeft');
		$('.banner_content_cell p').removeClass('fadeInRight').addClass('fadeOutRight');
		$('.banner_content_cell a').removeClass('fadeInLeft').addClass('fadeOutLeft');
		$('.banner_bg').removeClass('fadeInRight').addClass('fadeOutRight');
	});
	
	BannerSlider.on('translated.owl.carousel',function(){
		$('.banner_content_cell h2').removeClass('fadeOutLeft').addClass('fadeInLeft');
		$('.banner_content_cell p').removeClass('fadeOutRight').addClass('fadeInRight');
		$('.banner_content_cell a').removeClass('fadeOutLeft').addClass('fadeInLeft');
		$('.banner_bg').removeClass('fadeOutRight').addClass('fadeInRight');
	});
	
	//reciepe slider
	$('.ht_reciepe_slider').owlCarousel({
		items:4,
		loop:true,
		autoplay:true,
		nav:true,
		navText:['<span class="ti-angle-left"></span>','<span class="ti-angle-right"></span>'],
		autoplayTimeout:2500,
		smartSpeed:1500,
		responsive:{
			300:{
				items:1
			},
			480:{
				items:1
			},
			768:{
				items:3
			},
			992:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});
	
	//nutrotionist slider
	$('.nutrotionist_slider').owlCarousel({
		items:1,
		nav:true,
		loop:true,
		autoplay:true,
		nav:true,
		navText:['<span class="ti-arrow-left"></span>','<span class="ti-arrow-right"></span>'],
		autoplayTimeout:3500,
		smartSpeed:2500,
		animateIn:'fadeInUp',
		animateOut:'fadeOutDown',
		autoplayHoverPause:true
	});
	
	//tesm slider
	$('.tesm_slider').owlCarousel({
		items:3,
		loop:true,
		autoplay:true,
		smartSpeed: 300,
		autoplayTimeout:2500,
		smartSpeed:1500,
		responsive:{
			300:{
				items:1
			},
			480:{
				items:1
			},
			768:{
				items:3
			},
			992:{
				items:3
			}
		}
	});
	


	//google map
	var googleMapSelector = $('#contactgoogleMap'),
		myCenter = new google.maps.LatLng(40.7179835,-74.1373195);

	function initialize() {
		var mapProp = {
			center: myCenter,
			zoom: 12,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles:
			[{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [{
					"saturation": "-100"
				}]
			}, {
				"featureType": "administrative.province",
				"elementType": "all",
				"stylers": [{
					"visibility": "off"
				}]
			}, {
				"featureType": "landscape", 
				"elementType": "all",
				"stylers": [{
					"saturation": -100
				}, {
					"lightness": 65
				}, {
					"visibility": "on"
				}]
			}, {
				"featureType": "poi",
				"elementType": "all",
				"stylers": [{
					"saturation": -100
				}, {
					"lightness": "50"
				}, {
					"visibility": "simplified"
				}]
			}, {
				"featureType": "road",
				"elementType": "all",
				"stylers": [{
					"saturation": "-100"
				}]
			}, {
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [{
					"visibility": "simplified"
				}]
			}, {
				"featureType": "road.arterial",
				"elementType": "all",
				"stylers": [{
					"lightness": "30"
				}]
			}, {
				"featureType": "road.local",
				"elementType": "all",
				"stylers": [{
					"lightness": "40"
				}]
			}, {
				"featureType": "transit",
				"elementType": "all",
				"stylers": [{
					"saturation": -100
				}, {
					"visibility": "simplified"
				}]
			}, {
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [{
					"visibility": "on"
				},

				{
					"color": "#88c057"
				}]
			}, {
				"featureType": "water",
				"elementType": "labels",
				"stylers": [{
					"lightness": -25
				}, {
					"saturation": -100
				}]
			}]
			
		};
		var map = new google.maps.Map(document.getElementById("contactgoogleMap"), mapProp);
		var marker = new google.maps.Marker({
			position: myCenter,
			animation: google.maps.Animation,
			icon: 'assets/images/map-marker.png'
		});
		marker.setMap(map);
	}
	if (googleMapSelector.length) {
		google.maps.event.addDomListener(window, 'load', initialize);
	}
	
	//BMI Calculation
	var bmiCal = $('.bmical');
	bmiCal.on('submit', function(e){
		e.preventDefault();
		var $this = $(this),
			$result = $this.find('.bmi_result'),
			bmiFeet = parseInt($this.find('input.feet').val(), 10),
			bmiWeightInPound = parseInt($this.find('.weight').val(), 10),
			BMI = (bmiWeightInPound / bmiFeet / bmiFeet) * 10000,
			roundBMI=Math.round(BMI * 100) / 100;
		
		$result.text(roundBMI);
	});
    
    //Ajax Contact Form Start
    var cForm = $('#ajax_form'),
        formMessages = $('#ajax_notification');

    // Set up an event listener for the contact form.
    cForm.submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = cForm.serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: cForm.attr('action'),
            data: formData
        }).done(function(response) {
            formMessages.text(response).fadeIn();
            cForm.find('[name]').val('');

            setTimeout(function(){
                formMessages.fadeOut().text('');
            }, 3000);
        }).fail(function(jqXHR, textStatus) {
            formMessages.text('Ajax Not Working.').fadeIn();
            setTimeout(function(){
                formMessages.fadeOut().text('');
            }, 3000);
        });
    });
		
	
})(jQuery);