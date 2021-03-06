"use strict";

function FacebookGraphAPI(facebookUserID, facebookUserAccessToken, https, oAuthTools) {

    var apiUrl = "graph.facebook.com",
        self = this;

    function __construct() {

        https = https || require("https")
        oAuthTools = oAuthTools || require("../oAuthTools");

    }

    this.getStatuses = function (error, success) {

        var httpMethod  = "GET",
            apiMethod   = facebookUserID + "/statuses?access_token=" + facebookUserAccessToken;

        __callApi(error, success, httpMethod, apiMethod);

        return self;
    };


    this.postStatus = function (error, success, status) {

        status = oAuthTools.encodeURIComponent(status);

        var httpMethod      = "POST",
            apiMethod       = facebookUserID + "/feed?message=" + status + "&access_token=" + facebookUserAccessToken;

        __callApi(error, success, httpMethod, apiMethod);

        return self;
    }

    this.deleteStatus = function (error, succes, statusId) {

        var httpMethod      = "DELETE",
            apiMethod       = facebookUserID + "_" + statusId + "?access_token=" + facebookUserAccessToken;

        __callApi(error, succes, httpMethod, apiMethod);

        return self;
    }

    function __callApi(error, success, httpMethod, apiMethod) {

        var options     = __getBaseRequestOptions();

        options.path += apiMethod;
        options.method = httpMethod;

        var req = https.request(options, function(res) {

            res.on('data', function(d) {
                process.stdout.write(d);
            });
        });
        req.end();

        req.on('error', function(e) {
            console.error(e);
        });

    }

    function __getBaseRequestOptions() {
        return {
            host:       apiUrl,
            hostname:   apiUrl,
            path:       "/"
        };
    }

    __construct();

}

module.exports = FacebookGraphAPI;