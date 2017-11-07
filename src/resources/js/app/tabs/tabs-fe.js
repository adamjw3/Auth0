/*****************************************************/
/*                    Tabs                           */
/*****************************************************/
var FETabs =
{
	"Init": function () {
		this.SetupTabs();
	},
	"SetupTabs": function() {
		var $tabsComponent = $("div.js-tabs");

		// creates a new instance for each tabs component on the page
		$tabsComponent.each(function() {
			var $this = $(this),
				$tabs = $this.find("a.js-tabs-tab"),
				$panels = $this.find("section.js-tabs-panel");

			$tabs.on("click", function(event) {
	            event.preventDefault();
	            FETabs.SetTabState($tabs, $panels, $(this));
	        });
		});
	},
    "SetTabState": function($tabs, $panels, $activeTab) {
        var $activePanel = $("#" + $activeTab.attr("aria-controls"));

        // remove previously active tab state
        $tabs.each(function() {
            var $tab = $(this);
            $tab.removeClass("is-active").attr("aria-selected", "false");
        });

        // remove previously active panel state
        $panels.each(function() {
            var $tabPanel = $(this);
            $tabPanel.addClass("is-hidden").attr("aria-hidden", "true");
        });

		// set the new active tab and panel
        $activeTab.addClass("is-active").attr("aria-selected", "true");
        $activePanel.removeClass("is-hidden").attr("aria-hidden", "false");
    }
};
