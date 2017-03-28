$('#chat').click(function() {
    $('.fade-bg').css('display', 'block');
    $('#test').animate({
        height: 'toggle'
    }, 500, function() {});
});
$('#mini-popup').click(function() {
    $('#test').animate({
        height: 'toggle'
    }, 1000, function() {});
    $('.fade-bg').css({
        'display': 'none',
        'transition-delay': '0.5s'
    });
});


$(function() {
    var sizes = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "200", "300", "400", "500", "1000"];
    $("#slider-range-max").slider({
        range: "max",
        min: 0,
        max: sizes.length - 1,
        step: 1,
        create: function(event, ui) {
            $("#cap").val(sizes[0]);
        },
        change: function(event, ui) {
            $("#cap").val(sizes[ui.value]);
        }
    });

    $("#plus").click(function() {
        var value = $("#slider-range-max").slider("value");
        var step = $("#slider-range-max").slider("option", "step");

        $("#slider-range-max").slider("value", value + step);
    });

    $("#minus").click(function() {
        var value = $("#slider-range-max").slider("value")
        var step = $("#slider-range-max").slider("option", "step");

        $("#slider-range-max").slider("value", value - step);
    });
});

$(function() {
    var sizes = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "200", "300", "400", "500", "1000"];
    $("#slider-range-max1").slider({
        range: "max",
        min: 0,
        max: sizes.length - 1,
        step: 1,
        create: function(event, ui) {
            $("#cap1").val(sizes[0]);
        },
        change: function(event, ui) {
            $("#cap1").val(sizes[ui.value]);
        }
    });

    $("#plus1").click(function() {
        var value = $("#slider-range-max1").slider("value");
        var step = $("#slider-range-max1").slider("option", "step");

        $("#slider-range-max1").slider("value", value + step);
    });

    $("#minus1").click(function() {
        var value = $("#slider-range-max1").slider("value")
        var step = $("#slider-range-max1").slider("option", "step");

        $("#slider-range-max1").slider("value", value - step);
    });
});

$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');
    if ($(this).find('.btn-primary').size() > 0) {
        $(this).find('.btn').toggleClass('btn-primary');
    }
    $(this).find('.btn').toggleClass('btn-default');
});

$('#chat').click(function() {
    setTimeout(function() {
        $('.first-txt').css('bottom', '387px');
    }, 1000);
    setTimeout(function() {
        $('.second-txt').css('bottom', '297px');
    }, 3000);
    setTimeout(function() {
        $('.loader').css('display', 'none');
    }, 4000);


    $('.tell-me-my-size').click(function() {
        var heightCap = $('#cap').val();
        var widthCap = $('#cap1').val();
        if (heightCap > 10 && widthCap > 10) {
            $('.first-txt').css('opacity', '1');
            $('.error_msg').css('display', 'none');
            $('.range').css('border-color', '#ccc');

            setTimeout(function() {
                $('.second-txt').css('bottom', '500px');
            }, 1000);

            setTimeout(function() {
                $('.range').css({
                    'bottom': '0px',
                    'opacity': '0.5'
                });
            }, 2000);
            setTimeout(function() {
                $('.loader').css('display', 'block');
                $('.tell-me-my-size').css({
                    'bottom': '130px',
                    'float': 'right'
                });
            }, 3000);

        } else {
            $('.first-txt').css('opacity', '0.5');
            $('.error_msg').css('display', 'block');
            $('.range').css('border-color', '#5e96ed');
        }
    });
    setTimeout(function() {
        $('.first-txt').css('bottom', '500px');
        $('.second-txt').css('bottom', '382px');
        $('.range').css('bottom', '-75px');
    }, 6000);
    setTimeout(function() {
        $('.tell-me-my-size').css('display', 'block');
    }, 8000);

});

$(function() {
    $('#mobile-nav').on('click', function(e) {
        $('.navView').toggleClass('active');

        e.stopPropagation();
        return false;
    });

    $('*:not(#mobile-nav)').on('click', function() {
        $('.navView').removeClass('active');
    });

});
$('.search-btn').click(function() {
    $('#searchform').css('display', 'none');
});


$('#formsearch').click(function() {
    $('#searchform').slideToggle("fast", function() {
        $('#content').toggleClass("moremargin");
    });
    $('#searchbox').focus()
    $('.openclosesearch').toggle();
});
