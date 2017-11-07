/*****************************************************/
/*                    Profile                         */
/*****************************************************/
var FEProfile =
{
    UserProfile: null,
    "Init": function () {
        if (!FEGlobal.Auth0IsAutenticated()) {
            document.location.href="/template-homepage.html";
        }
        else {
            FEProfile.Profile();
        }
    },
    "Profile": function () {
        if (!FEProfile.UserProfile) {
            var accessToken = localStorage.getItem('access_token');

            if (!accessToken) {
                console.log('Access token must exist to fetch profile');
            }

            FEGlobal.WebAuth.client.userInfo(accessToken, function(err, profile) {
                if (profile) {
                    FEProfile.UserProfile = profile;
                    FEProfile.DisplayProfile();
                }
            });
        } else {
            FEProfile.DisplayProfile();
        }
    },
    "DisplayProfile": function () {
        // display the profile

        $("img.js-avatar").attr("src", FEProfile.UserProfile.picture);
        $("span.js-nickname").text(FEProfile.UserProfile.nickname);
        $("span.js-name").text(FEProfile.UserProfile.name);

        console.log("type", FEProfile.UserProfile.sub.split("|")[0]);
        console.log("FEGlobal.WebAuth", FEGlobal.WebAuth);
        console.log(JSON.stringify(FEProfile.UserProfile, null, null));
        console.log(FEGlobal.WebAuth);

        //If facebook then show likes
        if(FEProfile.UserProfile.sub.split("|")[0] === "facebook") {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://adamwright.eu.auth0.com/oauth/token",
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "data": "{\"client_id\":\"RHv43cCS23dz0Xi8XYTSzlEZTPn9Bpg9\",\"client_secret\":\"_qcncXq9QzZ-1nTnQA3SO0Mr1ffEeF0XHpnt9GkWt1LK0zvyUhWb3_NKTUWf04gQ\",\"audience\":\"https://adamwright.eu.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}"
            }

            $.ajax(settings).done(function (response) {
                console.log(response);
            });
        }

        //If twitter then do something
        if(FEProfile.UserProfile.sub.split("|")[0] === "twitter") {

        }

        //If emil then show form to fill in
        if(FEProfile.UserProfile.sub.split("|")[0] === "auth0") {

        }

    }
};
/**
 * Created by adam on 27/10/2017.
 */
