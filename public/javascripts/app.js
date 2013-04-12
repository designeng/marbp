(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var somemodule = require('modules/somemodule');
  
      var application = {
          initialize: function(){
              console.log("initialized")
          }
      }
  
      module.exports = application;
  
  
  
  
});
window.require.register("initialize", function(exports, require, module) {
  var application = require('application');
  
  $(function() {
    console.clear();
    console.log("some text 12345");
    application.initialize();
  });
  
});
window.require.register("lib/router", function(exports, require, module) {
  var application = require('application');
  
  module.exports = Backbone.Router.extend({
    routes: {
      '': 'home'
    },
  
    home: function() {
      $('body').html(application.homeView.render().el);
    }
  });
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
});
window.require.register("models/collection", function(exports, require, module) {
  // Base class for all collections.
  module.exports = Backbone.Collection.extend({
    
  });
  
});
window.require.register("models/model", function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
    
  });
  
});
window.require.register("modules/somemodule", function(exports, require, module) {
  
});
window.require.register("views/home_view", function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/home');
  
  module.exports = View.extend({
    id: 'home-view',
    template: template
  });
  
});
window.require.register("views/view", function(exports, require, module) {
  require('lib/view_helper');
  
  // Base class for all views.
  module.exports = Backbone.View.extend({
    initialize: function() {
      this.render = _.bind(this.render, this);
    },
  
    template: function() {},
    getRenderData: function() {},
  
    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },
  
    afterRender: function() {}
  });
  
});
