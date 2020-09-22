export default function slidersInit() {

    $('.hero__slider-wrapper').owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    $('.toy__companies-wrapper').owlCarousel({
        nav: true,
        items: 7,
        margin: 60,
        loop: true,
        autoplay: true,
        autoplaySpeed: 300,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            },
            1000: {
                items: 7
            }
        }
    })

}