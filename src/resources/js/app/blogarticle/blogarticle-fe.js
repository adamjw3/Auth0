/*****************************************************/
/*                 Blog Article                      */
/*****************************************************/
var FEBlogArticle =
{
	"Init": function () {
        this.UpdateProgressBar();
	},
    "UpdateProgressBar": function() {
        var $document = $(document),
            $window = $(window),
			$scrollableContent = $("#js-blog-article-content"),
            $progressBar = $("#js-blog-article-progress-bar");

        // only trigger progress bar JS if the browser supports the progress element
        if("max" in document.createElement("progress")) {
			// the height of the content we want to track - window height + the content offset from the top
            var scrollableContent = $scrollableContent.outerHeight(true) - $window.height() + $scrollableContent.offset().top;
            // set the max attribute equal to the height of what is scrollable on the page
            $progressBar.attr({ max: scrollableContent });

            $document.on("scroll", function() {
                // if the scrollable height of the page has changed, update the max value (this might happen through 3rd party async JS loading in content e.g. tweet embed)
                if(scrollableContent !== $scrollableContent.outerHeight(true) - $window.height() + $scrollableContent.offset().top) {
                    scrollableContent = $scrollableContent.outerHeight(true) - $window.height() + $scrollableContent.offset().top;
                    $progressBar.attr({ max: scrollableContent });
                }

                // on scroll update progress bar value to euqal scroll top position
                $progressBar.attr({ value: $window.scrollTop() });
            });

            $window.resize(function() {
                // on resize, the max value and scroll value needs updating (as the window height has changed)
                $progressBar.attr({ max: scrollableContent, value: $window.scrollTop() });
            });
        }
    }
};
