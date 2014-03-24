/**
Description: This module implements a single colument fluid layout.
			 It scans the provided data object for regions and then arranges the data accordingly
**/
var log = new Log('comp-layout-singlecolfluid');
var carbon = require('carbon');
var pagePartial = new File(carbon.server.home + '/modules/comp-layout-singlecolfluid/scripts/partials/single-col-fluid.hbs');

var component = function() {
    var handle = function(context, handlers) {
        var log = new Log('comp-layout-singlecolfluid');
        log.info('Entered layout component');
        log.info(pagePartial.isExists());
        var data = context.data;
        var layout = {
            title: [],
            body: [],
            footer: []
        };
        var region;
        var addToLayout = function(layoutTemplate, region, widgetName, widget) {
            for (var key in layoutTemplate) {
                if (key == region) {
                    layoutTemplate[key].push({
                        partial: widgetName,
                        context: widget.context
                    });
                }
            }
        };
        //Go through each property in the data object
        for (var key in data) {
            region = data[key].region;
            if (region) {
                addToLayout(layout, region, key, data[key]);
            }
        };
        data.page = {};
        data.page.id = 'single-col-fluid';
        data.page.partial = pagePartial;
        data.page.layout = layout;
        log.info('Finished laying out component');
        handlers();
    };
    return handle;
};