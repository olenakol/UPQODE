var $ = jQuery;

$(document).ready(function() {
    // SMOOTH SCROLLING
    $(".navigation").on("click", "a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
            scrollTop: top
        }, 1000);
    });
    //CALL TEAM CAROUSEL
    Owl.init();
    $(".dotsContainer .active").next().css("display", "flex");
    $(".dotsContainer .active").prev().css("display", "flex");
});

//TEAM CAROUSEL

var Owl = {

    init: function() {
        Owl.carousel();
    },

    carousel: function() {
        var owl;
        $(document).ready(function() {

            owl = $('.owlExample').owlCarousel({
                items: 1,
                // center: true,
                nav: true,
                dots: true,
                // loop: true,
                margin: 10,
                dotsContainer: '.dotsContainer',
                navText: "",
                nav: true,
                mouseDrag: false,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn'
            });

            $('.owl-next').on('click', function() {
                action = 'next';
            });

            $('.owl-prev').on('click', function() {
                action = 'prev';
            });

            $('.bookmarks').on('click', 'li', function(e) {
                owl.trigger('to.owl.carousel', [$(this).index(), 300]);
            });
        });
    }
};

$(".dotsContainer li").on('click', function() {
    $(".dotsContainer li").hide();
    $(this).next().css("display", "flex");
    $(this).prev().css("display", "flex");
});

//line animation
var canvas = SVG('drawing').size('100%', '100%').viewbox(0, 0, 664, 1216),
    rect = canvas.path("M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25Z"),
    dot = canvas.path("M13 19C16.3137 19 19 16.3137 19 13C19 9.68629 16.3137 7 13 7C9.68629 7 7 9.68629 7 13C7 16.3137 9.68629 19 13 19Z"),
    path = canvas.path("M22.9998 1C22.9998 1 649.558 119 663 589.542C655.833 1135 1 1215 1 1215"),
    length = path.length()

path.fill('none').stroke({
    width: 1,
    color: '#29A0EC'
})
rect.fill('none').stroke({
    width: 15,
    height: 15,
    viewBox: '0 0 25 25',
    color: '#29A0EC',
    opacity: "0.3"
})
dot.fill('none').stroke({
    width: 12,
    height: 12,
    viewBox: '0 0 12 12',
    color: '#29A0EC'
})


$(window).scroll(function() {
    var topSection = $('#services').offset().top;
    if ($(this).scrollTop() > topSection) {
        dot & rect.animate(8000, '<>').during(function(eased) {
            var p = path.pointAt(eased * length)
            rect.center(p.x, p.y)
            dot.center(p.x, p.y)
        });
        $(window).off('scroll');
    }
});


// MENU BG WITH SCROLLING
$(document).scroll(function() {
    var body = document.body,
        html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    var y = $(this).scrollTop();
    if (y > 100) {
        $('#header').addClass('fixed');
    } else {
        if ($('#header').hasClass('fixed')) {
            $('#header').removeClass('fixed');
        }
    }
});

// BANNER CROUSEL
$(".header_carousel").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    navText: ["", ""],
    dots: true,
    items: 1
});

//          MAP


var places, sc;

$(function() {
    var geocoder,
        map;

    google.maps.event.addDomListener(window, 'load', initialize);
    spin();

    function spin() {
        $(".stop").text("Stop").off().on("click", stop);
    }

    $(".roller li").click(function() {
        var city = $(this).children('.location').text();
        geocodeAddress(city);
        $(".roller li").removeClass('active')
        $('.marker.show').removeClass('show')
        $(this).addClass('active')
    });


    function initialize() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(40.62958785, -73.93936157);
        map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 13,
            center: sc,
            disableDefaultUI: true,
            styles: [{
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                            "color": "#88e9ad"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        });
        map.setCenter(new google.maps.LatLng(40.72098167, -73.99600983), 10);
    }

    function geocodeAddress(addr) {
        lastCity = addr;

        geocoder.geocode({ 'address': addr }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: '../images/pin.svg'
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }

});