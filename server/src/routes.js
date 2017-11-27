const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const Servers = require('./controllers/ServersController');
const User = require('./controllers/UserController');
const Documentation = require('./controllers/DocumentationController');

module.exports = (app) => {
  // Get Requests
  app.get('/ServerTypes', Servers.getAllServersTypes);
  app.get('/getUserGroups', User.getUserGroups);
  app.get('/Users', User.getUsers);
  app.get('/Documentation', Documentation.getAllDocumentation);
    app.get('/DisplayServer/:id', Servers.DisplayServer);
    app.get('/Servers/:location_id', Servers.getAllServers);
  // Post Requests
  app.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register);
  app.post('/login', AuthenticationController.login);
  app.post('/Servers', Servers.addServer);
  app.get('/Profile/:id', User.getProfile)

};