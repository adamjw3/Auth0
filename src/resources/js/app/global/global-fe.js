/*****************************************************/
/*                    Global                         */
/*****************************************************/
var FEGlobal =
{
	WebAuth: null,
	"Init": function () {
		this.Auth0();
		this.Auth0Autentication();
		this.Login();
		this.Logout();
		this.BurgerNav();
		this.FormValidation();
		this.FormFileUpload();
        this.SelectionSharer();
		this.ResponsiveVideos();
		this.CheckSetCookie();


		$(".js-loader").addClass("is-hidden");
		$("body").addClass("is-loaded");
	},
	"Auth0": function () {
		var AUTH0_CLIENT_ID='kL38GDrxTgsrZ75lrURjD4SN6z6BH454';
		var AUTH0_DOMAIN='adamwright.eu.auth0.com';
		var AUTH0_CALLBACK_URL=location.href;

		FEGlobal.WebAuth = new auth0.WebAuth({
			domain: AUTH0_DOMAIN,
			clientID: AUTH0_CLIENT_ID,
			redirectUri: AUTH0_CALLBACK_URL,
			audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
			responseType: 'token id_token',
			scope: 'openid profile read:user_idp_tokens',
			leeway: 60
		});
	},
	"Auth0Autentication": function () {
		FEGlobal.WebAuth.parseHash(function(err, authResult) {
			if (authResult && authResult.accessToken && authResult.idToken) {
				window.location.hash = '';
				FEGlobal.Auth0Session(authResult);
				console.log("logged in");
				$("li.js-profile").removeClass("is-hidden");
			} else if (err) {
				console.log(err);
				alert(
					'Error: ' + err.error + '. Check the console for further details.'
				);
			}
			FEGlobal.Auth0HideShowButtons();
		});
	},
	"Auth0IsAutenticated": function () {
		// Check whether the current time is past the
		// access token's expiry time
		var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		return new Date().getTime() < expiresAt;
	},
	"Auth0HideShowButtons": function () {
		if (FEGlobal.Auth0IsAutenticated()) {
			console.log("signed in");
			// Show log out
			$("li.js-logout").removeClass("is-hidden");
			$("li.js-profile").removeClass("is-hidden");
			$("li.js-login").addClass("is-hidden");
		} else {
			console.log("signed out");
			// Show log in
			$("li.js-logout").addClass("is-hidden");
			$("li.js-profile").addClass("is-hidden");
			$("li.js-login").removeClass("is-hidden");
		}
	},
	"Auth0Session": function (authResult) {
		// Set the time that the access token will expire at
		var expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		);
		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);
	},
	"Login": function () {
		$("li.js-login a").on("click", function (event) {
			event.preventDefault();
			FEGlobal.WebAuth.authorize();
		});
	},
	"Logout": function () {
		$("li.js-logout a").on("click", function (event) {
			event.preventDefault();
			// Remove tokens and expiry time from localStorage
			localStorage.removeItem('access_token');
			localStorage.removeItem('id_token');
			localStorage.removeItem('expires_at');
			document.location.href = document.location.href;
		});
	},
    "BurgerNav": function () {
        // On click of the burger icon show both the top & main navigation
        // Also show the body menu overlay & change the burger icon to be a close icon
        $("#js-navbar-menu-toggle").on("click", function (e) {
            e.preventDefault();

            var $this = $(this),
                $navLinks = $("#js-navbar-links");

            if ($navLinks.hasClass("is-active")) {
                $this.removeClass("is-active");
                $navLinks.removeClass("is-active");
            }
            else {
                $this.addClass("is-active");
                $navLinks.addClass("is-active");
            }
        });
    },
	"FormValidation": function () {
		// Validate any forms
		$("form").validateWebForm({
			errorPlacement: function(error, element) { }
		});
	},
    "FormFileUpload": function () {
        $("input:file").on("change", function () {
            // Get the html input file element
            var $input = $(this),
                // Get the fake button
                $button = $input.prev(".js-file-upload"),
                // Get the file name and type, removing rest of path
                filename = $input.val().replace(/\\/g, '/').replace(/.*\//, '');

            // Update the fake button with the name of file e.g file.pdf or the default text
            if(filename.length > 0) {
                $button.text(filename);
            }
            else {
                $button.text($button.data("default"));
            }
        });
    },
    "SelectionSharer": function () {
        // Popover menu to share on Twitter or by email any text selected on the page (non touch only)
        $("article").selectionSharer();
    },
	"ResponsiveVideos": function () {
		// Targets youtube and vimeo videos inside .cms-content areas and makes them responsive
		$(".cms-content iframe[src*='youtube'], .cms-content iframe[src*='vimeo']").parent().fitVids();
	},
	"CheckSetCookie": function () {
		var cookieName = "BoilerplateCookiePolicy"; // The cookie name will need changing

		// Show Cookie bar if cookie has not been already set
		if(document.cookie.indexOf(cookieName) < 0) {
			var expires = new Date();
			expires.setFullYear(expires.getFullYear() + 1); // 1 year

			// Date()'s toGMTSting() method will format the date correctly for a cookie
			document.cookie = cookieName + "=true; expires=" + expires.toGMTString();
			this.CookieShowHide();
		}
	},
	"CookieShowHide": function () {
		// If user interacts by hovering over it we keep it on screen.
		var $cookieAlert = $("#js-cookiebar");

		setTimeout(function () {
			$cookieAlert.mouseenter(function(){
				clearTimeout($cookieAlert.data("timeoutId"));
			}).mouseleave(function(){
				FEGlobal.CookieTimeOut();
			});
			$cookieAlert.removeClass("c-cookiebar--hidden");
			FEGlobal.CookieTimeOut();
		}, 2000);
	},
	"CookieTimeOut": function(){
		var $cookieAlert = $("#js-cookiebar");

		FEGlobal.timeOutId = setTimeout(function(){
			$cookieAlert.addClass("c-cookiebar--hidden");
		}, 5000);

		$cookieAlert.data("timeoutId", FEGlobal.timeOutId);
	}
};
