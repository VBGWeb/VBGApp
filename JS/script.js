$.stellar();

new WOW().init();

/*Hover on site images*/
$(".img-site").hover(
    function() {
        $(this).addClass('animated pulse');
    },
    function() {
        $(this).removeClass('animated pulse');
    });


$(".btn").hover(
    function() {
        $(this).addClass('animated rubberBand');
    },
    function() {
        $(this).removeClass('animated rubberBand');
    });


