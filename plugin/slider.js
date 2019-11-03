jQuery(document).ready(function ($) {
    let $checkbox = $('#checkbox');
    let $slider = $("#slider");
    let $sliderUl = $('#slider ul');
    let $sliderUlLi = $('#slider ul li');
    $checkbox.change(function () {
        setInterval(function () {
            moveRight();
        }, 3000);
    });

    var slideCount = $sliderUlLi.length;
    var slideWidth = $sliderUlLi.width();
    var slideHeight = $sliderUlLi.height();
    var sliderUlWidth = slideCount * slideWidth;

    // $slider.css({
    //     width: slideWidth,
    //     height: slideHeight
    // });

    $sliderUl.css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $sliderUl.animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $sliderUl.css('left', '');
        });
    };

    function moveRight() {
        $sliderUl.animate({
            left: -slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $sliderUl.css('left', '');
        });
    };

    $('.fa.fa-arrow-left').click(function () {
        moveLeft();
    });

    $('.fa.fa-arrow-right').click(function () {
        moveRight();
    });

});