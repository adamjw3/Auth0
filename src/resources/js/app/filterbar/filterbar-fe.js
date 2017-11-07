/*****************************************************/
/*                  Filter Bar                       */
/*****************************************************/
var FEFilterBar =
{
	"Init": function () {
        this.ToggleFilters();
	},
    "ToggleFilters": function() {
        var $filterToggleBtn = $("#js-filter-bar-toggle-btn");

        $filterToggleBtn.on("click", function() {
            var target = $(this).attr("aria-controls"),
                $target = $("#" + target);
                
            $target.toggleClass("is-active");
        });
    }
};
