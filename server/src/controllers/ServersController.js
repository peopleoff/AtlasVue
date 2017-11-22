const {servers} = require('../models');
const {server_types} = require('../models');


module.exports = {

  async getAllServers (req, res) {
    const location_id = req.body.location_id;
    console.log(req.body);
    console.log(req);
    try {
      server_types.hasMany(servers, {foreignKey: 'id'});
      servers.belongsTo(server_types, {foreignKey: 'server_type_id'});
      const server = await servers.findAll({
        where: {
          "location_id": location_id,
          "server_status_id": 1
        },
        include: [server_types]

      });
      res.send(server);
    } catch (err){
      res.status(500).send({
        error: err,
        "message": "Error"
      })
    }
  },
    async DisplayServer (req, res) {
        const id = req.body.id;
        console.log(id);
        try {
            console.log("inside" + id);
            const server = await servers.findAll({
                where: {
                    "id": id,
                    "server_status_id": 1
                }
            });
            res.send(server);
        } catch (err){
            res.status(500).send({
                error: err,
                "message": "Error"
            })
        }
    },
  async getAllServersTypes (req, res) {
    try {
      const serverTypes = await server_types.findAll();
      res.send(serverTypes);
    } catch (err){
      res.status(500).send({
        error: err,
        "message": "Error"
      })
    }
  },
    async addServer (req, res) {
        try {
            const server = await servers.create(req.body);
            res.send(server)
        } catch (err) {
            res.status(400).send({
                error: err,
                message: 'failed'
            })
        }
    }
};