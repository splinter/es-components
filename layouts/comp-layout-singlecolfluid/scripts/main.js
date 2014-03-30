/**
Description: This module implements a single colument fluid layout.
			 It scans the provided data object for components that have defined a reguon and arranges them
             acccordingly.
             It will organize the 
**/
var log = new Log('comp-layout-singlecolfluid');
var carbon = require('carbon');
var utils=require('utils');

var basePath = carbon.server.home + '/modules/comp-layout-singlecolfluid/scripts/';
var css=utils.file.getDirectoryContents(new File(basePath+'css'));
var partials=utils.file.getDirectoryContents(new File(basePath+'partials'));

//var pagePartial = new File(basePath + '/partials/single-col-fluid.hbs');
//var cssBootStrap = new File(basePath + '/css/bootstrap.min.css');
//var cssBootStrapResponsive = new File(basePath + '/css/bootstrap-responsive.min.css');


var MAIN_PARTIAL_KEY='mainPartial';
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
        var addToLayout = function(layoutTemplate, region, component) {
            for (var key in layoutTemplate) {
                if (key == region) {

                    //Determine if the component has provided a main partial
                    if(component[MAIN_PARTIAL_KEY]){

                        //Obtain the main partial
                        
                    layoutTemplate[key].push({
                        partial: component[MAIN_PARTIAL_KEY],
                        context: component.context
                    });
                        
                    }

                }
            }
        };
        //Go through each property in the data object
        for (var key in data) {
            region = data[key].region;
            if (region) {
                addToLayout(layout, region, data[key]);
            }
        };


        var page=data['_page']={};
        page.mainPartial='single-col-fluid';
        page.partials=partials;
        page.css=css;
        page.layout=layout;
        

        //data.page = {};
        //data.page.id = 'single-col-fluid';
        //data.page.partial = pagePartial;
        //Add the CSS dependecies
        //data.page.css = [];
        //data.page.css.push(cssBootStrap);
        //data.page.css.push(cssBootStrapResponsive);
        //data.page.layout = layout;
        log.info('Finished creating layout');
        handlers();
    };
    return handle;
};