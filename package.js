Package.describe({
  summary: "Node module hacks encapsulated"
});

Package.on_use(function (api) {
  api.add_files('node-modules.js', 'server');
});
