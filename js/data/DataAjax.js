var DataAjax = function(config){
    var that = this;

    that.config = {
        async: false,
        url: '',
        method: 'get',
        crossDomain: false,
        jsonpCallback: 'callback',
        dataType: 'json',
        data: []
    };

    $.extend(that.config, config);

    that.method = {
        GetData: function(callback){
            $.ajax({
                async: that.config.async,
                url: that.config.url,
                method: that.config.method,
                crossDomain: that.config.crossDomain,
                jsonpCallback: that.config.jsonpCallback,
                dataType: that.config.dataType,
                success: function(json){
                    if(typeof callback == 'function')
                        callback(json);
                },
                error: function (jqXHR, exception) {
                    if (jqXHR.status === 0) {
                        console.log('Not connect.\n Verify Network.');
                    } else if (jqXHR.status == 404) {
                        console.log('Requested page not found. [404]');
                    } else if (jqXHR.status == 500) {
                        console.log('Internal Server Error [500].');
                    } else if (exception === 'parsererror') {
                        console.log('Requested JSON parse failed.');
                    } else if (exception === 'timeout') {
                        console.log('Time out error.');
                    } else if (exception === 'abort') {
                        console.log('Ajax request aborted.');
                    } else {
                        console.log('Uncaught Error.\n' + jqXHR.responseText);
                    }
                }
            });
        }
    };

    that.fn = {

    };
};