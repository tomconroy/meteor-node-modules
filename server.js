var require = __meteor_bootstrap__.require;
var path = require("path");

NodeModules = {
  _path: null,

  require: function(moduleName) {
    var module;
    
    // try no path
    try {
      module = require(moduleName)
    } catch (e) {}

    // try public
    if (!module) {
      try {
        var base = path.join(path.resolve('.'), 'public/node_modules')
        module = require(path.join(base, moduleName));
      } catch (e) {}
    }
    
    if (!module && NodeModules._path) {
      try {
        var base = NodeModules._path;
        module = require(path.join(base, moduleName));
      } catch (e) {}
    }
    
    return module;
  },

  setPath: function(modulePath) {
    if (modulePath.indexOf('~') >= -1)
      modulePath.replace('~', process.env.HOME);

    if (modulePath[0] === '/')
      NodeModules._path = modulePath;
    else
      NodeModules._path = path.join(path.resolve('.'), modulePath);
  }
};
