/*****************************************************/
/*                   Carousel                        */
/*****************************************************/
var FECarousel =
{
    "Init": function () {
        this.Carousel();
    },
    "Carousel": function () {
        var $carousel = $("div.js-carousel-slides");

        // As we might have more than 1 carousel on the page lets loop through them to set them up
        $carousel.each(function () {
            var $this = $(this),
                $carouselPagination = $this.siblings("div.js-carousel-pagination");

            $this.slick({
                appendArrows: $carouselPagination,
                appendDots: $carouselPagination,
                dots: true,
                dotsClass: "c-carousel__dots",
                prevArrow: "<button type=\"button\" class=\"c-carousel__prev\"><span class=\"u-visually-hide\">Previous</span><i class=\"icon-arrow-left\"</button>",
                nextArrow: "<button type=\"button\" class=\"c-carousel__next\"><span class=\"u-visually-hide\">Next</span><i class=\"icon-arrow-right\"</button>"
            });
        });
    }
};