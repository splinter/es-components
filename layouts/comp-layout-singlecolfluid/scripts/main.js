/**
Description: This module implements a single colument fluid layout.
			 It scans the provided data object for regions and then arranges the data accordingly
**/
var log = new Log('comp-layout-singlecolfluid');
var carbon = require('carbon');
var basePath = carbon.server.home + '/modules/comp-layout-singlecolfluid/scripts/';
var pagePartial = new File(basePath + '/partials/single-col-fluid.hbs');
var cssBootStrap = new File(basePath + '/css/bootstrap.min.css');
var cssBootStrapResponsive = new File(basePath + '/css/bootstrap-responsive.min.css');
var component = function() {
    var handle = function(context, handlers) {
        var log = new Log('comp-layout-singlecolfluid');
        log.info('Creating layout');
        var data = context.data;
        var layout = {
            header: [],
            ribbon: [],
            leftnav: [],
            body: [],
            footer: [],
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
        //Add the CSS dependecies
        data.page.css = [];
        data.page.css.push(cssBootStrap);
        data.page.css.push(cssBootStrapResponsive);
        data.page.layout = layout;
        log.info('Finished creating layout');
        handlers();
    };
    return handle;
};